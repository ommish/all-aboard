import React from 'react';
import Tooltip from '../../helpers/tooltip';

const Equipment = ({ item, handleRemoveItem, handleEditItem }) => {
	return (
		<div className="tooltip-container row">
			<div>
				{item.name}
				<button
					className="add-button tiny-button"
					onClick={(e) => handleEditItem(item, 'equipment')}>
					✎
				</button>
			</div>
			<Tooltip
				listItems={[
					{ key: 'Description', val: item.description },
					{ key: 'Source', val: item.source },
					{ key: 'Weight', val: item.weight },
				]}
			/>
			<button
				className="remove-button tiny-button"
				onClick={handleRemoveItem(item._id, 'equipment')}>
				✘
			</button>
		</div>
	);
};

export default Equipment;
