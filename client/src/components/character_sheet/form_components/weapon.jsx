import React from 'react';
import Tooltip from '../../helpers/tooltip';

const Weapon = ({ type, character, item, handleEditWeapon, handleRemoveItem }) => {
	const attackBonus =
		item.bonusAmount +
		(character[`${item.modifier}Modifier`] || 0) +
		(item.proficiency ? character.proficiencyBonus || 0 : 0);
	const damageBonus =
		item.bonusAmount + (character[`${item.modifier}Modifier`] || 0);
	return (
		<ul className="col tooltip-container">
			<Tooltip
				listItems={[
					{ key: 'Description', val: item.description },
					{ key: 'Modifier', val: item.modifier },
					{ key: 'Proficient', val: item.proficiency ? 'True' : 'False' },
					{ key: 'Extra Attack/Damage', val: item.bonusAmount }
				]}
			/>
			<li className="col no-margin">
				<div className="row no-margin">
					<h4>{item.name}</h4>
					<div className="row no-margin">
						<button
							onClick={() => handleEditWeapon(item)}
							className="add-button tiny-button">
							✎
						</button>
						<button
							onClick={handleRemoveItem(item._id, type)}
							className="remove-button tiny-button">
							✘
						</button>
					</div>
				</div>
				<div>
					<p>{`Attack: +${attackBonus}`}</p>
					<p>{`Damage: ${item.damageDice}d${item.damageRoll} + ${damageBonus}`}</p>
				</div>
			</li>
		</ul>
	);
};

export default Weapon;
