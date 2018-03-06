import React from 'react';
import { merge, camelCase } from 'lodash';
import { Link } from 'react-router-dom';
import BonusForm from './form_components/bonus_form';
import AlignmentMenu from './form_components/alignment_menu';
import DropdownMenu from './form_components/dropdown_menu';
import Proficiencies from './form_components/proficiencies';
import ProficiencyForm from './form_components/proficiency_form';
import Tooltip from '../helpers/tooltip';
import './character_sheet.css';
import {
	_ABILITIES,
	_SKILLS,
	_PHYSICAL_ATTRIBUTES,
	_ALIGNMENTS,
	_CALCULATED_FIELDS,
	_CATEGORIES,
	_PROFICIENCY_TYPES
} from './character_variables';
import * as Calculators from './calculators';

class CharacterSheet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			character: this.props.character,
			saved: false,
		};
	}

	componentDidMount() {
		const newState = merge({}, this.state);
		this.calculateFields({
			newState,
			races: this.props.races,
			charClasses: this.props.charClasses,
			backgrounds: this.props.backgrounds,
			armors: this.props.armors
		});
		this.setState(newState);
	}

	componentWillReceiveProps(newProps) {
		const newState = { character: merge({}, newProps.character) };
		this.calculateFields({
			newState,
			races: this.props.races,
			charClasses: this.props.charClasses,
			backgrounds: this.props.backgrounds,
			armors: this.props.armors
		});
		this.setState(newState, () => (window.character = this.state.character));
	}

	calculateFields({ newState, races, charClasses, backgrounds, armors }) {
		_CALCULATED_FIELDS.forEach((field) => {
			const camel = camelCase(field);
			Calculators[camel]({ newState, races, charClasses, backgrounds, armors });
		});
	}

	addCharacterBonuses(category) {
		const newState = merge({}, this.state);
		const pluralized = _CATEGORIES[category];
		const categoryInfo = this.props[pluralized][this.state.character[category]];
		const proficiencyTypes = _PROFICIENCY_TYPES.map((type) => camelCase(type));
		proficiencyTypes.forEach((type) => {
			(categoryInfo[`${type}Proficiencies`] || []).forEach((item) => {
				if (
					!newState.character[`${type}Proficiencies`].some(
						(prof) => prof._id === item._id
					) && item.level <= newState.character.level
				)
					newState.character[`${type}Proficiencies`].push(item);
			});
		});
		(categoryInfo.skillProficiencies || []).forEach((skill) => {
			newState.character[`${skill.name}Proficiency`] = skill;
		});
		(categoryInfo.saveProficiencies || []).forEach((save) => {
			newState.character[`${save.name}SaveProficiency`] = save;
		});
		(categoryInfo.bonuses || []).forEach((bonus) => {
			if (!newState.character.bonuses.some((bon) => bon._id === bonus._id) && bonus.level <= newState.character.level)
				newState.character.bonuses.push(bonus);
		});
		newState.character.gold += categoryInfo.gold || 0;
		this.setState(newState, () => this.handleSubmit());
	}

	handleChange(field) {
		return (e) => {
			const newState = merge({}, this.state);
			if (e.target.type === 'checkbox') {
				newState.character[field] = e.target.checked
					? { name: e.target.value, is: true }
					: { name: e.target.value, is: false };
			} else {
				newState.character[field] = e.target.value;
			}
			this.calculateFields({
				newState,
				races: this.props.races,
				charClasses: this.props.charClasses,
				backgrounds: this.props.backgrounds,
				armors: this.props.armors
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

	handleProficiencySubmit(newProf) {
		const newState = merge({}, this.state);
		const category = `${newProf.type}Proficiencies`;
		if (newProf._id) {
			const profIdx = newState.character[category].findIndex(
				(prof) => prof._id === newProf._id
			);
			newState.character[category][profIdx] = newProf;
		} else {
			newState.character[category].push(newProf);
		}
		this.setState(newState, () => this.handleSubmit());
	}

	handleRemoveItem(itemId, itemType) {
		return (e) => {
			e.stopPropagation();
			e.preventDefault();
			const newState = merge({}, this.state);
			newState.character[itemType] = newState.character[itemType].filter(
				(item) => item._id !== itemId
			);
			this.setState(newState, () => this.handleSubmit());
		};
	}

	handleSubmit(e) {
		if (e) e.preventDefault();
		if (this.state.character.name) this.props.submitCharacter(this.state.character).then(({character}) => {
			if (!this.state.character._id) {
				this.props.history.push(`/characters/${character._id}`)
			}
		});
	}

	renderNameLevel() {
		return [
			<label key={1}>
				<h3>Name </h3>
				<input
					required
					type="text"
					value={this.state.character.name}
					onChange={this.handleChange('name')}
				/>
			</label>,
			<label key={2}>
				<h3>Level </h3>
				<input
					type="number"
					value={this.state.character.level}
					onChange={this.handleChange('level')}
					min="1"
					max="20"
				/>
			</label>
		];
	}

	renderPhysicalAttributes() {
		return _PHYSICAL_ATTRIBUTES.map((attr, i) => {
			const camel = camelCase(attr);
			return (
				<label key={i}>
					<h3>{attr}</h3>
					<input
						type="text"
						value={this.state.character[camel]}
						onChange={this.handleChange(camel)}
					/>
				</label>
			);
		});
	}

	renderAlignments(selectedAlignment) {
		return (
			<AlignmentMenu
				alignments={_ALIGNMENTS}
				handleChange={this.handleChange('alignment')}
				selectedAlignment={selectedAlignment}
			/>
		);
	}

	renderDropdownMenu(options, selectedOption, handleChange, field) {
		return (
			<DropdownMenu
				options={options}
				selectedOption={selectedOption}
				handleChange={handleChange}
				field={field}
			/>
		);
	}

	renderHealth() {
		return [
			<label key={1}>
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
			</label>,
			this.renderHitDice()
		];
	}

	renderHitDice() {
		const charClass = this.props.charClasses[this.state.character.charClass];
		return [
			<label key={2} className="tooltip-container">
				<h3>Hit Die</h3>
				{charClass ? `d${charClass.hitDie}` : ''}
				<Tooltip
					listItems={[{ key: 'Source', val: charClass ? charClass.name : '' }]}
				/>
			</label>,
			<label key={3}>
				<h3>Hit Dice</h3>
				<input
					type="number"
					value={this.state.character.hitDice}
					min="0"
					onChange={this.handleChange('hitDice')}
				/>
				<Tooltip listItems={[{ key: 'Num', val: 'One per level' }]} />
			</label>
		];
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
		const inputs = _ABILITIES.map((ability, i) => {
			const camel = camelCase(ability);
			const modString =
				this.state.character[`${camelCase(ability)}Modifier`] >= 0
					? '( +'
					: '(  ';
			return (
				<li key={i}>
					<label>
						{ability}: {modString}
						{this.state.character[`${camelCase(ability)}Modifier`]})
						<input
							type="number"
							min="0"
							max="30"
							value={this.state.character[camel]}
							onChange={this.handleChange(camel)}
						/>
					</label>
				</li>
			);
		});
		return <ul className="row">{inputs}</ul>;
	}

	renderSavingThrows() {
		const inputs = _ABILITIES.map((ability, i) => {
			const camelThrow = camelCase(ability) + 'SavingThrow';
			const camelProf = camelCase(ability) + 'SaveProficiency';
			return (
				<li key={i}>
					<label className="tooltip-container">
						{ability}
						{this.state.character[camelThrow] >= 0 ? ' +' : '   '}
						{this.state.character[camelThrow]}
						<input
							type="checkbox"
							onChange={this.handleChange(camelProf)}
							checked={this.state.character[camelProf].is}
							value={camelProf}
						/>
						<Tooltip
							listItems={[
								{ key: 'Source', val: this.state.character[camelProf].source }
							]}
						/>
					</label>
				</li>
			);
		});
		return <ul className="row">{inputs}</ul>;
	}

	renderSkills() {
		const inputs = Object.keys(_SKILLS).map((skill, i) => {
			const camel = camelCase(skill);
			const camelProf = camelCase(skill) + 'Proficiency';
			return (
				<li key={i}>
					<label className="tooltip-container">
						{skill} ({_SKILLS[skill].slice(0, 3)})
						{this.state.character[camel] >= 0 ? ' +' : '   '}
						{this.state.character[camel]}
						<input
							type="checkbox"
							onChange={this.handleChange(camelProf)}
							checked={this.state.character[camelProf].is}
							value={camelProf}
						/>
						<Tooltip
							listItems={[
								{
									key: 'Source',
									val: this.state.character[camelProf].source
								}
							]}
						/>
					</label>
				</li>
			);
		});
		return <ul className="row">{inputs}</ul>;
	}

	renderMoney() {
		return (
			<div className="row">
				<label>
					Copper:{' '}
					<input
						type="number"
						min="0"
						value={this.state.character.copper}
						onChange={this.handleChange('copper')}
					/>
				</label>
				<label>
					Silver:{' '}
					<input
						type="number"
						min="0"
						value={this.state.character.silver}
						onChange={this.handleChange('silver')}
					/>
				</label>
				<label>
					Gold:{' '}
					<input
						type="number"
						min="0"
						value={this.state.character.gold}
						onChange={this.handleChange('gold')}
					/>
				</label>
				<label>
					Platinum:{' '}
					<input
						type="number"
						min="0"
						value={this.state.character.platinum}
						onChange={this.handleChange('platinum')}
					/>
				</label>
			</div>
		);
	}

	renderProficiencies() {
		return _PROFICIENCY_TYPES.map((type, i) => {
			const camel = camelCase(type);
			return (
				<div key={i} className="col one-of-20">
					<h3>{type} Proficiencies</h3>
					<Proficiencies
						type={camel}
						items={this.state.character[`${camel}Proficiencies`]}
						handleRemoveItem={this.handleRemoveItem.bind(this)}
						handleProficiencySubmit={this.handleProficiencySubmit.bind(this)}
					/>
				</div>
			);
		});
	}

	renderBonuses() {
		let forms = this.state.character.bonuses.map((bonus, i) => (
			<div key={i} className="row">
				<BonusForm
					handleBonusSubmit={this.handleBonusSubmit.bind(this)}
					handleRemoveItem={this.handleRemoveItem(bonus._id, 'bonuses')}
					bonus={bonus}
					skills={_SKILLS}
				/>
			</div>
		));
		forms = forms.concat(
			<BonusForm
				key={forms.length}
				handleBonusSubmit={this.handleBonusSubmit.bind(this)}
				bonus={{
					name: '',
					field: '',
					description: '',
					bonusAmount: 0,
					level: this.state.character.level,
					source: ''
				}}
				skills={_SKILLS}
			/>
		);
		return <div className="col">{forms}</div>;
	}

	renderAddBonusButton(category, label) {
		return (
			<button
				disabled={!this.state.character[category]}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					this.addCharacterBonuses(category);
				}}>
				➕ {label} Bonuses
			</button>
		);
	}

	render() {
		return (
			<main className="character-sheet">
				<nav>
					<Link to={`/users/${this.props.currentUser._id}`}>Back to Home</Link>
				</nav>
				<form
					className="character-form"
					onSubmit={this.handleSubmit.bind(this)}>
					<div className="row">
						<input type="submit" value="Save" />
					</div>
					<div className="row">{this.renderNameLevel()}</div>
					<div className="row">{this.renderPhysicalAttributes()}</div>
					<div className="row blocks">
						<div className="alignment">
							<label>
								<h3>Alignment</h3>
								{this.renderAlignments(this.state.character.alignment)}
							</label>
						</div>
						<div className="race">
							<label>
								<h3>Race</h3>
								{this.renderDropdownMenu(
									this.props.races,
									this.state.character.race ? this.state.character.race : '',
									this.handleChange('race'),
									'Race'
								)}
							</label>
							{this.renderAddBonusButton('race', 'Race')}
						</div>
						<div className="class">
							<label>
								<h3>Class</h3>
								{this.renderDropdownMenu(
									this.props.charClasses,
									this.state.character.charClass
										? this.state.character.charClass
										: '',
									this.handleChange('charClass'),
									'Class'
								)}
							</label>
							{this.renderAddBonusButton('charClass', 'Class')}
						</div>
						<div className="background">
							<label>
								<h3>Background</h3>
								{this.renderDropdownMenu(
									this.props.backgrounds,
									this.state.character.background
										? this.state.character.background
										: '',
									this.handleChange('background'),
									'Background'
								)}
							</label>
							{this.renderAddBonusButton('background', 'Background')}
						</div>
					</div>
					<div className="row">
						{this.renderHealth()}
						<div className="row">
							<div className="shield">
								<label>
									<h3>Shield</h3>
									<input
										type="checkbox"
										value={this.state.character.shielded}
										onChange={this.handleChange('shielded')}
									/>
								Shielded?
								</label>
							</div>
							<div className="armor">
								<label>
									<h3>Armor </h3>
									{this.renderDropdownMenu(
										this.props.armors,
										this.state.character.armor
											? this.state.character.armor
											: '',
										this.handleChange('armor'),
										'Armor'
									)}
								</label>
							</div>
						</div>
					</div>
					<div className="row">{this.renderCalculatedFields()}</div>
					<div className="row">
						<div className="col">
							<h3>Ability Scores</h3>
							<div>{this.renderAbilityScores()}</div>
						</div>
						<div className="col">
							<h3>Saving Throws</h3>
							<div>{this.renderSavingThrows()}</div>
						</div>
						<div className="col">
							<h3>Skills</h3>
							<div>{this.renderSkills()}</div>
						</div>
					</div>
					<div className="col">
						<h3>Money</h3>
						{this.renderMoney()}
					</div>
				</form>
				<div className="proficiency-section">
					<div className="row">{this.renderProficiencies()}</div>
					<h3>Add Proficiencies</h3>
					<ProficiencyForm
						handleProficiencySubmit={this.handleProficiencySubmit.bind(this)}
						item={{name: '', type: '', level: 1}}
					/>
				</div>
				<div className="bonus-section">
					<h3>Traits, Bonuses, Feats, etc.</h3>
					{this.renderBonuses()}
				</div>
			</main>
		);
	}
}

export default CharacterSheet;

// TODO:
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
// sort bonuses by level
