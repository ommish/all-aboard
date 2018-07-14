const mongoose = require('mongoose');
const Background = mongoose.model('Background');

const backgrounds = [
  {
    name: 'Acolyte',
    description:
      'You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.',
    skillProficiencies: [{ name: 'religion', source: 'Acolyte' }, { name: 'insight', source: 'Acolyte' }],
    toolProficiencies: [],
    languageProficiencies: [{ name: 'Choose One', source: 'Acolyte' }, { name: 'Choose One', source: 'Acolyte' }],
    gold: 15,
  },
  {
    name: 'Charlatan',
    description: '',
    skillProficiencies: [{ name: 'deception', source: 'Charlatan' }, { name: 'slightOfHand', source: 'Charlatan' }],
    toolProficiencies: [{ name: 'Disguise Kit', source: 'Charlatan' }, { name: 'Forgery Kit', source: 'Charlatan' }],
    gold: 15,
  },
  {
    name: 'Criminal',
    skillProficiencies: [{ name: 'deception', source: 'Criminal' }, { name: 'stealth', source: 'Criminal' }],
    toolProficiencies: [{ name: 'Gaming Set', source: 'Criminal' }, { name: "Thieve's Tools", source: 'Criminal' }],
    gold: 15,
  },
  {
    name: 'Entertainer',
    skillProficiencies: [{ name: 'acrobatics', source: 'Entertainer' }, { name: 'performance', source: 'Entertainer' }],
    toolProficiencies: [
      { name: 'Disguise Kit', source: 'Entertainer' },
      { name: 'Musical Instrument', source: 'Entertainer' },
    ],
    gold: 15,
  },
  {
    name: 'Folk Hero',
    skillProficiencies: [{ name: 'animalHandling', source: 'Folk Hero' }, { name: 'survival', source: 'Folk Hero' }],
    toolProficiencies: [
      { name: "Artisan's Tools", source: 'Folk Hero' },
      { name: 'Land Vehicles', source: 'Folk Hero' },
    ],
    gold: 10,
  },
  {
    name: 'Guild Artisan',
    skillProficiencies: [{ name: 'insight', source: 'Guild Artisan' }, { name: 'persuasion', source: 'Guild Artisan' }],
    toolProficiencies: [{ name: "Artisan's Tools", source: 'Guild Artisan' }],
    languageProficiencies: [{ name: 'Choose One', source: 'Guild Artisan' }],
    gold: 15,
  },
  {
    name: 'Hermit',
    skillProficiencies: [{ name: 'medicine', source: 'Hermit' }, { name: 'religion', source: 'Hermit' }],
    toolProficiencies: [{ name: 'Herbalism Kit', source: 'Hermit' }],
    languageProficiencies: [{ name: 'Choose One', source: 'Hermit' }],
    gold: 5,
  },
  {
    name: 'Noble',
    skillProficiencies: [{ name: 'history', source: 'Noble' }, { name: 'persuasion', source: 'Noble' }],
    toolProficiencies: [{ name: 'Gaming Set', source: 'Noble' }],
    languageProficiencies: [{ name: 'Choose One', source: 'Noble' }],
    gold: 25,
  },
  {
    name: 'Outlander',
    skillProficiencies: [{ name: 'athletics', source: 'Outlander' }, { name: 'survival', source: 'Outlander' }],
    toolProficiencies: [{ name: 'Musical Instrument', source: 'Outlander' }],
    languageProficiencies: [{ name: 'Choose One', source: 'Outlander' }],
    bonuses: [
      {
        name: 'Wanderer',
        description:
          'You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. In addition, you can find food and fresh water for yourself and up to five other people each day, provided that the land offers berries, small game, water, and so forth.',
        level: 1,
        field: '',
        bonusAmount: 0,
        source: 'Outlander',
      },
    ],
    gold: 10,
  },
  {
    name: 'Sage',
    skillProficiencies: [{ name: 'arcana', source: 'Sage' }, { name: 'history', source: 'Sage' }],
    languageProficiencies: [{ name: 'Choose One', source: 'Sage' }, { name: 'Choose One', source: 'Sage' }],
    gold: 10,
  },
  {
    name: 'Sailor',
    skillProficiencies: [{ name: 'athletics', source: 'Sailor' }, { name: 'perception', source: 'Sailor' }],
    toolProficiencies: [{ name: "Navigator's Tools", source: 'Sailor' }, { name: 'Water Vehicles', source: 'Sailor' }],
    gold: 10,
  },
  {
    name: 'Soldier',
    skillProficiencies: [{ name: 'athletics', source: 'Soldier' }, { name: 'intimidation', source: 'Soldier' }],
    toolProficiencies: [{ name: 'Gaming Set', source: 'Soldier' }, { name: 'Land Vehicles', source: 'Soldier' }],
    gold: 10,
  },
  {
    name: 'Urchin',
    skillProficiencies: [{ name: 'sleightOfHand', source: 'Urchin' }, { name: 'stealth', source: 'Urchin' }],
    toolProficiencies: [{ name: 'Disguise Kit', source: 'Urchin' }, { name: "Thieve's Tools", source: 'Urchin' }],
    gold: 10,
  },
];

const seedBackground = async () => {
  await Background.remove();
  backgrounds.forEach(async (background) => {
    await new Background(background).save();
  });
};
seedBackground();
