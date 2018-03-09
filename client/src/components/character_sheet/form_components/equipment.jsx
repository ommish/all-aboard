import React from 'react';
import Tooltip from '../../helpers/tooltip';

const Equipment = ({ type, item, handleRemoveItem, handleEditEquipment }) => {
	return (
		<div className="tooltip-container row">
			<div>
				{item.name}
				<button
					className="add-button tiny-button"
					onClick={(e) => handleEditEquipment(item, type)}>
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
				onClick={handleRemoveItem(item._id, type)}>
				✘
			</button>
		</div>
	);
};

export default Equipment;
