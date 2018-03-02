import React from 'react';
import { merge, camelCase } from 'lodash';
import { Link } from 'react-router-dom';
import BonusForm from './form_components/bonus_form';
import RaceMenu from './form_components/race_menu';
import ClassMenu from './form_components/class_menu';
import Money from './form_components/money';
import './character_sheet.css';

const _ABILITIES = [
	'Strength',
	'Dexterity',
	'Constitution',
	'Intelligence',
	'Wisdom',
	'Charisma'
];
const _SKILLS = {
	Acrobatics: 'Dexterity',
	'Animal Handling': 'Wisdom',
	Arcana: 'Intelligence',
	Athletics: 'Strength',
	Deception: 'Charisma',
	History: 'Intelligence',
	Insight: 'Wisdom',
	Intimidation: 'Charisma',
	Investigation: 'Intelligence',
	Medicine: 'Wisdom',
	Nature: 'Intelligence',
	Perception: 'Wisdom',
	Performance: 'Charisma',
	Persuasion: 'Charisma',
	Religion: 'Intelligence',
	'Sleight of Hand': 'Dexterity',
	Stealth: 'Dexterity',
	Survival: 'Wisdom'
};
const _EDITABLE_FIELDS = {
	Name: { type: 'text' },
	Level: { type: 'number', min: 1, max: 20 },
	Subclass: { type: 'text' },
	Background: { type: 'text' },
	Alignment: { type: 'text' }
};
const _CALCULATED_FIELDS = [
	'Modifiers',
	'ProficiencyBonus',
	'SavingThrows',
	'Skills',
	'Initiative',
	'PassiveWisdom',
	'ArmorClass',
	'Speed',
	'Bonuses'
];

class CharacterSheet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			character: this.props.character
		};
	}

	componentDidMount() {
		// fetch character, then:
		this.calculateFields();
	}

	componentWillReceiveProps(newProps) {
		if (
			this.props.match.params.characterId !== newProps.match.params.characterId
		) {
			this.setState({ character: newProps.character }, () => {
				this.calculateFields();
			});
		}
	}

	calculateFields(newState) {
		newState = newState || merge({}, this.state);
		_CALCULATED_FIELDS.forEach((field) => {
			this[`calculate${field}`](newState);
		});
		this.setState(newState, () => (window.character = this.state.character));
	}

	handleChange(field) {
		return (e) => {
			const newState = merge({}, this.state);
			newState.character[field] =
				e.target.type === 'checkbox' ? e.target.checked : e.target.value;
			this.calculateFields(newState);
		};
	}

	handleBonusSubmit(newBonus) {
		const newState = merge({}, this.state);
		if (newBonus._id) {
			newState.character.bonuses.filter(
				(bonus) => bonus._id === newBonus._id
			)[0] = newBonus;
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

	handleSubmit(e) {
		if (e) e.preventDefault();
		this.props.updateCharacter(this.state.character).then(({ character }) => {
			this.calculateFields({ character });
		});
	}

	calculateModifiers(newState) {
		newState = newState || merge({}, this.state);
		_ABILITIES.forEach((ability) => {
			const field = camelCase(ability);
			const modifier = Math.floor((newState.character[field] - 10) / 2);
			newState.character[`${field}Modifier`] = modifier;
		});
	}

	calculateProficiencyBonus(newState) {
		newState = newState || merge({}, this.state);
		newState.character.proficiencyBonus =
			Math.ceil(newState.character.level / 4) + 1;
	}

	calculateSavingThrows(newState) {
		newState = newState || merge({}, this.state);
		_ABILITIES.forEach((ability) => {
			const field = camelCase(ability);
			const proficiencyBonus = newState.character[`${field}SaveProficiency`]
				? newState.character.proficiencyBonus
				: 0;
			newState.character[`${field}SavingThrow`] =
				newState.character[`${field}Modifier`] + proficiencyBonus;
		});
	}

	calculateSkills(newState) {
		newState = newState || merge({}, this.state);
		Object.keys(_SKILLS).forEach((skill) => {
			const field = camelCase(skill);
			const connectedAbility = camelCase(_SKILLS[skill]);
			const proficiencyBonus = newState.character[`${field}Proficiency`]
				? newState.character.proficiencyBonus
				: 0;
			newState.character[field] =
				newState.character[`${connectedAbility}Modifier`] + proficiencyBonus;
		});
	}

	calculateInitiative(newState) {
		newState = newState || merge({}, this.state);
		newState.character.initiative = newState.character.dexterityModifier;
	}

	calculatePassiveWisdom(newState) {
		newState = newState || merge({}, this.state);
		newState.character.passiveWisdom = 10 + newState.character.perception;
	}

	calculateArmorClass(newState) {
		newState = newState || merge({}, this.state);
		let modifier;
		if (newState.character.armor) {
			newState.character.armorClass = newState.character.armor.baseAc;
			modifier = newState.character.armor.acMod
				? newState.character[newState.character.armor.acMod]
				: 0;
			modifier =
				newState.character.armor.acModLimit &&
				modifier > newState.character.armor.acModLimit
					? newState.character.armor.acModLimit
					: modifier;
		} else {
			newState.character.armorClass = 10;
			modifier = newState.character.dexterityModifier;
			const charClass = this.props.charClasses[newState.character.charClass];
			if (charClass === 'barbarian') {
				modifier += newState.character.constitutionModifier;
			} else if (charClass === 'monk') {
				modifier += newState.character.wisdomModifier;
			} else if (charClass === 'sorcerer') {
				newState.character.armorClass = 13;
			}
		}
		modifier += newState.character.shielded ? 2 : 0;
		newState.character.armorClass += modifier;
	}

	calculateSpeed(newState) {
		newState = newState || merge({}, this.state);
		if (newState.character.race) {
			const race = this.props.races[newState.character.race];
			newState.character.speed = race.speed;
		} else {
			newState.character.speed = 0;
		}
	}

	calculateBonuses(newState) {
		newState.character.bonuses.forEach((bonus) => {
			if (bonus.field) {
				newState.character[bonus.field] += bonus.bonusAmount;
			}
		});
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
					{ability}:
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
		// should be form within form?
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
				<div className="character-form-1">{this.renderRaces()}</div>
				<div className="character-form-1">{this.renderCharClasses()}</div>
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
					<h3>Shielded </h3>
					<div className="character-form-input-group">
						<label>
							Shielded?
							<input
								type="checkbox"
								value={this.state.character.shielded}
								onChange={this.handleChange('shielded')}
							/>
						</label>
					</div>
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
// list to select subclasses from
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
