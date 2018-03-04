import { camelCase } from 'lodash';

import {
	_ABILITIES,
	_SKILLS,
	_ALIGNMENTS,
	_EDITABLE_FIELDS,
	_CALCULATED_FIELDS
} from './character_variables';

export const modifiers = ({ newState }) => {
	_ABILITIES.forEach((ability) => {
		const field = camelCase(ability);
		const modifier = Math.floor((newState.character[field] - 10) / 2);
		newState.character[`${field}Modifier`] = modifier;
	});
};

export const proficiencyBonus = ({ newState }) => {
	newState.character.proficiencyBonus =
		Math.ceil(newState.character.level / 4) + 1;
};

export const savingThrows = ({ newState }) => {
	_ABILITIES.forEach((ability) => {
		const field = camelCase(ability);
		const proficiencyBonus = newState.character[`${field}SaveProficiency`].is
			? newState.character.proficiencyBonus
			: 0;
		newState.character[`${field}SavingThrow`] =
			newState.character[`${field}Modifier`] + proficiencyBonus;
	});
};

export const skills = ({ newState }) => {
	Object.keys(_SKILLS).forEach((skill) => {
		const field = camelCase(skill);
		const connectedAbility = camelCase(_SKILLS[skill]);
		const proficiencyBonus = newState.character[`${field}Proficiency`].is
			? newState.character.proficiencyBonus
			: 0;
		newState.character[field] =
			newState.character[`${connectedAbility}Modifier`] + proficiencyBonus;
	});
};

export const initiative = ({ newState }) => {
	newState.character.initiative = newState.character.dexterityModifier;
};

export const passiveWisdom = ({ newState }) => {
	newState.character.passiveWisdom = 10 + newState.character.perception;
};

export const armorClass = ({ newState, charClasses, armors }) => {
	let modifier;
	if (newState.character.armor) {
		const armor = armors[newState.character.armor];
		newState.character.armorClass = armor.baseAc;
		modifier = armor.acMod ? newState.character[armor.acMod] : 0;
		if (armor.acModLimit > 0 && modifier > armor.acModLimit) modifier = armor.acModLimit;
	} else {
		newState.character.armorClass = 10;
		modifier = newState.character.dexterityModifier;
		const charClass = charClasses[newState.character.charClass] || {name: ''};
		if (charClass.name === 'Barbarian') {
			modifier += newState.character.constitutionModifier;
		} else if (charClass.name === 'Monk') {
			modifier += newState.character.wisdomModifier;
		} else if (charClass.name === 'Sorcerer') {
			newState.character.armorClass = 13;
		}
	}
	modifier += newState.character.shielded ? 2 : 0;
	newState.character.armorClass += modifier;
};

export const speed = ({ newState, races }) => {
	if (newState.character.race) {
		const race = races[newState.character.race];
		newState.character.speed = race.speed;
	} else {
		newState.character.speed = 0;
	}
};

export const bonuses = ({ newState }) => {
	newState.character.bonuses.forEach((bonus) => {
		if (bonus.field && newState.character.level >= bonus.level) {
			newState.character[bonus.field] += bonus.bonusAmount;
		}
	});
};
