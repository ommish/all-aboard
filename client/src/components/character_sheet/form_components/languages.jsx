import React from 'react';

class Languages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			language: ''
		};
	}

	handleChange(e) {
		this.setState({ language: e.target.value });
	}

	componentWillReceiveProps(newProps) {
		if (newProps.languages !== this.props.languages) {
			this.setState({ language: '' });
		}
	}

	render() {
		const languages = this.props.languages.map((lang, i) => (
			<li key={i}>
				{lang}
				<button onClick={(e) => this.props.handleRemoveLanguage(i)}>
					Remove
				</button>
			</li>
		));
		return (
			<div>
				<ul>{languages}</ul>
				<input
					type="text"
					onChange={this.handleChange.bind(this)}
					value={this.state.language}
				/>
				<button
					onClick={(e) => this.props.handleLanguageSubmit(this.state.language)}>
					Add
				</button>
			</div>
		);
	}
}

export default Languages;
