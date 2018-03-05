import React from 'react';
import { merge } from 'lodash';
import DropdownMenu from '../character_sheet/form_components/dropdown_menu';

class CharacterBuilder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      character: {
        name: "",
        level: 1,
        race: "",
      	charClass: "",
      	background: "",
        bonuses: [],
        strengthSaveProficiency: { name: 'strengthSaveProficiency', is: false },
        dexteritySaveProficiency: { name: 'dexteritySaveProficiency', is: false },
        constitutionSaveProficiency: { name: 'constitutionSaveProficiency', is: false },
        intelligenceSaveProficiency: { name: 'intelligenceSaveProficiency', is: false },
        wisdomSaveProficiency: { name: 'wisdomSaveProficiency', is: false },
        charismaSaveProficiency: { name: 'charismaSaveProficiency', is: false },
        acrobaticsProficiency: { name: 'acrobaticsProficiency', is: false },
        animalHandlingProficiency: { name: 'animalHandlingProficiency', is: false },
        arcanaProficiency: { name: 'arcanaProficiency', is: false },
        athleticsProficiency: { name: 'athleticsProficiency', is: false },
        deceptionProficiency: { name: 'deceptionProficiency', is: false },
        historyProficiency: { name: 'historyProficiency', is: false },
        insightProficiency: { name: 'insightProficiency', is: false },
        intimidationProficiency: { name: 'intimidationProficiency', is: false },
        investigationProficiency: { name: 'investigationProficiency', is: false },
        medicineProficiency: { name: 'medicineProficiency', is: false },
        natureProficiency: { name: 'natureProficiency', is: false },
        perceptionProficiency: { name: 'perceptionProficiency', is: false },
        performanceProficiency: { name: 'performanceProficiency', is: false },
        persuasionProficiency: { name: 'persuasionProficiency', is: false },
        religionProficiency: { name: 'religionProficiency', is: false },
        sleightOfHandProficiency: { name: 'sleightOfHandProficiency', is: false },
        stealthProficiency: { name: 'stealthProficiency', is: false },
        survivalProficiency: { name: 'survivalProficiency', is: false },
      },
      stage: 1
    }
  }

  nextStage() {
    const next = this.state.stage + 1;
    if (next > 4) {

    } else {
      this.setState({stage: next});
    }
  }

  handleChange(field) {
    return (e) => {
      const newState = merge({}, this.state);
      newState.character[field] = e.target.value
      this.setState(newState);
    }
  }

  renderStage1() {
    return (
      <div>
        Name:
        <input onChange={this.handleChange('name')} type="text" value={this.state.character.name} />
        <button onClick={this.nextStage.bind(this)}>Next</button>
      </div>
    );
  }

  renderStage2() {
    return (
      <div>
        Level:
        <input onChange={this.handleChange('level')} type="number" value={this.state.character.level} min="1" max="20"/>
        <button onClick={this.nextStage.bind(this)}>Next</button>
      </div>
    );
  }

  renderStage3() {
    return (
      <div>
      Race:
      <DropdownMenu
      options={this.props.races}
      handleChange={this.handleChange('race')}
      selectedOption={this.state.character.race}
      field={'Race'}/>
      </div>
    )
  }

  renderStage4() {
    const selectedRace = this.props.races[this.state.character.race];
    const options = selectedRace.bonuses;
    
  }


  render() {
    const toRender = this[`renderStage${this.state.stage}`]();
    return (
      <div>{toRender}</div>
    );
  }
}

export default CharacterBuilder;
