import React from 'react';
import { merge, camelCase} from 'lodash';

const _ABILITIES = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

const _EDITABLE_NUMERICAL_FIELDS = {
  "Level": { min: 1, max: 20 },
  "Max Health": { min: 1, max: 999 },
  "Current Health": { min: 0, max: 999 },
  "Speed": { min: 0, max: 100 },
  "Armor Class": { min: 0, max: 50 }
};
const _CALCULATED_NUMERICAL_FIELDS = ["Initiative", "Passive Wisdom"];
const _SKILLS = {
  "Acrobatics": "Dexterity",
  "Animal Handling": "Wisdom",
  "Arcana": "Intelligence",
  "Athletics": "Strength",
  "Deception": "Charisma",
  "History": "Intelligence",
  "Insight": "Wisdom",
  "Intimidation": "Charisma",
  "Investigation": "Intelligence",
  "Medicine": "Wisdom",
  "Nature": "Intelligence",
  "Perception": "Wisdom",
  "Performance": "Charisma",
  "Persuasion": "Charisma",
  "Religion": "Intelligence",
  "Sleight of Hand": "Dexterity",
  "Stealth": "Dexterity",
  "Survival": "Wisdom"
};

class CharacterSheet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      character: this.props.character,
    };
  }

  componentDidMount() {
    // fetch character, then:
    this.calculateFields();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.characterId !== newProps.match.params.characterId) {
      this.setState({character: newProps.character}, () => {
        this.calculateFields();
      });
    }
  }

  calculateFields() {
    const newState = merge({}, this.state);
    this.calculateModifiers(newState);
    this.calculateProficiencyBonus(newState);
    this.calculateArmorClass(newState);
    this.calculateSavingThrows(newState);
    this.calculateSkills(newState);
    this.addSpecialBonuses(newState);
    this.setState(newState, () => window.character = this.state);
  }

  handleChange(field) {
    return (e) => {
      const newState = merge({}, this.state);
      newState.character[field] = e.target.value;
      this.setState(newState);
    }
  }

  handleSubmit() {

  }

  calculateModifiers(newState) {
    newState = newState || merge({}, this.state);
    _ABILITIES.forEach((field) => {
      // see what range ability score is in and calculate modifier
      // set state of character's modifier
    });
  }

  calculateProficiencyBonus(newState) {
    newState = newState || merge({}, this.state);
    // check level
  }

  calculateArmorClass(newState) {
    newState = newState || merge({}, this.state);
    // newState.character.armorClass = newState.character.armor.ac;
    newState.character.armorClass += newState.character.dexterityModifier;
    newState.character.armorClass += newState.character.hasShield ? 2 : 0;
    if (newState.character.class === "Barbarian") {
    } else {
    }
  }

  calculateSavingThrows(newState) {
    newState = newState || merge({}, this.state);
    _ABILITIES.forEach((ability) => {
      const proficiencyBonus = newState.character[`${ability}SaveProficiency`] ? newState.character.proficiencyBonus : 0
      newState.character[`${ability}SavingThrow`] = newState.character[`${ability}Modifier`] + proficiencyBonus;
    });
  }

  calculateSkills(newState) {
    newState = newState || merge({}, this.state);
    Object.keys(_SKILLS).forEach((skill) => {
      const proficiencyBonus = newState.character[`${camelCase(skill)}Proficiency`] ? newState.character.proficiencyBonus : 0
      newState.character[`${camelCase(skill)}Bonus`] = newState.character[`${_SKILLS[skill].toLowerCase()}Modifier`] + proficiencyBonus;
    });
  }

  calculateInitiative(newState) {
    newState.character.initiative = newState.character.dexterityModifier;
  }

  addSpecialBonuses(newState) {
    newState.character.specialBonuses.forEach((bonus) => {
      newState.character[bonus.field] += bonus.change;
    });
  }

  renderBasicTextInfo() {
    const fields = ["Name", "Race", "Class", "Subclass", "Background", "Alignment"];
    return fields.map((field) => {
      <label>{field}
        <input type="text" value={this.state.character[field]} onChange={this.handleChange(field)}/>
      </label>
    });
  }

  renderAbilityScores() {
    return _ABILITIES.map((ability) => {
      <label>{ability.toUpperCase()}
        <input type="number" min="0" max="20" value={this.state.character[ability]} onChange={this.handleChange(ability)}/>
      </label>
    });
  }

  renderEditableNumericalFields() {
    return Object.keys(_EDITABLE_NUMERICAL_FIELDS).map((field) => (
      <label>{field}
        <input value={this.state.character[camelCase(field)]} min={_EDITABLE_NUMERICAL_FIELDS[field].min} max={_EDITABLE_NUMERICAL_FIELDS[field].max} />
      </label>
    ));
  }

  renderCalculatedNumericalFields() {
    return _CALCULATED_NUMERICAL_FIELDS.map((field) => (
      <label>
        {this.state.character[camelCase(field)]}
      </label>
    ));
  }

  renderSavingThrows() {
    return _ABILITIES.map((ability) => (
      <label>{ability.toUpperCase()}
        <input type="checkbox" checked={this.state.character[`${ability}SaveProficiency`]}/>
        {this.state.character[`${ability}SavingThrow`]}
      </label>
    ));
  }

  renderSkills() {
    return Object.keys(_SKILLS).map((skill) => (
      <label>{skill} ({_SKILLS[skill].slice(0, 3)})
        <input type="checkbox" checked={this.state.character[`${camelCase(skill)}Proficiency`]}/>
        +{this.state.character[`${camelCase(skill)}Bonus`]}
      </label>
    ));
  }

  renderSpecialBonuses() {
    // should be form within form?
    return this.state.character.specialBonuses.map((bonus) => (
      <form>
        <label>Name
          <input type="text"/>
        </label>
        <label>Field
          <select name="field">
            {Object.keys(_SKILLS).map((skill) => {
              <option>{skill}</option>
            })}
            <option value="armorClass">Armor Class</option>
          </select>
        </label>
      </form>
    ));
  }

  render() {
    return (
      <form>
        character sheet form
      </form>
    );
  }
}

// feats/special items => name and effect (add to AC, add some num to a skill, initiative, speed, )
// effects => ability score, health, proficiency,

// noneditable fields: proficiency bonuses, saving throws,

export default CharacterSheet;
