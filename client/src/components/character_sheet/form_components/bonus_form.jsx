import React from 'react';
import { camelCase } from 'lodash';
import { _SKILLS, _SAVES } from '../character_variables';

class BonusForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: this.props.bonus._id,
			name: this.props.bonus.name,
			field: this.props.bonus.field,
			description: this.props.bonus.description,
			bonusAmount: this.props.bonus.bonusAmount,
			level: this.props.bonus.level,
			source: this.props.bonus.source
		};
	}

	componentWillReceiveProps({
		bonus: { _id, name, field, description, bonusAmount, level, source }
	}) {
		this.setState({
			_id,
			name,
			field,
			description,
			bonusAmount,
			level,
			source
		});
	}

	handleChange(field) {
		return (e) => {
			const newVal =
				e.target.type === 'number' ? e.target.valueAsNumber : e.target.value;
			this.setState({ [field]: newVal });
		};
	}

	render() {
		return (
			<form
				className="bonus-form"
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					this.props.handleSubmitItem(this.state, 'bonuses');
				}}>
				<label>
					Name
					<input
						required={true}
						type="text"
						value={this.state.name}
						onChange={this.handleChange('name')}
					/>
				</label>
				<label>
					Description
					<textarea
						rows="1"
						value={this.state.description}
						onChange={this.handleChange('description')}
					/>
				</label>
				<label>
					Level
					<input
						className="small-input"
						min="1"
						max="20"
						type="number"
						value={this.state.level}
						onChange={this.handleChange('level')}
					/>
				</label>
				<label>
					Field
					<select
						value={this.state.field}
						required={Boolean(this.state.bonusAmount)}
						name="field"
						onChange={this.handleChange('field')}>
						<option value="">---</option>
						{Object.keys(_SKILLS).concat(_SAVES).map((skill, i) => {
							return (
								<option key={i} value={camelCase(skill)}>
									{skill}
								</option>
							);
						})}
						<option value="armorClass">Armor Class</option>
						<option value="initiative">Initiative</option>
						<option value="speed">Speed</option>
					</select>
				</label>
				<label>
					Bonus Amount
					<input
						className="small-input"
						type="number"
						value={this.state.bonusAmount}
						onChange={this.handleChange('bonusAmount')}
					/>
				</label>
				<input
					className="add-button sq-button"
					type="submit"
					value={this.state._id ? '💾' : '➕'}
				/>
			</form>
		);
	}
}

export default BonusForm;
