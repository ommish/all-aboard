import React from 'react';

const AlignmentMenu = ({ selectedAlignment, handleChange, alignments }) => {
	return (
		<select
			value={selectedAlignment}
			onChange={handleChange}>
			<option value="">---</option>
			{alignments.map((alignment, i) => (
				<option key={i} value={alignment}>{alignment}</option>
			))}
		</select>
	);
};

export default AlignmentMenu;
