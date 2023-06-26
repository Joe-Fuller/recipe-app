import { unitCorrelation } from "../constants/units";

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

  // Check for units
  for (const [unitKey, unitValues] of Object.entries(unitCorrelation)) {
    const foundUnit = unitValues.find((unit) =>
      ingredientString.includes(unit)
    );
    if (foundUnit) {
      units = unitKey;
      ingredientString = ingredientString
        .replace(new RegExp(foundUnit, "gi"), "")
        .trim();
      break;
    }
  }

  // Split remaining string into amount and ingredient
  const parts = ingredientString.split(/\s+/);
  const amountMatch = parts[0].match(/^(\d+(\.\d+)?|\d+\/\d+)$/);
  if (amountMatch) {
    amount = amountMatch[0];
    parts.shift();
  }
  name = parts.join(" ");

  return { amount, units, name };
}

module.exports = splitIngredientString;
