import React from 'react';

class ArmorMenu extends React.Component {
	render() {
		const armorOptions = Object.values(this.props.armors).map((armor, i) => {
			return <option key={i} value={armor._id}>{armor.name} ({armor.type})</option>;
		});
		return (
      <select value={this.props.selectedArmor} onChange={this.props.handleChange}>
        <option value="">Select Armor</option>
        {armorOptions}
      </select>
    );
	}
}

export default ArmorMenu;
