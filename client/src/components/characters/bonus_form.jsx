import React from 'react';
import { camelCase } from 'lodash';

class BonusForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      _id: this.props.bonus._id,
			name: this.props.bonus.name,
			field: this.props.bonus.field || 'acrobatics',
			description: this.props.bonus.description,
			bonusAmount: this.props.bonus.bonusAmount
		};
	}

	handleChange(field) {
		return (e) => {
      const newVal = e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
			this.setState({ [field]: newVal });
		};
	}

	render() {
		return (
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					this.props.handleBonusSubmit(this.state);
				}}>
				<label>
					Name
					<input
						type="text"
						value={this.state.name}
						onChange={this.handleChange('name')}
					/>
				</label>
				<label>
					Description
					<textarea
						value={this.state.description}
						onChange={this.handleChange('description')}
					/>
				</label>
				<label>
					Field
					<select name="field" onChange={this.handleChange('field')}>
						{Object.keys(this.props.skills).map((skill, i) => {
							return <option key={i} value={camelCase(skill)}>{skill}</option>;
						})}
						<option value="armorClass">Armor Class</option>
						<option value="initiative">Initiative</option>
					</select>
					<label>
						Bonus Amount
						<input
							type="number"
							value={this.state.bonusAmount}
							onChange={this.handleChange('bonusAmount')}
						/>
					</label>
					<input
						type="submit"
						value={this.state._id ? 'Update' : 'Add'}
					/>
				</label>
			</form>
		);
	}
}

export default BonusForm;
