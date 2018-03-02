import React from 'react';

class ClassMenu extends React.Component {
	render() {
		const charClassOptions = Object.values(this.props.charClasses).map((charClass, i) => {
			return <option key={i} value={charClass._id}>{charClass.name}</option>;
		});
		return (
      <select value={this.props.selectedCharClass} onChange={this.props.handleChange}>
        <option value=""></option>
        {charClassOptions}
      </select>
    );
	}
}

export default ClassMenu;
