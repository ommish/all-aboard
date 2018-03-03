import React from 'react';
import { camelCase } from 'lodash';
import { _PROFICIENCY_TYPES } from '../character_variables';

class ProficiencyForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: '',
			name: ''
		};
	}

	handleChange(field) {
		return (e) => {
			this.setState({ [field]: e.target.value });
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		e.stopPropagation();
		this.props.handleProficiencySubmit(this.state);
		this.setState({type: '', name: ''});
	}

	render() {
		return (
			<form
				onSubmit={this.handleSubmit.bind(this)}>
        <label>
        Type
        <select
				required
        value={this.state.type}
        onChange={this.handleChange('type')}>
        <option disabled value="">Select Type</option>
        {_PROFICIENCY_TYPES.map((skill, i) => {
          return (
            <option key={i} value={camelCase(skill)}>
            {skill}
            </option>
          );
        })}
        </select>
        </label>
				<label>
					Name
					<input
						required={true}
						type="text"
						value={this.state.name}
						onChange={this.handleChange('name')}
					/>
				</label>
				<input type="submit" value="Add" />
			</form>
		);
	}
}

export default ProficiencyForm;
