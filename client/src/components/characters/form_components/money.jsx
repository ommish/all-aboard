import React from 'react';

const Money = ({ platinum, gold, silver, copper, handleChange }) => {
	return (
		<ul>
			<li>
				Copper: <input type="number" min="0" value={copper} onChange={handleChange('copper')} />
			</li>
			<li>
				Silver: <input type="number" min="0" value={silver} onChange={handleChange('silver')} />
			</li>
			<li>
				Gold: <input type="number" min="0" value={gold} onChange={handleChange('gold')} />
			</li>
			<li>
				Platinum: <input type="number" min="0" value={platinum} onChange={handleChange('platinum')} />
			</li>
		</ul>
	);
};

export default Money;
