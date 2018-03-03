import React from 'react';
import { merge, camelCase } from 'lodash';
import { Link } from 'react-router-dom';
import BonusForm from './form_components/bonus_form';
import AlignmentMenu from './form_components/alignment_menu';
import RaceMenu from './form_components/race_menu';
import ClassMenu from './form_components/class_menu';
import BackgroundMenu from './form_components/background_menu';
import Languages from './form_components/languages';
import Money from './form_components/money';
import './character_sheet.css';
import {
	_ABILITIES,
	_SKILLS,
	_PHYSICAL_ATTRIBUTES,
	_ALIGNMENTS,
	_EDITABLE_FIELDS,
	_CALCULATED_FIELDS,
	_CATEGORIES
} from './character_variables';
import * as Calculators from './calculators';

class CharacterSheet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			character: this.props.character
		};
	}

	componentDidMount() {
		const newState = merge({}, this.state);
		this.calculateFields({
			newState,
			races: this.props.races,
			charClasses: this.props.charClasses,
			backgrounds: this.props.backgrounds
		});
		this.setState(newState, () => (window.character = this.state.character));
	}

	componentWillReceiveProps(newProps) {
		if (
			this.props.match.params.characterId !==
				newProps.match.params.characterId ||
			this.props.character !== newProps.character
		) {
			const newState = { character: merge({}, newProps.character) };
			this.calculateFields({
				newState,
				races: this.props.races,
				charClasses: this.props.charClasses,
				backgrounds: this.props.backgrounds
			});
			this.setState(newState);
		}
	}

	calculateFields({ newState, races, charClasses, backgrounds }) {
		_CALCULATED_FIELDS.forEach((field) => {
			const camel = camelCase(field);
			Calculators[camel]({ newState, races, charClasses, backgrounds });
		});
	}

	handleChange(field) {
		return (e) => {
			const newState = merge({}, this.state);
			newState.character[field] =
				e.target.type === 'checkbox' ? e.target.checked : e.target.value;
			this.calculateFields({
				newState,
				races: this.props.races,
				charClasses: this.props.charClasses,
				backgrounds: this.props.backgrounds
			});
			this.setState(newState);
		};
	}

	handleBonusSubmit(newBonus) {
		const newState = merge({}, this.state);
		if (newBonus._id) {
			const bonusIdx = newState.character.bonuses.findIndex(
				(bonus) => bonus._id === newBonus._id
			);
			newState.character.bonuses[bonusIdx] = newBonus;
		} else {
			newState.character.bonuses.push(newBonus);
		}
		this.setState(newState, () => this.handleSubmit());
	}

	handleRemoveBonus(bonusId) {
		return (e) => {
			e.preventDefault();
			const newState = merge({}, this.state);
			newState.character.bonuses = newState.character.bonuses.filter(
				(bonus) => bonus._id !== bonusId
			);
			this.setState(newState, () => this.handleSubmit());
		};
	}

	handleLanguageSubmit(language) {
		const newState = merge({}, this.state);
		newState.character.languages.push(language);
		this.setState(newState);
	}

	handleRemoveLanguage(languageIdx) {
		const newState = merge({}, this.state);
		newState.character.languages = newState.character.languages.slice(0, languageIdx).concat(newState.character.languages.slice(languageIdx + 1));
		this.setState(newState);
	}

	handleSubmit(e) {
		if (e) e.preventDefault();
		this.props.updateCharacter(this.state.character);
	}

	renderAlignments() {
		return (
			<AlignmentMenu
				alignments={_ALIGNMENTS}
				handleChange={this.handleChange('alignment')}
				selectedAlignment={this.state.character.alignment}
			/>
		);
	}

	renderRaces() {
		return (
			<RaceMenu
				races={this.props.races}
				selectedRace={
					this.state.character.race ? this.state.character.race : ''
				}
				handleChange={this.handleChange('race')}
			/>
		);
	}

	renderCharClasses() {
		return (
			<ClassMenu
				charClasses={this.props.charClasses}
				selectedCharClass={
					this.state.character.charClass ? this.state.character.charClass : ''
				}
				handleChange={this.handleChange('charClass')}
			/>
		);
	}

	renderBackgrounds() {
		return (
			<BackgroundMenu
				backgrounds={this.props.backgrounds}
				selectedBackground={
					this.state.character.background ? this.state.character.background : ''
				}
				handleChange={this.handleChange('background')}
			/>
		);
	}

	renderEditableFields() {
		return Object.keys(_EDITABLE_FIELDS).map((field, i) => {
			const camel = field === 'Class' ? 'charClass' : camelCase(field);
			return (
				<label key={i}>
					<h3>{field} </h3>
					<input
						required={Boolean(field === 'Name')}
						type={_EDITABLE_FIELDS[field].type}
						value={this.state.character[camel]}
						onChange={this.handleChange(camel)}
						min={_EDITABLE_FIELDS[field].min}
						max={_EDITABLE_FIELDS[field].max}
					/>
				</label>
			);
		});
	}

	renderHealth() {
		return (
			<label>
				<h3>Health </h3>
				<input
					type="number"
					min="0"
					max="999"
					value={this.state.character.currentHealth}
					onChange={this.handleChange('currentHealth')}
				/>
				/
				<input
					type="number"
					min="0"
					max="999"
					value={this.state.character.maxHealth}
					onChange={this.handleChange('maxHealth')}
				/>
			</label>
		);
	}

	renderHitDie() {
		return (
			<label>
				<h3>Hit Die</h3>
				{this.state.character.charClass
					? `d${this.props.charClasses[this.state.character.charClass].hitDie}`
					: ''}
			</label>
		);
	}

	renderCalculatedFields() {
		return [
			'Proficiency Bonus',
			'Initiative',
			'Passive Wisdom',
			'Armor Class',
			'Speed'
		].map((field, i) => (
			<label key={i}>
				<h3>{field} </h3>
				{this.state.character[camelCase(field)] >= 0 ? ' +' : '   '}
				{this.state.character[camelCase(field)]}
			</label>
		));
	}

	renderAbilityScores() {
		return _ABILITIES.map((ability, i) => {
			const camel = camelCase(ability);
			return (
				<label key={i}>
					{ability}: ({this.state.character[`${camelCase(ability)}Modifier`] >=
					0
						? ' +'
						: '   '}
					{this.state.character[`${camelCase(ability)}Modifier`]})
					<input
						type="number"
						min="0"
						max="30"
						value={this.state.character[camel]}
						onChange={this.handleChange(camel)}
					/>
				</label>
			);
		});
	}

	renderSavingThrows() {
		return _ABILITIES.map((ability, i) => {
			const camel = camelCase(ability);
			return (
				<label key={i}>
					{ability}
					{this.state.character[`${camel}SavingThrow`] >= 0 ? ' +' : '   '}
					{this.state.character[`${camel}SavingThrow`]}
					<input
						type="checkbox"
						onChange={this.handleChange(`${camel}SaveProficiency`)}
						checked={this.state.character[`${camel}SaveProficiency`]}
					/>
				</label>
			);
		});
	}

	renderSkills() {
		return Object.keys(_SKILLS).map((skill, i) => {
			const camel = camelCase(skill);
			return (
				<label key={i}>
					{skill} ({_SKILLS[skill].slice(0, 3)})
					{this.state.character[camel] >= 0 ? ' +' : '   '}
					{this.state.character[camel]}
					<input
						type="checkbox"
						onChange={this.handleChange(`${camel}Proficiency`)}
						checked={this.state.character[`${camel}Proficiency`]}
					/>
				</label>
			);
		});
	}

	renderBonuses() {
		const existing = this.state.character.bonuses.map((bonus, i) => [
			<BonusForm
				key={1}
				handleBonusSubmit={this.handleBonusSubmit.bind(this)}
				bonus={bonus}
				skills={_SKILLS}
			/>,
			<button key={2} onClick={this.handleRemoveBonus(bonus._id)}>
				Remove
			</button>
		]);
		return existing.concat(
			<BonusForm
				key={existing.length}
				handleBonusSubmit={this.handleBonusSubmit.bind(this)}
				bonus={{ name: '', field: '', description: '', bonusAmount: 0 }}
				skills={_SKILLS}
			/>
		);
	}

	renderMoney() {
		return (
			<Money
				copper={this.state.character.copper}
				silver={this.state.character.silver}
				gold={this.state.character.gold}
				platinum={this.state.character.platinum}
				handleChange={this.handleChange.bind(this)}
			/>
		);
	}

	renderLanguages() {
		return (
			<Languages
				languages={this.state.character.languages}
				handleLanguageSubmit={this.handleLanguageSubmit.bind(this)}
			/>
		);
	}

	render() {
		return [
			<Link key={1} to={`/users/${this.props.currentUser._id}`}>
				Back to Home
			</Link>,
			<form
				key={2}
				className="character-form"
				onSubmit={this.handleSubmit.bind(this)}>
				<input type="submit" value="Save" />
				<div className="character-form-1">{this.renderEditableFields()}</div>
				<div className="character-form-1">{this.renderAlignments()}</div>
				<div className="character-form-1">{this.renderRaces()}</div>
				<div className="character-form-1">{this.renderCharClasses()}</div>
				<div className="character-form-1">{this.renderBackgrounds()}</div>
				<div className="character-form-1">{this.renderHealth()}</div>
				<div className="character-form-1">{this.renderHitDie()}</div>
				<div className="character-form-2">{this.renderCalculatedFields()}</div>
				<div className="character-form-3">
					<h3>Ability Scores </h3>
					<div className="character-form-input-group">
						{this.renderAbilityScores()}
					</div>
				</div>
				<div className="character-form-4">
					<h3>Saving Throws </h3>
					<div className="character-form-input-group">
						{this.renderSavingThrows()}
					</div>
				</div>
				<div className="character-form-5">
					<h3>Skills </h3>
					<div className="character-form-input-group">
						{this.renderSkills()}
					</div>
				</div>
				<div className="character-form-5">
					<h3>Shield </h3>
					<div className="character-form-input-group">
						<label>
							Shielded
							<input
								type="checkbox"
								value={this.state.character.shielded}
								onChange={this.handleChange('shielded')}
							/>
						</label>
					</div>
				</div>
				<div className="character-form-4">
					<h3>Languages</h3>
					// this.renderLanguages()
				</div>
				<div className="character-form-4">
					<h3>Money</h3>
					{this.renderMoney()}
				</div>
			</form>,
			<div key={3} className="character-form-6">
				<h3>Traits, Bonuses, Feats, etc.</h3>
				{this.renderBonuses()}
			</div>
		];
	}
}

export default CharacterSheet;

// TODO: make charClass model to help auto calculate fields
// list to select backgrounds from
// inventory
// weapons
// character create flow
// character image
// hide bonus field and amount until click
// hide bonus details
// refresh shouldn't redirect - because fetching user happens after component mount. try moving this to app load
// add campaign (character can belong to campaign)
// list more than name in character list
// add uniqueness validation
// add hit dice (number of dice, not die type)
