import React from 'react';

class RaceMenu extends React.Component {
	render() {
		const raceOptions = this.props.races.map((race) => {
			return <option value={race._id}>{race.nane}</option>;
		});
		return <select value={this.props.selectedRace}>{raceOptions}</select>;
	}
}

export default RaceMenu;
