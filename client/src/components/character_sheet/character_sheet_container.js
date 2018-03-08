import { connect } from 'react-redux';
import { updateCharacter, createCharacter } from '../../actions/character_actions';
import { toggleCharacterSheetSection, addNotification } from '../../actions/ui_actions';
import CharacterSheet from './character_sheet';

const mapStateToProps = (state, ownProps) => {
  const characterId = ownProps.match.params.characterId;
  const character = characterId ? state.characters[characterId] : {
    name: '',
    _user: '',
    armor: '',
    bonuses: [],
    race: '',
    charClass: '',
    background: '',
    alignment: '',
    playerName: '',
    shielded: false,
    level: 1,
    inspiration: 0,
    maxHealth: 0,
    currentHealth: 0,
    speed: 0,
    armorClass: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    strengthSaveProficiency: { name: 'strengthSaveProficiency', is: false, source: '' },
    dexteritySaveProficiency: { name: 'dexteritySaveProficiency', is: false, source: '' },
    constitutionSaveProficiency: { name: 'constitutionSaveProficiency', is: false, source: '' },
    intelligenceSaveProficiency: { name: 'intelligenceSaveProficiency', is: false, source: '' },
    wisdomSaveProficiency: { name: 'wisdomSaveProficiency', is: false, source: '' },
    charismaSaveProficiency: { name: 'charismaSaveProficiency', is: false, source: '' },
    acrobaticsProficiency: { name: 'acrobaticsProficiency', is: false, source: '' },
    animalHandlingProficiency: { name: 'animalHandlingProficiency', is: false, source: '' },
    arcanaProficiency: { name: 'arcanaProficiency', is: false, source: '' },
    athleticsProficiency: { name: 'athleticsProficiency', is: false, source: '' },
    deceptionProficiency: { name: 'deceptionProficiency', is: false, source: '' },
    historyProficiency: { name: 'historyProficiency', is: false, source: '' },
    insightProficiency: { name: 'insightProficiency', is: false, source: '' },
    intimidationProficiency: { name: 'intimidationProficiency', is: false, source: '' },
    investigationProficiency: { name: 'investigationProficiency', is: false, source: '' },
    medicineProficiency: { name: 'medicineProficiency', is: false, source: '' },
    natureProficiency: { name: 'natureProficiency', is: false, source: '' },
    perceptionProficiency: { name: 'perceptionProficiency', is: false, source: '' },
    performanceProficiency: { name: 'performanceProficiency', is: false, source: '' },
    persuasionProficiency: { name: 'persuasionProficiency', is: false, source: '' },
    religionProficiency: { name: 'religionProficiency', is: false, source: '' },
    sleightOfHandProficiency: { name: 'sleightOfHandProficiency', is: false, source: '' },
    stealthProficiency: { name: 'stealthProficiency', is: false, source: '' },
    survivalProficiency: { name: 'survivalProficiency', is: false, source: '' },
    platinum: 0,
    gold: 0,
    silver: 0,
    copper: 0,
    age: '',
    height: '',
    weight: '',
    eyes: '',
    skin: '',
    hair: '',
    backstory: '',
    languageProficiencies: [],
    armorProficiencies: [],
    weaponProficiencies: [],
    toolProficiencies: [],
    hitDice: 1,
  };
  const editable = character ? character._user ===  state.session.currentUser.id : false;
  return {
    currentUser: state.session.currentUser,
    character,
    editable,
    races: state.races,
    charClasses: state.charClasses,
    backgrounds: state.backgrounds,
    armors: state.armors,
    uiState: state.ui.characterSheet,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const submitCharacter = ownProps.match.params.characterId ? updateCharacter : createCharacter;
  return {
    submitCharacter: (character) => dispatch(submitCharacter(character)),
    toggleSection: (section) => dispatch(toggleCharacterSheetSection(section)),
    addNotification: (notification) => dispatch(addNotification(notification)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSheet);
