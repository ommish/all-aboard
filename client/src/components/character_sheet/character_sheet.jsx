import React from 'react';
import { merge, camelCase } from 'lodash';
import BonusForm from './form_components/bonus_form';
import Bonus from './form_components/bonus';
import AlignmentMenu from './form_components/alignment_menu';
import DropdownMenu from './form_components/dropdown_menu';
import Proficiency from './form_components/proficiency';
import ProficiencyForm from './form_components/proficiency_form';
import Equipment from './form_components/equipment';
import EquipmentForm from './form_components/equipment_form';
import Weapon from './form_components/weapon';
import WeaponForm from './form_components/weapon_form';
import Spells from './form_components/spells';
import Tooltip from '../helpers/tooltip';
import './character_sheet.css';
import {
  _ABILITIES,
  _SKILLS,
  _PHYSICAL_ATTRIBUTES,
  _ALIGNMENTS,
  _CALCULATED_FIELDS,
  _CATEGORIES,
  _PROFICIENCY_TYPES,
} from './character_variables';
import * as Calculators from './calculators';
import { sortByParams } from '../../util/sorters';

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: this.props.character,
      saved: true,
    };
    this.handleSubmitItem = this.handleSubmitItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleEditSpell = this.handleEditSpell.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const newState = merge({}, this.state);
    this.calculateFields({
      newState,
      races: this.props.races,
      charClasses: this.props.charClasses,
      backgrounds: this.props.backgrounds,
      armors: this.props.armors,
    });
    this.setState(newState);
  }

  componentWillReceiveProps(newProps) {
    const newState = { character: merge({}, newProps.character), saved: true };
    this.calculateFields({
      newState,
      races: this.props.races,
      charClasses: this.props.charClasses,
      backgrounds: this.props.backgrounds,
      armors: this.props.armors,
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
          !newState.character[`${type}Proficiencies`].some((prof) => prof._id === item._id) &&
          item.level <= newState.character.level
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
    newState.character.gold = parseInt(newState.character.gold) + (parseInt(categoryInfo.gold) || 0);
    this.setState(newState, () => this.handleSubmit());
  }

  handleChange(field) {
    return (e) => {
      const newState = merge({}, this.state);
      newState.saved = false;
      if (e.target.type === 'checkbox') {
        if (field === 'shielded') {
          newState.character[field] = e.target.checked;
        } else {
          newState.character[field] = e.target.checked
            ? { name: e.target.value, is: true }
            : { name: e.target.value, is: false };
        }
      } else {
        newState.character[field] = e.target.value;
      }
      this.calculateFields({
        newState,
        races: this.props.races,
        charClasses: this.props.charClasses,
        backgrounds: this.props.backgrounds,
        armors: this.props.armors,
      });
      this.setState(newState);
    };
  }

  handleEditItem(editedItem, category) {
    const itemCopy = merge({}, editedItem);
    const newState = merge({}, this.state);
    newState.saved = false;
    const itemIdx = newState.character[category].findIndex((item) => item._id === itemCopy._id);
    itemCopy.editing = true;
    newState.character[category][itemIdx] = itemCopy;
    this.setState(newState);
  }

  handleEditSpell(spells) {
    const newState = merge({}, this.state);
    newState.saved = false;
    newState.character.spells = spells;
    this.setState(newState);
  }

  handleSubmitItem(newItem, category) {
    const itemCopy = merge({}, newItem);
    const newState = merge({}, this.state);
    newState.saved = false;
    if (itemCopy._id) {
      const itemIdx = newState.character[category].findIndex((bonus) => bonus._id === itemCopy._id);
      itemCopy.editing = false;
      newState.character[category][itemIdx] = itemCopy;
    } else {
      newState.character[category].push(itemCopy);
    }
    this.setState(newState, () => this.handleSubmit());
  }

  handleRemoveItem(itemId, itemType) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      const newState = merge({}, this.state);
      newState.saved = false;
      newState.character[itemType] = newState.character[itemType].filter((item) => item._id !== itemId);
      this.setState(newState, () => this.handleSubmit());
    };
  }

  handleSubmit(e) {
    if (e) e.preventDefault();
    if (this.state.character.name)
      this.props.submitCharacter(this.state.character).then(({ character }) => {
        this.setState({ saved: true });
        this.props.addNotification({
          title: 'Saved!',
          message: 'Your character has saved successfully',
          type: 'success',
        });
        if (!this.state.character._id) {
          this.props.history.push(`/characters/${character._id}`);
        }
      });
  }

  renderNameLevel() {
    const { name, level } = this.state.character;
    return (
      <div className="row">
        <label>
          <h3>Name </h3>
          <input required type="text" value={name} onChange={this.handleChange('name')} />
        </label>
        <label>
          <h3>Level </h3>
          <input type="number" value={level} onChange={this.handleChange('level')} min="1" max="20" />
        </label>
      </div>
    );
  }

  renderAppearance() {
    const { character } = this.state;
    return _PHYSICAL_ATTRIBUTES.map((attr, i) => {
      const camel = camelCase(attr);
      return (
        <label key={i}>
          {attr}:
          <input className="small-input" type="text" value={character[camel]} onChange={this.handleChange(camel)} />
        </label>
      );
    });
  }

  renderAlignments(selectedAlignment) {
    return (
      <label>
        <h3>Alignment</h3>
        <AlignmentMenu
          alignments={_ALIGNMENTS}
          handleChange={this.handleChange('alignment')}
          selectedAlignment={selectedAlignment}
        />
      </label>
    );
  }

  renderDropdownMenu(options, selectedOption, handleChange, field) {
    return (
      <label>
        <h3>{field}</h3>
        <DropdownMenu options={options} selectedOption={selectedOption} handleChange={handleChange} field={field} />
      </label>
    );
  }

  renderHealth() {
    const {
      character: { currentHealth, maxHealth },
    } = this.state;
    return [
      <label key={1}>
        <h3>Health </h3>
        <input type="number" min="0" max="999" value={currentHealth} onChange={this.handleChange('currentHealth')} />
        /
        <input type="number" min="0" max="999" value={maxHealth} onChange={this.handleChange('maxHealth')} />
      </label>,
      this.renderHitDice(),
      this.renderDeathSaves(),
    ];
  }

  renderHitDice() {
    const { charClasses } = this.props;
    const {
      character: { charClass, hitDice },
    } = this.state;
    const charClassData = charClasses[charClass];
    return [
      <label key={2} className="tooltip-container">
        <h3>Hit Die</h3>
        {charClassData ? `d${charClassData.hitDie}` : ''}
        <Tooltip listItems={[{ key: 'Source', val: charClassData ? charClassData.name : '' }]} />
      </label>,
      <label key={3}>
        <h3>Hit Dice</h3>
        <input className="small-input" type="number" value={hitDice} min="0" onChange={this.handleChange('hitDice')} />
        <Tooltip listItems={[{ key: 'Num', val: 'One per level' }]} />
      </label>,
    ];
  }

  renderDeathSaves() {
    const {
      character: { successfulDeathSaves, failedDeathSaves },
    } = this.state;
    return (
      <div key={4} className="death-saves">
        <h3>Death Saves</h3>
        <label className="death-save-inputs">
          👍
          {[0, 1, 2, 3].map((num) => (
            <label key={`success${num}`}>
              {num}
              <input
                name="successfulDeathSaves"
                type="radio"
                value={num}
                checked={successfulDeathSaves == num}
                onChange={this.handleChange('successfulDeathSaves')}
              />
            </label>
          ))}
        </label>
        <label className="death-save-inputs">
          👎
          {[0, 1, 2, 3].map((num) => (
            <label key={`fail${num}`}>
              {num}
              <input
                name="failedDeathSaves"
                type="radio"
                value={num}
                checked={failedDeathSaves == num}
                onChange={this.handleChange('failedDeathSaves')}
              />
            </label>
          ))}
        </label>
      </div>
    );
  }

  renderCalculatedFields() {
    const { character } = this.state;
    return ['Proficiency Bonus', 'Initiative', 'Passive Perception', 'Armor Class', 'Speed'].map((field, i) => (
      <label key={i}>
        <h3>{field} </h3>
        {character[camelCase(field)] >= 0 ? ' +' : '   '}
        {character[camelCase(field)]}
      </label>
    ));
  }

  renderAbilityScores() {
    const { character } = this.state;
    const inputs = _ABILITIES.map((ability, i) => {
      const camel = camelCase(ability);
      const modString = character[`${camelCase(ability)}Modifier`] >= 0 ? '( +' : '(  ';
      return (
        <li key={i} className="justified">
          <label>
            {ability}: {modString}
            {character[`${camelCase(ability)}Modifier`]})
            <input type="number" min="0" max="30" value={character[camel]} onChange={this.handleChange(camel)} />
          </label>
        </li>
      );
    });
    return <ul className="row">{inputs}</ul>;
  }

  renderSavingThrows() {
    const { character } = this.state;
    const inputs = _ABILITIES.map((ability, i) => {
      const camelThrow = camelCase(ability) + 'SavingThrow';
      const camelProf = camelCase(ability) + 'SaveProficiency';
      return (
        <li key={i}>
          <label className="tooltip-container">
            <input
              type="checkbox"
              onChange={this.handleChange(camelProf)}
              checked={character[camelProf].is}
              value={camelProf}
            />
            {ability}
            {character[camelThrow] >= 0 ? ' +' : '   '}
            {character[camelThrow]}
            <Tooltip listItems={[{ key: 'Source', val: character[camelProf].source }]} />
          </label>
        </li>
      );
    });
    return <ul>{inputs}</ul>;
  }

  renderSkills() {
    const { character } = this.state;
    const inputs = Object.keys(_SKILLS).map((skill, i) => {
      const camel = camelCase(skill);
      const camelProf = camelCase(skill) + 'Proficiency';
      return (
        <li key={i}>
          <label className="tooltip-container">
            <input
              type="checkbox"
              onChange={this.handleChange(camelProf)}
              checked={character[camelProf].is}
              value={camelProf}
            />
            {skill} ({_SKILLS[skill].slice(0, 3)})
            {character[camel] >= 0 ? ' +' : '   '}
            {character[camel]}
            <Tooltip
              listItems={[
                {
                  key: 'Source',
                  val: character[camelProf].source,
                },
              ]}
            />
          </label>
        </li>
      );
    });
    return <ul>{inputs}</ul>;
  }

  renderMoney() {
    const { character } = this.state;
    return (
      <div>
        <h3>Money</h3>
        <div className="row">
          {['copper', 'silver', 'gold', 'platinum'].map((currency, i) => (
            <label key={i}>
              {`${currency[0].toUpperCase()}${currency.slice(1)}: `}
              <input
                type="number"
                min="0"
                value={character[currency]}
                onChange={this.handleChange(currency)}
                className="small-input"
              />
            </label>
          ))}
        </div>
      </div>
    );
  }

  renderBackstory() {
    const {
      character: { backstory },
    } = this.state;
    return (
      <div className="backstory">
        <h3>Backstory</h3>
        <textarea onChange={this.handleChange('backstory')} value={backstory} />
      </div>
    );
  }

  renderProficiencies() {
    return _PROFICIENCY_TYPES.map((type, i) => {
      const camel = camelCase(type);
      const proficiencies = this.state.character[`${camel}Proficiencies`];
      const proficienciesOfType = proficiencies.map((proficiency, j) => {
        return proficiency.editing ? (
          <ProficiencyForm key={j} type={camel} item={proficiency} handleSubmitItem={this.handleSubmitItem} />
        ) : (
          <Proficiency
            key={j}
            type={camel}
            item={proficiency}
            handleRemoveItem={this.handleRemoveItem}
            handleEditItem={this.handleEditItem}
          />
        );
      });
      return (
        <div key={i}>
          <h4>{type}s</h4>
          <div>{proficienciesOfType}</div>
        </div>
      );
    });
  }

  renderEquipment() {
    return this.state.character.equipment.map((equipment, i) => {
      return equipment.editing ? (
        <EquipmentForm key={i} item={equipment} handleSubmitItem={this.handleSubmitItem} />
      ) : (
        <Equipment
          key={i}
          item={equipment}
          handleRemoveItem={this.handleRemoveItem}
          handleEditItem={this.handleEditItem}
        />
      );
    });
  }

  renderSpells() {
    const {
      character: { spells },
    } = this.state;
    return <Spells onChange={this.handleEditSpell} value={spells} />;
  }

  renderMisc() {
    const {
      character: { miscellaneous },
    } = this.state;
    return <textarea onChange={this.handleChange('miscellaneous')} value={miscellaneous} />;
  }

  renderWeapons() {
    const { character } = this.state;
    return character.weapons.map((weapon, i) => {
      return weapon.editing ? (
        <WeaponForm key={i} item={weapon} handleSubmitItem={this.handleSubmitItem} />
      ) : (
        <Weapon
          key={i}
          item={weapon}
          character={character}
          handleRemoveItem={this.handleRemoveItem}
          handleEditItem={this.handleEditItem}
        />
      );
    });
  }

  renderBonuses() {
    const {
      character: { bonuses },
    } = this.state;
    const sortedBonuses = merge([], bonuses).sort(sortByParams(1, 'level', 'source'));
    return sortedBonuses.map((bonus, i) => {
      return bonus.editing ? (
        <BonusForm key={i} bonus={bonus} handleSubmitItem={this.handleSubmitItem} />
      ) : (
        <Bonus
          key={i}
          bonus={bonus}
          type="bonuses"
          handleRemoveItem={this.handleRemoveItem}
          handleEditItem={this.handleEditItem}
        />
      );
    });
  }

  renderAddBonusButton(category) {
    const { character } = this.state;
    return (
      <button
        className="add-button"
        disabled={!character[category]}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          this.addCharacterBonuses(category);
        }}
      >
        ➕ Bonuses
      </button>
    );
  }

  renderToggleButton(section) {
    const { toggleSection, uiState } = this.props;
    const symbol = section.includes('Form') ? ['⬏', '⬎'] : ['▼', '▲'];
    return (
      <button
        className="hide-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleSection(section);
        }}
      >
        {uiState[section] ? symbol[0] : symbol[1]}
      </button>
    );
  }

  render() {
    const { races, charClasses, backgrounds, armors, uiState } = this.props;
    const {
      saved,
      character: { race, charClass, background, armor, alignment, shielded },
    } = this.state;
    return (
      <main className="character-sheet">
        <form className="character-form" onSubmit={this.handleSubmit}>
          <div className="mar-20">
            <input disabled={saved} className="add-button" type="submit" value="💾 Save Character" />
          </div>
          <div className="basics-and-scores row">
            <div className="col-50">
              {this.renderNameLevel()}
              <div className="row blocks">
                <div className="race">
                  {this.renderDropdownMenu(races, race ? race : '', this.handleChange('race'), 'Race')}
                  {this.renderAddBonusButton('race')}
                </div>
                <div className="class">
                  {this.renderDropdownMenu(
                    charClasses,
                    charClass ? charClass : '',
                    this.handleChange('charClass'),
                    'Class',
                  )}
                  {this.renderAddBonusButton('charClass')}
                </div>
                <div className="background">
                  {this.renderDropdownMenu(
                    backgrounds,
                    background ? background : '',
                    this.handleChange('background'),
                    'Background',
                  )}
                  {this.renderAddBonusButton('background')}
                </div>
                <div className="alignment">{this.renderAlignments(alignment)}</div>
              </div>
              <div className="row blocks">
                {this.renderHealth()}
                <div className="armor">
                  {this.renderDropdownMenu(armors, armor ? armor : '', this.handleChange('armor'), 'Armor')}
                </div>
                <div>
                  <label>
                    <h3>Shield</h3>
                    <input type="checkbox" checked={shielded} onChange={this.handleChange('shielded')} />
                  </label>
                </div>
              </div>
              {this.renderMoney()}
              <div>
                <h3>Appearance{this.renderToggleButton('appearance')}</h3>
                <div className="row">{uiState.appearance ? this.renderAppearance() : null}</div>
              </div>
              {this.renderBackstory()}
            </div>
            <div className="col-50">
              <div className="col">
                <div className="row blocks">{this.renderCalculatedFields()}</div>
                <div className="scores row blocks">
                  <div className="col-30">
                    <h3>Ability Scores</h3>
                    <div>{this.renderAbilityScores()}</div>
                  </div>
                  <div className="col-30">
                    <h3>Saving Throws</h3>
                    <div>{this.renderSavingThrows()}</div>
                  </div>
                  <div className="col-30">
                    <h3>Skills</h3>
                    <div>{this.renderSkills()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="weapons-and-profs row block">
          <div className="weapon-section col-30">
            <h3>Weapons</h3>
            <div className="col">{this.renderWeapons()}</div>
            <div className="col">
              <h4>Add Weapon {this.renderToggleButton('weaponForm')}</h4>
              {uiState.weaponForm ? (
                <WeaponForm
                  handleSubmitItem={this.handleSubmitItem}
                  item={{
                    name: '',
                    description: '',
                    bonusAmount: 0,
                    modifier: 'strength',
                    damageRoll: 8,
                    proficiency: false,
                    damageDice: 1,
                  }}
                />
              ) : null}
            </div>
          </div>
          <div className="proficiency-section col-60">
            <h3>Proficiencies {this.renderToggleButton('proficiencies')}</h3>
            <div className="row blocks">{uiState.proficiencies ? this.renderProficiencies() : null}</div>
            {uiState.proficiencies ? (
              <div className="col">
                <h4>Add Proficiency {this.renderToggleButton('proficiencyForm')}</h4>
                {uiState.proficiencyForm ? (
                  <ProficiencyForm handleSubmitItem={this.handleSubmitItem} item={{ name: '', type: '', level: 1 }} />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div className="bonus-section">
          <h3>Traits, Bonuses, Feats, etc. {this.renderToggleButton('bonuses')}</h3>
          <div className="col blocks">{uiState.bonuses ? this.renderBonuses() : null}</div>
          {uiState.bonuses ? (
            <div className="col">
              <h4>Add Bonus {this.renderToggleButton('bonusForm')}</h4>
              {uiState.bonusForm ? (
                <BonusForm
                  handleSubmitItem={this.handleSubmitItem}
                  bonus={{
                    name: '',
                    description: '',
                    source: '',
                    level: 1,
                    field: '',
                    bonusAmount: 0,
                  }}
                />
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="equip-spells-misc row block">
          <div className="equipment-section col-25">
            <h3>Equipment {this.renderToggleButton('equipment')}</h3>
            <div className="col">{uiState.equipment ? this.renderEquipment() : null}</div>
            {uiState.equipment ? (
              <div className="col">
                <h4>Add Equipment {this.renderToggleButton('equipmentForm')}</h4>
                {uiState.equipmentForm ? (
                  <EquipmentForm
                    handleSubmitItem={this.handleSubmitItem}
                    item={{ name: '', description: '', weight: 0, source: '' }}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="spell-section col-40">
            <h3>Spells</h3>
            <div className="col">{this.renderSpells()}</div>
          </div>
          <div className="misc-section col-30">
            <h3>Miscellaneous</h3>
            <div className="col">{this.renderMisc()}</div>
          </div>
        </div>
      </main>
    );
  }
}

export default CharacterSheet;

// TODO:
// character image
// refresh shouldn't redirect - because fetching user happens after component mount. try moving this to app load
// add campaign (character can belong to campaign)
// list more than name in character list
// add uniqueness validation
