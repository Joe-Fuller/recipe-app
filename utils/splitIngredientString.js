import ingredientDatabase from "../constants/ingredients";
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

  // special case: "garlic clove(s)"
  if (
    ingredientString.includes("garlic") &&
    ingredientString.includes("clove")
  ) {
    amount = ingredientString.match(/\d+/)[0];
    units = "clove";
    name = "garlic";
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
        .replace(new RegExp(foundUnit, "i"), " ")
        .trim();
      break;
    }
  }

  // Split remaining string into amount and ingredient
  const parts = ingredientString.split(/\s+/);
  let split = 0;
  while (parts[split].match(/[\d½¼]/)) {
    split++;
  }

  amount = parts.slice(0, split).join(" ");
  name = parts.slice(split).join(" ");

  // This removes the 's' that sometimes remains after parsing e.g. cup instead of cups
  name = name.replace(/^s\s/, "");

  // Try and match the name to an already known ingredient in ingredientDatabase
  const matches = [];
  for (const category of Object.values(ingredientDatabase)) {
    for (const ingredient of category) {
      if (name.includes(ingredient)) {
        matches.push(ingredient);
      }
    }
  }

  // If there are any ingredient matches, find the longest one
  // This avoids e.g. corn instead of corn starch
  if (matches.length > 0) {
    console.log("Matching: ", name);
    name = matches.reduce((longest, current) => {
      return current.length > longest.length ? current : longest;
    }, "");
    console.log("matched with: ", name);
  } else {
    console.log("No match found for: ", name);
  }

  return { amount, units, name };
}

module.exports = splitIngredientString;
