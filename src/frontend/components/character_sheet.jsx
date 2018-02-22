import React from 'react';
import { merge, camelCase} from 'lodash';

const _ABILITIES = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
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

class CharacterSheet {

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
    this.setState(newState);
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
    // barbarian without armor?
    // 10 + dexMod + armor + shield + special items/feats
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

  addSpecialBonuses(newState) {
    newState.character.specialBonuses.forEach((bonus) => {
      newState.character[bonus.field] += bonus.change;
    });
  }

  renderBasicTextInfo() {
    const fields = ["name", "race", "class", "subclass", "background", "alignment"];
    return fields.map((field) => {
      <label>{field.toUpperCase()}
        <input type="text" value={this.state.character[field]} onChange={this.handleChange(field)}/>
      </label>
    });
  }

  renderAbilityScores() {
    return _ABILITIES.map((ability) => {
      <label>{ability.toUpperCase()}
        <input type="number" min="0" max="20" value={this.state.character[ability] onChange={this.handleChange(ability)}}/>
      </label>
    });
  }

  renderBasicNumberInfo() {
    const fields = ["level", "maxHealth", "currentHealth", "speed", "initiative", "passiveWisdom", "armorClass"];
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
        <input type="checkbox" checked={this.state.character{`${camelCase(skill)}Proficiency`}}/>
        +{this.state.character[`${camelCase(skill)}Bonus`]}
      </label>
    ));
  }

  renderSpecialBonuses() {
    // should be form within form?
    return this.state.character.specialBonuses.map((bonus) => {
      <label>Name
        <input type="text"/>
      </label>
      <label>Field
        <select name="field">
          {Object.keys(_SKILLS).map((skill) => {
            <option>{skill}</option>
          })}
          <option value={armorClass}>Armor Class</option>
        </select>
      </label>
    });
  }

  render() {
    <form>
      {this.renderTextInputs()}
      {this.renderAbilityScores()}
    </form>
  }
}

// feats/special items => name and effect (add to AC, add some num to a skill, initiative, speed, )
// effects => ability score, health, proficiency,

// noneditable fields: proficiency bonuses, saving throws,
