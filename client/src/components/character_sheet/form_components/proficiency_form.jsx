import React from 'react';
import { camelCase } from 'lodash';
import { _PROFICIENCY_TYPES } from '../character_variables';

class ProficiencyForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: props.item._id,
			type: props.item.type || props.type || '',
			name: props.item.name,
			level: props.item.level,
			source: props.item.source || ''
		};
	}

	handleChange(field) {
		return (e) => {
			this.setState({ [field]: e.target.value });
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.handleSubmitItem(this.state, `${this.state.type}Proficiencies`);
		if (!this.props.item._id) this.setState({ type: '', name: '', level: 1 });
	}

	componentWillReceiveProps(props) {
		this.setState(props.item);
	}

	render() {
		return (
			<form
				className="proficiency-form"
				onSubmit={this.handleSubmit.bind(this)}>
				{this.state._id ? null : (
					<label>
						Type
						<select
							name="type"
							required
							value={this.state.type}
							onChange={this.handleChange('type')}>
							<option disabled value="">
								---
							</option>
							{_PROFICIENCY_TYPES.map((skill, i) => {
								return (
									<option key={i} value={camelCase(skill)}>
										{skill}
									</option>
								);
							})}
						</select>
					</label>
				)}
				<label name="name">
					{this.state._id ? null : 'Name'}
					<input
						required
						type="text"
						value={this.state.name}
						onChange={this.handleChange('name')}
					/>
				</label>
				{this.state._id ? null : (
					<label>
						Level
						<input
							required
							type="number"
							value={this.state.level}
							className="small-input"
							min="1"
							max="20"
							onChange={this.handleChange('level')}
						/>
					</label>
				)}
				<input
					type="submit"
					className="add-button sq-button"
					value={this.props.item._id ? '💾' : '➕'}
				/>
			</form>
		);
	}
}

export default ProficiencyForm;
