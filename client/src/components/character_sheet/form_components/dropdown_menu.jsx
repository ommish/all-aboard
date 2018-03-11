import React from 'react';
import { sortByParams } from '../../../util/sorters';

const DropdownMenu = ({ options, handleChange, selectedOption, field }) => {
	const optionTags = Object.values(options).sort(sortByParams(1, 'name')).map(
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
			<option value="">---</option>
			{optionTags}
		</select>
	);
};

export default DropdownMenu;
