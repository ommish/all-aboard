import React from 'react';

class BackgroundMenu extends React.Component {
	render() {
		const backgroundOptions = Object.values(this.props.backgrounds).map((background, i) => {
			return <option key={i} value={background._id}>{background.name}</option>;
		});
		return (
      <select value={this.props.selectedBackground} onChange={this.props.handleChange}>
        <option value="">Select a Background</option>
        {backgroundOptions}
      </select>
    );
	}
}

export default BackgroundMenu;
