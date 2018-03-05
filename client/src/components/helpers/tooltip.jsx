import React from 'react';

const Tooltip = ({listItems}) => {
	if (listItems.some((item) => item.val)) {
		return (
			<div className="tooltip">
			<ul>
			{listItems.map((item, i) => (
				<li key={i}>
				<strong>{item.key}: </strong> {item.val}
				</li>
			))}
			</ul>
			</div>
		);
	} else {
		return null;
	}
};

export default Tooltip;
