import React from 'react';

const ClassMenu = ({ charClasses, handleChange, selectedCharClass }) => {
	const charClassOptions = Object.values(charClasses).map(
		(charClass, i) => {
			return (
				<option key={i} value={charClass._id}>
					{charClass.name}
				</option>
			);
		}
	);
	return (
		<select
			value={selectedCharClass}
			onChange={handleChange}>
			<option value="">Select Class</option>
			{charClassOptions}
		</select>
	);
};

export default ClassMenu;
