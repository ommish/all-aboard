import React from 'react';
import { camelCase } from 'lodash';

class EquipmentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: props.item._id,
			name: props.item.name,
			description: props.item.description,
			weight: props.item.weight,
			source: props.item.source
		};
	}

	handleChange(field) {
		return (e) => {
			this.setState({ [field]: e.target.value });
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.handleEquipmentSubmit(this.state);
		if (!this.props.item._id)
			this.setState({ name: '', weight: 0, source: '', description: '' });
	}

	componentWillReceiveProps(props) {
		this.setState(props.item);
	}

	render() {
		return (
			<form className="equipment-form" onSubmit={this.handleSubmit.bind(this)}>
				<label name="name">
					Name
					<input
						required
						type="text"
						value={this.state.name}
						onChange={this.handleChange('name')}
					/>
				</label>
				<label name="description">
					Description
					<textarea
						type="text"
						value={this.state.description}
						onChange={this.handleChange('description')}
					/>
				</label>
				<label>
					Weight (lb)
					<input
						className="small-input"
						type="number"
						value={this.state.weight}
						min="0"
						max="1000"
						onChange={this.handleChange('weight')}
					/>
				</label>
				<input
					type="submit"
					className="add-button sq-button"
					value={this.props.item._id ? '💾' : '➕'}
				/>
			</form>
		);
	}
}

export default EquipmentForm;
