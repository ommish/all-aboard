const mongoose = require('mongoose');
const { Schema } = mongoose;
const armorSchema = new Schema({
	name: { type: String, default: '' },
	armorType: { type: String, default: '' },
	stealthDisadvantage: { type: Boolean, default: false },
	weight: { type: Number, default: 0 },
	strengthMin: { type: Number, default: 0 },
	baseAc: { type: Number, default: 11 },
	acMod: { type: String, default: '' },
	acModLimit: { type: Number, default: 0 }
});

const Armor = mongoose.model('Armor', armorSchema);

const armors = [
	{
		name: 'padded',
		armorType: 'light',
		stealthDisadvantage: true,
		weight: 8,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 0
	},
	{
		name: 'leather',
		armorType: 'light',
		stealthDisadvantage: false,
		weight: 10,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 0
	},
	{
		name: 'studded leather',
		armorType: 'light',
		stealthDisadvantage: false,
		weight: 13,
		strengthMin: 0,
		baseAc: 12,
		acMod: 'dexterityModifier',
		acModLimit: 0
	},
	{
		name: 'hide',
		armorType: 'medium',
		stealthDisadvantage: false,
		weight: 12,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 2
	},
	{
		name: 'chain shirt',
		armorType: 'medium',
		stealthDisadvantage: false,
		weight: 20,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 2
	},
	{
		name: 'scale mail',
		armorType: 'medium',
		stealthDisadvantage: true,
		weight: 45,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 2
	},
	{
		name: 'breastplate',
		armorType: 'medium',
		stealthDisadvantage: false,
		weight: 20,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 2
	},
	{
		name: 'half plate',
		armorType: 'medium',
		stealthDisadvantage: true,
		weight: 40,
		strengthMin: 0,
		baseAc: 11,
		acMod: 'dexterityModifier',
		acModLimit: 2
	},
	{
		name: 'ring mail',
		armorType: 'heavy',
		stealthDisadvantage: true,
		weight: 40,
		strengthMin: 0,
		baseAc: 11,
		acMod: '',
		acModLimit: 0
	},
	{
		name: 'chain mail',
		armorType: 'heavy',
		stealthDisadvantage: true,
		weight: 55,
		strengthMin: 13,
		baseAc: 11,
		acMod: '',
		acModLimit: 0
	},
	{
		name: 'splint',
		armorType: 'heavy',
		stealthDisadvantage: true,
		weight: 60,
		strengthMin: 15,
		baseAc: 11,
		acMod: '',
		acModLimit: 0
	},
	{
		name: 'plate',
		armorType: 'heavy',
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

module.exports = { armorSchema };
