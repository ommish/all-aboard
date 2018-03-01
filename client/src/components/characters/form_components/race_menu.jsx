import React from 'react';

class RaceMenu extends React.Component {
	render() {
		const raceOptions = Object.values(this.props.races).map((race, i) => {
			return <option key={i} value={race._id}>{race.name}</option>;
		});
		return (
      <select value={this.props.selectedRace} onChange={this.props.handleChange}>
        <option value=""></option>
        {raceOptions}
      </select>
    );
	}
}

export default RaceMenu;
