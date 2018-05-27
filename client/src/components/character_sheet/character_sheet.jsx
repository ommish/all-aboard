import React from "react";
import { merge, camelCase } from "lodash";
import BonusForm from "./form_components/bonus_form";
import Bonus from "./form_components/bonus";
import AlignmentMenu from "./form_components/alignment_menu";
import DropdownMenu from "./form_components/dropdown_menu";
import Proficiency from "./form_components/proficiency";
import ProficiencyForm from "./form_components/proficiency_form";
import Equipment from "./form_components/equipment";
import EquipmentForm from "./form_components/equipment_form";
import Weapon from "./form_components/weapon";
import WeaponForm from "./form_components/weapon_form";
import Tooltip from "../helpers/tooltip";
import "./character_sheet.css";
import {
  _ABILITIES,
  _SKILLS,
  _PHYSICAL_ATTRIBUTES,
  _ALIGNMENTS,
  _CALCULATED_FIELDS,
  _CATEGORIES,
  _PROFICIENCY_TYPES
} from "./character_variables";
import * as Calculators from "./calculators";
import { sortByParams } from "../../util/sorters";

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: this.props.character,
      saved: true
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
    const newState = { character: merge({}, newProps.character), saved: true };
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
    _CALCULATED_FIELDS.forEach(field => {
      const camel = camelCase(field);
      Calculators[camel]({ newState, races, charClasses, backgrounds, armors });
    });
  }

  addCharacterBonuses(category) {
    const newState = merge({}, this.state);
    const pluralized = _CATEGORIES[category];
    const categoryInfo = this.props[pluralized][this.state.character[category]];
    const proficiencyTypes = _PROFICIENCY_TYPES.map(type => camelCase(type));
    proficiencyTypes.forEach(type => {
      (categoryInfo[`${type}Proficiencies`] || []).forEach(item => {
        if (
          !newState.character[`${type}Proficiencies`].some(
            prof => prof._id === item._id
          ) &&
          item.level <= newState.character.level
        )
          newState.character[`${type}Proficiencies`].push(item);
      });
    });
    (categoryInfo.skillProficiencies || []).forEach(skill => {
      newState.character[`${skill.name}Proficiency`] = skill;
    });
    (categoryInfo.saveProficiencies || []).forEach(save => {
      newState.character[`${save.name}SaveProficiency`] = save;
    });
    (categoryInfo.bonuses || []).forEach(bonus => {
      if (
        !newState.character.bonuses.some(bon => bon._id === bonus._id) &&
        bonus.level <= newState.character.level
      )
        newState.character.bonuses.push(bonus);
    });
    newState.character.gold =
      parseInt(newState.character.gold) + (parseInt(categoryInfo.gold) || 0);
    this.setState(newState, () => this.handleSubmit());
  }

  handleChange(field) {
    return e => {
      const newState = merge({}, this.state);
      newState.saved = false;
      if (e.target.type === "checkbox") {
        if (field === "shielded") {
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
        armors: this.props.armors
      });
      this.setState(newState);
    };
  }

  handleEditProficiency(editingProf, type) {
    editingProf = merge({}, editingProf);
    const newState = merge({}, this.state);
    newState.saved = false;
    const category = `${type}Proficiencies`;
    const profIdx = newState.character[category].findIndex(
      prof => prof._id === editingProf._id
    );
    editingProf.editing = true;
    newState.character[category][profIdx] = editingProf;
    this.setState(newState);
  }

  handleEditBonus(editingBonus) {
    editingBonus = merge({}, editingBonus);
    const newState = merge({}, this.state);
    newState.saved = false;
    const bonusIdx = newState.character.bonuses.findIndex(
      bonus => bonus._id === editingBonus._id
    );
    editingBonus.editing = true;
    newState.character.bonuses[bonusIdx] = editingBonus;
    this.setState(newState);
  }

  handleEditEquipment(editingEquipment) {
    editingEquipment = merge({}, editingEquipment);
    const newState = merge({}, this.state);
    newState.saved = false;
    const equipIdx = newState.character.equipment.findIndex(
      equip => equip._id === editingEquipment._id
    );
    editingEquipment.editing = true;
    newState.character.equipment[equipIdx] = editingEquipment;
    this.setState(newState);
  }

  handleEditWeapon(editingWeapon) {
    editingWeapon = merge({}, editingWeapon);
    const newState = merge({}, this.state);
    newState.saved = false;
    const weaponIdx = newState.character.weapons.findIndex(
      weapon => weapon._id === editingWeapon._id
    );
    editingWeapon.editing = true;
    newState.character.weapons[weaponIdx] = editingWeapon;
    this.setState(newState);
  }

  handleProficiencySubmit(newProf) {
    const newState = merge({}, this.state);
    newState.saved = false;
    const category = `${newProf.type}Proficiencies`;
    if (newProf._id) {
      const profIdx = newState.character[category].findIndex(
        prof => prof._id === newProf._id
      );
      newProf.editing = false;
      newState.character[category][profIdx] = newProf;
    } else {
      newState.character[category].push(newProf);
    }
    this.setState(newState, () => this.handleSubmit());
  }

  handleBonusSubmit(newBonus) {
    const newState = merge({}, this.state);
    newState.saved = false;
    if (newBonus._id) {
      const bonusIdx = newState.character.bonuses.findIndex(
        bonus => bonus._id === newBonus._id
      );
      newBonus.editing = false;
      newState.character.bonuses[bonusIdx] = newBonus;
    } else {
      newState.character.bonuses.push(newBonus);
    }
    this.setState(newState, () => this.handleSubmit());
  }

  handleEquipmentSubmit(newEquip) {
    const newState = merge({}, this.state);
    newState.saved = false;
    if (newEquip._id) {
      const equipIdx = newState.character.equipment.findIndex(
        equip => equip._id === newEquip._id
      );
      newEquip.editing = false;
      newState.character.equipment[equipIdx] = newEquip;
    } else {
      newState.character.equipment.push(newEquip);
    }
    this.setState(newState, () => this.handleSubmit());
  }

  handleWeaponSubmit(newWeapon) {
    const newState = merge({}, this.state);
    newState.saved = false;
    if (newWeapon._id) {
      const weaponIdx = newState.character.weapons.findIndex(
        weapon => weapon._id === newWeapon._id
      );
      newWeapon.editing = false;
      newState.character.weapons[weaponIdx] = newWeapon;
    } else {
      newState.character.weapons.push(newWeapon);
    }
    this.setState(newState, () => this.handleSubmit());
  }

  handleRemoveItem(itemId, itemType) {
    return e => {
      e.stopPropagation();
      e.preventDefault();
      const newState = merge({}, this.state);
      newState.saved = false;
      newState.character[itemType] = newState.character[itemType].filter(
        item => item._id !== itemId
      );
      this.setState(newState, () => this.handleSubmit());
    };
  }

  handleSubmit(e) {
    if (e) e.preventDefault();
    if (this.state.character.name)
      this.props.submitCharacter(this.state.character).then(({ character }) => {
        this.setState({ saved: true });
        this.props.addNotification({
          title: "Saved!",
          message: "Your character has saved successfully",
          type: "success"
        });
        if (!this.state.character._id) {
          this.props.history.push(`/characters/${character._id}`);
        }
      });
  }

  renderNameLevel() {
    return (
      <div className="row">
        <label>
          <h3>Name </h3>
          <input
            required
            type="text"
            value={this.state.character.name}
            onChange={this.handleChange("name")}
          />
        </label>
        <label>
          <h3>Level </h3>
          <input
            type="number"
            value={this.state.character.level}
            onChange={this.handleChange("level")}
            min="1"
            max="20"
          />
        </label>
      </div>
    );
  }

  renderAppearance() {
    return _PHYSICAL_ATTRIBUTES.map((attr, i) => {
      const camel = camelCase(attr);
      return (
        <label key={i}>
          {attr}:
          <input
            className="small-input"
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
      <label>
        <h3>Alignment</h3>
        <AlignmentMenu
          alignments={_ALIGNMENTS}
          handleChange={this.handleChange("alignment")}
          selectedAlignment={selectedAlignment}
        />
      </label>
    );
  }

  renderDropdownMenu(options, selectedOption, handleChange, field) {
    return (
      <label>
        <h3>{field}</h3>
        <DropdownMenu
          options={options}
          selectedOption={selectedOption}
          handleChange={handleChange}
          field={field}
        />
      </label>
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
          onChange={this.handleChange("currentHealth")}
        />
        /
        <input
          type="number"
          min="0"
          max="999"
          value={this.state.character.maxHealth}
          onChange={this.handleChange("maxHealth")}
        />
      </label>,
	  this.renderHitDice(),
	  this.renderDeathSaves()
    ];
  }

  renderHitDice() {
    const charClass = this.props.charClasses[this.state.character.charClass];
    return [
      <label key={2} className="tooltip-container">
        <h3>Hit Die</h3>
        {charClass ? `d${charClass.hitDie}` : ""}
        <Tooltip
          listItems={[{ key: "Source", val: charClass ? charClass.name : "" }]}
        />
      </label>,
      <label key={3}>
        <h3>Hit Dice</h3>
        <input
          className="small-input"
          type="number"
          value={this.state.character.hitDice}
          min="0"
          onChange={this.handleChange("hitDice")}
        />
        <Tooltip listItems={[{ key: "Num", val: "One per level" }]} />
      </label>
    ];
  }

  renderDeathSaves() {
    return (
      <div key={4} className="death-saves">
        <h3>Death Saves</h3>
        <label className="death-save-inputs">
		👍
          <label>
            0
            <input
              name="successfulDeathSaves"
              type="radio"
              value="0"
              checked={this.state.character.successfulDeathSaves == 0}
              onChange={this.handleChange("successfulDeathSaves")}
            />
          </label>
          <label>
            1
            <input
              name="successfulDeathSaves"
              type="radio"
              value="1"
              checked={this.state.character.successfulDeathSaves == 1}
              onChange={this.handleChange("successfulDeathSaves")}
            />
          </label>
          <label>
            2
            <input
              name="successfulDeathSaves"
              type="radio"
              value="2"
              checked={this.state.character.successfulDeathSaves == 2}
              onChange={this.handleChange("successfulDeathSaves")}
            />
          </label>
          <label>
            3
            <input
              name="successfulDeathSaves"
              type="radio"
              value="3"
              checked={this.state.character.successfulDeathSaves == 3}
              onChange={this.handleChange("successfulDeathSaves")}
            />
          </label>
        </label>
        <label className="death-save-inputs">
		👎
		<label>
            0
            <input
              name="failedDeathSaves"
              type="radio"
              value="0"
              checked={this.state.character.failedDeathSaves == 0}
              onChange={this.handleChange("failedDeathSaves")}
            />
          </label>
          <label>
            1
            <input
              name="failedDeathSaves"
              type="radio"
              value="1"
              checked={this.state.character.failedDeathSaves == 1}
              onChange={this.handleChange("failedDeathSaves")}
            />
          </label>
          <label>
            2
            <input
              name="failedDeathSaves"
              type="radio"
              value="2"
              checked={this.state.character.failedDeathSaves == 2}
              onChange={this.handleChange("failedDeathSaves")}
            />
          </label>
          <label>
            3
            <input
              name="failedDeathSaves"
              type="radio"
              value="3"
              checked={this.state.character.failedDeathSaves == 3}
              onChange={this.handleChange("failedDeathSaves")}
            />
          </label>
        </label>
      </div>
    );
  }

  renderCalculatedFields() {
    return [
      "Proficiency Bonus",
      "Initiative",
      "Passive Wisdom",
      "Armor Class",
      "Speed"
    ].map((field, i) => (
      <label key={i}>
        <h3>{field} </h3>
        {this.state.character[camelCase(field)] >= 0 ? " +" : "   "}
        {this.state.character[camelCase(field)]}
      </label>
    ));
  }

  renderAbilityScores() {
    const inputs = _ABILITIES.map((ability, i) => {
      const camel = camelCase(ability);
      const modString =
        this.state.character[`${camelCase(ability)}Modifier`] >= 0
          ? "( +"
          : "(  ";
      return (
        <li key={i} className="justified">
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
      const camelThrow = camelCase(ability) + "SavingThrow";
      const camelProf = camelCase(ability) + "SaveProficiency";
      return (
        <li key={i}>
          <label className="tooltip-container">
            <input
              type="checkbox"
              onChange={this.handleChange(camelProf)}
              checked={this.state.character[camelProf].is}
              value={camelProf}
            />
            {ability}
            {this.state.character[camelThrow] >= 0 ? " +" : "   "}
            {this.state.character[camelThrow]}
            <Tooltip
              listItems={[
                { key: "Source", val: this.state.character[camelProf].source }
              ]}
            />
          </label>
        </li>
      );
    });
    return <ul>{inputs}</ul>;
  }

  renderSkills() {
    const inputs = Object.keys(_SKILLS).map((skill, i) => {
      const camel = camelCase(skill);
      const camelProf = camelCase(skill) + "Proficiency";
      return (
        <li key={i}>
          <label className="tooltip-container">
            <input
              type="checkbox"
              onChange={this.handleChange(camelProf)}
              checked={this.state.character[camelProf].is}
              value={camelProf}
            />
            {skill} ({_SKILLS[skill].slice(0, 3)})
            {this.state.character[camel] >= 0 ? " +" : "   "}
            {this.state.character[camel]}
            <Tooltip
              listItems={[
                {
                  key: "Source",
                  val: this.state.character[camelProf].source
                }
              ]}
            />
          </label>
        </li>
      );
    });
    return <ul>{inputs}</ul>;
  }

  renderMoney() {
    return (
      <div>
        <h3>Money</h3>
        <div className="row">
          <label>
            Copper:{" "}
            <input
              type="number"
              min="0"
              value={this.state.character.copper}
              onChange={this.handleChange("copper")}
              className="small-input"
            />
          </label>
          <label>
            Silver:{" "}
            <input
              type="number"
              min="0"
              value={this.state.character.silver}
              onChange={this.handleChange("silver")}
              className="small-input"
            />
          </label>
          <label>
            Gold:{" "}
            <input
              type="number"
              min="0"
              value={this.state.character.gold}
              onChange={this.handleChange("gold")}
              className="small-input"
            />
          </label>
          <label>
            Platinum:{" "}
            <input
              type="number"
              min="0"
              value={this.state.character.platinum}
              onChange={this.handleChange("platinum")}
              className="small-input"
            />
          </label>
        </div>
      </div>
    );
  }

  renderBackstory() {
    return (
      <div className="backstory">
        <h3>Backstory</h3>
        <textarea
          onChange={this.handleChange("backstory")}
          value={this.state.character.backstory}
        />
      </div>
    );
  }

  renderProficiencies() {
    return _PROFICIENCY_TYPES.map((type, i) => {
      const camel = camelCase(type);
      const proficiencies = this.state.character[`${camel}Proficiencies`];
      const proficienciesOfType = proficiencies.map((proficiency, j) => {
        return proficiency.editing ? (
          <ProficiencyForm
            key={j}
            type={camel}
            item={proficiency}
            handleProficiencySubmit={this.handleProficiencySubmit.bind(this)}
          />
        ) : (
          <Proficiency
            key={j}
            type={camel}
            item={proficiency}
            handleRemoveItem={this.handleRemoveItem.bind(this)}
            handleEditProficiency={this.handleEditProficiency.bind(this)}
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
        <EquipmentForm
          key={i}
          item={equipment}
          handleEquipmentSubmit={this.handleEquipmentSubmit.bind(this)}
        />
      ) : (
        <Equipment
          key={i}
          item={equipment}
          type="equipment"
          handleRemoveItem={this.handleRemoveItem.bind(this)}
          handleEditEquipment={this.handleEditEquipment.bind(this)}
        />
      );
    });
  }

  renderWeapons() {
    return this.state.character.weapons.map((weapon, i) => {
      return weapon.editing ? (
        <WeaponForm
          key={i}
          item={weapon}
          handleWeaponSubmit={this.handleWeaponSubmit.bind(this)}
        />
      ) : (
        <Weapon
          key={i}
          item={weapon}
          type="weapons"
          character={this.state.character}
          handleRemoveItem={this.handleRemoveItem.bind(this)}
          handleEditWeapon={this.handleEditWeapon.bind(this)}
        />
      );
    });
  }

  renderBonuses() {
    const sortedBonuses = merge([], this.state.character.bonuses).sort(
      sortByParams(1, "level", "source")
    );
    return sortedBonuses.map((bonus, i) => {
      return bonus.editing ? (
        <BonusForm
          key={i}
          bonus={bonus}
          handleBonusSubmit={this.handleBonusSubmit.bind(this)}
        />
      ) : (
        <Bonus
          key={i}
          bonus={bonus}
          type="bonuses"
          handleRemoveItem={this.handleRemoveItem.bind(this)}
          handleEditBonus={this.handleEditBonus.bind(this)}
        />
      );
    });
  }

  renderAddBonusButton(category, label) {
    return (
      <button
        className="add-button"
        disabled={!this.state.character[category]}
        onClick={e => {
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
    const symbol = section.includes("Form") ? ["⬏", "⬎"] : ["▼", "▲"];
    return (
      <button
        className="hide-button"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          this.props.toggleSection(section);
        }}
      >
        {this.props.uiState[section] ? symbol[0] : symbol[1]}
      </button>
    );
  }

  render() {
    return (
      <main className="character-sheet">
        <form
          className="character-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <div className="mar-20">
            <input
              disabled={this.state.saved}
              className="add-button"
              type="submit"
              value="💾 Save Character"
            />
          </div>
          <div className="basics-and-scores row">
            <div className="col-50">
              {this.renderNameLevel()}
              <div className="row blocks">
                <div className="race">
                  {this.renderDropdownMenu(
                    this.props.races,
                    this.state.character.race ? this.state.character.race : "",
                    this.handleChange("race"),
                    "Race"
                  )}
                  {this.renderAddBonusButton("race", "Race")}
                </div>
                <div className="class">
                  {this.renderDropdownMenu(
                    this.props.charClasses,
                    this.state.character.charClass
                      ? this.state.character.charClass
                      : "",
                    this.handleChange("charClass"),
                    "Class"
                  )}
                  {this.renderAddBonusButton("charClass", "Class")}
                </div>
                <div className="background">
                  {this.renderDropdownMenu(
                    this.props.backgrounds,
                    this.state.character.background
                      ? this.state.character.background
                      : "",
                    this.handleChange("background"),
                    "Background"
                  )}
                  {this.renderAddBonusButton("background", "Background")}
                </div>
                <div className="alignment">
                  {this.renderAlignments(this.state.character.alignment)}
                </div>
              </div>
              <div className="row blocks">
                {this.renderHealth()}
                <div className="armor">
                  {this.renderDropdownMenu(
                    this.props.armors,
                    this.state.character.armor
                      ? this.state.character.armor
                      : "",
                    this.handleChange("armor"),
                    "Armor"
                  )}
                </div>
                <div>
                  <label>
                    <h3>Shield</h3>
                    <input
                      type="checkbox"
                      value={this.state.character.shielded}
                      onChange={this.handleChange("shielded")}
                    />
                  </label>
                </div>
              </div>
              {this.renderMoney()}
              <div>
                <h3>Appearance{this.renderToggleButton("appearance")}</h3>
                <div className="row">
                  {this.props.uiState.appearance
                    ? this.renderAppearance()
                    : null}
                </div>
              </div>
              {this.renderBackstory()}
            </div>
            <div className="col-50">
              <div className="col">
                <div className="row blocks">
                  {this.renderCalculatedFields()}
                </div>
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
              <h4>Add Weapon {this.renderToggleButton("weaponForm")}</h4>
              {this.props.uiState.weaponForm ? (
                <WeaponForm
                  handleWeaponSubmit={this.handleWeaponSubmit.bind(this)}
                  item={{
                    name: "",
                    description: "",
                    bonusAmount: 0,
                    modifier: "strength",
                    damageRoll: 8,
                    proficiency: false,
                    damageDice: 1
                  }}
                />
              ) : null}
            </div>
          </div>
          <div className="proficiency-section col-60">
            <h3>Proficiencies {this.renderToggleButton("proficiencies")}</h3>
            <div className="row blocks">
              {this.props.uiState.proficiencies
                ? this.renderProficiencies()
                : null}
            </div>
            {this.props.uiState.proficiencies ? (
              <div className="col">
                <h4>
                  Add Proficiency {this.renderToggleButton("proficiencyForm")}
                </h4>
                {this.props.uiState.proficiencyForm ? (
                  <ProficiencyForm
                    handleProficiencySubmit={this.handleProficiencySubmit.bind(
                      this
                    )}
                    item={{ name: "", type: "", level: 1 }}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div className="bonus-section">
          <h3>
            Traits, Bonuses, Feats, etc. {this.renderToggleButton("bonuses")}
          </h3>
          <div className="col blocks">
            {this.props.uiState.bonuses ? this.renderBonuses() : null}
          </div>
          {this.props.uiState.bonuses ? (
            <div className="col">
              <h4>Add Bonus {this.renderToggleButton("bonusForm")}</h4>
              {this.props.uiState.bonusForm ? (
                <BonusForm
                  handleBonusSubmit={this.handleBonusSubmit.bind(this)}
                  bonus={{
                    name: "",
                    description: "",
                    source: "",
                    level: 1,
                    field: "",
                    bonusAmount: 0
                  }}
                />
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="equipment-section">
          <h3>Equipment {this.renderToggleButton("equipment")}</h3>
          <div className="col">
            {this.props.uiState.equipment ? this.renderEquipment() : null}
          </div>
          {this.props.uiState.equipment ? (
            <div className="col">
              <h4>Add Equipment {this.renderToggleButton("equipmentForm")}</h4>
              {this.props.uiState.equipmentForm ? (
                <EquipmentForm
                  handleEquipmentSubmit={this.handleEquipmentSubmit.bind(this)}
                  item={{ name: "", description: "", weight: 0, source: "" }}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </main>
    );
  }
}

export default CharacterSheet;

// TODO:
// inventory
// weapons
// character image
// refresh shouldn't redirect - because fetching user happens after component mount. try moving this to app load
// add campaign (character can belong to campaign)
// list more than name in character list
// add uniqueness validation
// add hit dice (number of dice, not die type)
// sort bonuses by level
