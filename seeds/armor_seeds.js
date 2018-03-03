const mongoose = require('mongoose');

const Armor = mongoose.model('Armor');

const armors = [
	{
		name: 'Padded',
		type: 'light',
		stealthDisadvantage: true,
		weight: 8,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 0
	},
	{
		name: 'Leather',
		type: 'light',
		stealthDisadvantage: false,
		weight: 10,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 0
	},
	{
		name: 'Studded Leather',
		type: 'light',
		stealthDisadvantage: false,
		weight: 13,
		strengthMin: 0,
		baseAc: 12,
		acMod: 'dexterityModifier',
		acModLimit: 0
	},
	{
		name: 'Hide',
		type: 'medium',
		stealthDisadvantage: false,
		weight: 12,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 2
	},
	{
		name: 'Chain Shirt',
		type: 'medium',
		stealthDisadvantage: false,
		weight: 20,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 2
	},
	{
		name: 'Scale Mail',
		type: 'medium',
		stealthDisadvantage: true,
		weight: 45,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 2
	},
	{
		name: 'Breastplate',
		type: 'medium',
		stealthDisadvantage: false,
		weight: 20,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 2
	},
	{
		name: 'Half Plate',
		type: 'medium',
		stealthDisadvantage: true,
		weight: 40,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 2
	},
	{
		name: 'Ring Mail',
		type: 'heavy',
		stealthDisadvantage: true,
		weight: 40,
		strengthMin: 0,
		baseAc: 11,
		acMod: '',
		acModLimit: 0
	},
	{
		name: 'Chain Mail',
		type: 'heavy',
		stealthDisadvantage: true,
		weight: 55,
		strengthMin: 13,
		baseAc: 11,
		acMod: '',
		acModLimit: 0
	},
	{
		name: 'Splint',
		type: 'heavy',
		stealthDisadvantage: true,
		weight: 60,
		strengthMin: 15,
		baseAc: 11,
		acMod: '',
		acModLimit: 0
	},
	{
		name: 'Plate',
		type: 'heavy',
		stealthDisadvantage: true,
		weight: 65,
		strengthMin: 15,
		baseAc: 11,
		acMod: '',
		acModLimit: 0
	}
];

const seedArmor = async () => {
	await Armor.remove();
	armors.forEach(async (armor) => {
		await new Armor(armor).save();
	});
};
seedArmor();
