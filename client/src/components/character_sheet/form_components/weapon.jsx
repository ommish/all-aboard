import React from 'react';
import Tooltip from '../../helpers/tooltip';

const Bonus = ({ bonus, handleEditBonus, handleRemoveItem }) => {
	return (
		<ul className="col tooltip-container">
      <Tooltip
        listItems={[
          { key: 'Source', val: bonus.source },
          { key: 'Level', val: bonus.level }
        ]}
      />
			<li className="row no-margin">
				<h4>{bonus.name}</h4> (lvl. {bonus.level})
				<div className="row no-margin">
					<button
						onClick={() => handleEditBonus(bonus)}
						className="add-button tiny-button">
						✎
					</button>
					<button
						onClick={handleRemoveItem}
						className="remove-button tiny-button">
						✘
					</button>
				</div>
			</li>
			<li>{bonus.description}</li>
			{bonus.field ? <li><em>+{bonus.bonusAmount} to {bonus.field}</em></li> : null}
		</ul>
	);
};

export default Bonus;
