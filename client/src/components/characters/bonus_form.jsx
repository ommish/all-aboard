import React from 'react';
import { camelCase } from 'lodash';

class BonusForm extends React.Component {
	constructor({ bonus, handleBonusSubmit, skills }) {
		super(props);
		this.state = {
			name: bonus.name,
			field: bonus.field,
			description: bonus.description,
			bonusAmount: bonus.bonusAmount
		};
	}

	handleChange(field) {
		return (e) => {
			this.setState({ [field]: e.target.value });
		};
	}

	render() {
		return (
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					this.handleBonusSubmit(this.state);
				}}>
				<label>
					Name
					<input
						type="text"
						value={this.state.bonus.name}
						onChange={this.handleChange('name')}
					/>
				</label>
				<label>
					Description
					<textarea
						value={this.state.bonus.description}
						onChange={this.handleChange('description')}
					/>
				</label>
				<label>
					Field
					<select name="field" onChange={this.handleChange('field')}>
						{Object.keys(_SKILLS).map((skill) => {
							return <option value={camelCase(skill)}>{skill}</option>;
						})}
						<option value="armorClass">Armor Class</option>
						<option value="initiative">Initiative</option>
					</select>
					<label>
						Bonus Amount
						<input
							type="number"
							value={this.state.bonus.bonusAmount}
							onChange={this.handleChange('bonusAmount')}
						/>
					</label>
					<input
						type="submit"
						value={this.state.bonus._id ? 'Update' : 'Add'}
					/>
				</label>
			</form>
		);
	}
}

export default BonusForm;
