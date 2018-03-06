import React from 'react';
import Tooltip from '../../helpers/tooltip';
import ProficiencyForm from './proficiency_form';

const Proficiencies = ({
	type,
	items,
	handleRemoveItem,
	handleProficiencySubmit
}) => {
	const lis = items.map((item, i) => {
		return (
			<li key={i} className="tooltip-container row">
				<ProficiencyForm
					type={type}
					item={item}
					handleProficiencySubmit={handleProficiencySubmit}
				/>
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
			</li>
		);
	});
	return <ul>{lis}</ul>;
};

export default Proficiencies;
