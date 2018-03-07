export const roll = (type, num, forEachMod, overallMod) => {
  const rolls = [];
  for (let i = 0; i < num; i++) {
    rolls.push(Math.ceil(Math.random() * type) + forEachMod);
  }
  return { rolls, sum: rolls.reduce((acc, el) => acc += el) + overallMod };
}
