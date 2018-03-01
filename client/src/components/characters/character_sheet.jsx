import React from 'react';
import { merge, camelCase } from 'lodash';
import BonusForm from './bonus_form';
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
	Race: { type: 'text' },
	Class: { type: 'text' },
	Subclass: { type: 'text' },
	Background: { type: 'text' },
	Alignment: { type: 'text' }
};
const _CALCULATED_FIELDS = [
	'Proficiency Bonus',
	'Initiative',
	'Passive Wisdom',
	'Armor Class'
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
		this.calculateModifiers(newState);
		this.calculateProficiencyBonus(newState);
		this.calculateSavingThrows(newState);
		this.calculateSkills(newState);
		this.calculateInitiative(newState);
		this.calculatePassiveWisdom(newState);
		this.calculateArmorClass(newState);
		this.addBonuses(newState);
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
		}
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
			if (newState.character.charClass === 'barbarian') {
				modifier += newState.character.constitutionModifier;
			} else if (newState.character.charClass === 'monk') {
				modifier += newState.character.wisdomModifier;
			} else if (newState.character.charClass === 'sorcerer') {
				newState.character.armorClass = 13;
			}
		}
		modifier += newState.character.shielded ? 2 : 0;
		newState.character.armorClass += modifier;
	}

	addBonuses(newState) {
		newState.character.bonuses.forEach((bonus) => {
			newState.character[bonus.field] += bonus.bonusAmount;
		});
	}

	renderEditableFields() {
		return Object.keys(_EDITABLE_FIELDS).map((field, i) => {
			const camel = field === 'Class' ? 'charClass' : camelCase(field);
			return (
				<label key={i}>
					<h3>{field} </h3>
					<input
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

	renderCalculatedFields() {
		return _CALCULATED_FIELDS.map((field, i) => (
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

	render() {
		return [
			<form
				key={1}
				className="character-form"
				onSubmit={this.handleSubmit.bind(this)}>
				<div className="character-form-1">{this.renderEditableFields()}</div>
				<div className="character-form-1">{this.renderHealth()}</div>
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
				<input type="submit" value="Update" />
			</form>,
			<div key={2} className="character-form-6">
				<h3>Special Bonuses (feats, magic items, etc.)</h3>
				{this.renderBonuses()}
			</div>
		];
	}
}

// feats/special items => name and effect (add to AC, add some num to a skill, initiative, speed, )
// effects => ability score, health, proficiency,

// noneditable fields: proficiency bonuses, saving throws,

export default CharacterSheet;

// TODO: make charClass model to help auto calculate fields
// refactor
//
