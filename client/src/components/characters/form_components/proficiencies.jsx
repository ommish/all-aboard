import React from 'react';

const Proficiencies = ({ type, items, handleRemoveItem }) => {
	const lis = items.map((item, i) => {
		return (
			<li key={i}>
				{item.name} (Lvl {item.level}{item.source ? `, Src: ${item.source}` : ""})
				<button onClick={handleRemoveItem(item._id, `${type}Proficiencies`)}>
					Remove
				</button>
			</li>
		);
	});
	return <ul>{lis}</ul>;
};

export default Proficiencies;
