import React from 'react';
import { camelCase } from 'lodash';
import Tooltip from '../../helpers/tooltip';

class WeaponForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: this.props.item._id,
			name: this.props.item.name,
			description: this.props.item.description,
			damageRoll: this.props.item.damageRoll,
			proficiency: this.props.item.proficiency,
			modifier: this.props.item.modifier,
			bonusAmount: this.props.item.bonusAmount,
			damageDice: this.props.item.damageDice
		};
	}

	componentWillReceiveProps({
		item: {
			_id,
			name,
			damageRoll,
			description,
			modifier,
			proficiency,
			bonusAmount
		}
	}) {
		this.setState({
			_id,
			name,
			damageRoll,
			description,
			modifier,
			proficiency,
			bonusAmount
		});
	}

	handleChange(field) {
		return (e) => {
			let newVal;
			if (e.target.type === 'checkbox') {
				newVal = e.target.checked;
			} else if (e.target.type === 'number') {
				newVal = e.target.valueAsNumber;
			} else {
				newVal = e.target.value;
			}
			this.setState({ [field]: newVal });
		};
	}

	render() {
		return (
			<form
				className="tooltip-container row"
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					this.props.handleSubmitItem(this.state, 'weapons');
				}}>
				<Tooltip listItems={[{ key: 'Source', val: this.state.source }]} />
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
					Proficiency
					<input
						type="checkbox"
						checked={this.state.proficiency}
						onChange={this.handleChange('proficiency')}
					/>
				</label>
				<label>
					Modifier
					<select
						value={this.state.modifier}
						required
						name="modifier"
						onChange={this.handleChange('modifier')}>
						{[
							'Strength',
							'Dexterity',
							'Wisdom',
							'Charisma',
							'Intelligence'
						].map((skill, i) => {
							return (
								<option key={i} value={camelCase(skill)}>
									{skill}
								</option>
							);
						})}
					</select>
				</label>
				<label>
					Damage Dice
					<input
						type="number"
						name="damageDice"
						onChange={this.handleChange('damageDice')}
						value={this.state.damageDice}
						className="small-input"
					/>
				</label>
				<label>
					Damage Die
					<select
						value={this.state.damageRoll}
						required
						name="damageRoll"
						onChange={this.handleChange('damageRoll')}>
						<option value="">---</option>
						{[4, 6, 8, 12, 20].map((die, i) => {
							return (
								<option key={i} value={camelCase(die)}>
									d{die}
								</option>
							);
						})}
					</select>
				</label>
				<label>
					Extra Attack/Damage
					<input
						type="number"
						name="bonusAmount"
						onChange={this.handleChange('bonusAmount')}
						value={this.state.bonusAmount}
						className="small-input"
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

export default WeaponForm;
