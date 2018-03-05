import React from 'react';

const DropdownMenu = ({ options, handleChange, selectedOption, field }) => {
	const optionTags = Object.values(options).map(
		(optionItem, i) => {
			return (
				<option key={i} value={optionItem._id}>
					{optionItem.name}
				</option>
			);
		}
	);
	return (
		<select
			value={selectedOption}
			onChange={handleChange}>
			<option value="">Select {field}</option>
			{optionTags}
		</select>
	);
};

export default DropdownMenu;
