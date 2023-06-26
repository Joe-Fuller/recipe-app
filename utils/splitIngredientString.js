function splitIngredientString(ingredientString) {
  ingredientString = ingredientString.trim("");
  let name = "";
  let amount = "";
  let units = "";

  // special case: 'a pinch'
  if (ingredientString.split(" ").slice(0, 2).join(" ") === "a pinch") {
    amount = "1";
    units = "pinch";
    name = ingredientString.slice(8, ingredientString.length).trim();
    return { name, amount, units };
  }

  // // each character before the first letter is the amount
  // // the next word is the units
  // // everything remaining is the name

  // const re = /[a-z ,.]/i;

  // // the amount is the bit before the regex match
  // let pos = ingredientString.search(re);
  // amount = ingredientString.slice(0, pos).trim();

  // // split the string with the amount removed into words
  // let remainingWords = ingredientString.slice(pos).trim().split(" ");

  // // the first word is the units
  // units = remainingWords[0].trim();

  // // the remainder is the name
  // name = remainingWords.slice(1).join(" ").trim();

  // return { name, amount, units };

  // Check for units
  for (const [unitKey, unitValues] of Object.entries(unitCorrelation)) {
    const foundUnit = unitValues.find((unit) => ingredient.includes(unit));
    if (foundUnit) {
      units = unitKey;
      ingredient = ingredient.replace(new RegExp(foundUnit, "gi"), "").trim();
      break;
    }
  }

  // Split remaining string into amount and ingredient
  const parts = ingredient.split(/\s+/);
  if (parts.length > 0) {
    const firstPart = parts[0];
    if (!isNaN(firstPart)) {
      amount = firstPart;
      parts.shift();
    }
    ingredientName = parts.join(" ");
  }

  return { amount, unit, ingredient: ingredientName };
}

module.exports = splitIngredientString;
