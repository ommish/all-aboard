import React from 'react';
import Tooltip from '../../helpers/tooltip';

const Proficiency = ({ type, item, handleRemoveItem, handleEditItem }) => {
	return (
		<div className="tooltip-container row">
			<div>
				{item.name}
				<button
					className="add-button tiny-button"
					onClick={(e) => handleEditItem(item, `${type}Proficiencies`)}>
					✎
				</button>
			</div>
			<Tooltip
				listItems={[
					{ key: 'Source', val: item.source },
					{ key: 'Level', val: item.level }
				]}
			/>
			<button
				className="remove-button tiny-button"
				onClick={handleRemoveItem(item._id, `${type}Proficiencies`)}>
				✘
			</button>
		</div>
	);
};

export default Proficiency;
