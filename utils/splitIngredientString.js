import ingredientDatabase from "../constants/ingredients";
import { unitCorrelation } from "../constants/units";

function splitIngredientString(ingredientString) {
  ingredientString = ingredientString.trim("");
  ingredientString = ingredientString.toLowerCase();

  // Replace some annoying special fraction characters
  ingredientString = ingredientString.replace(/½/g, "1/2");
  ingredientString = ingredientString.replace(/¼/g, "1/4");

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
  while (parts[split].match(/\d/)) {
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
      const match = RegExp(ingredient).exec(name);
      if (match) {
        matches.push([match.index, match[0]]);
      }
    }
  }

  // If there are any ingredient matches, find the longest one
  // This avoids e.g. corn instead of corn starch
  // UPDATE: Finds the earliest ingredient match, if there are multiple selects the longest
  if (matches.length > 0) {
    console.log("Matching: ", name);

    // Special Case: Jam
    if (matches.includes("jam")) {
      console.log("matched with: jam (special case)");
      name = "jam";
      return { amount, units, name };
    }

    let minIndex = 999;
    matches.forEach(([index, ingredient]) => {
      if (index < minIndex) {
        minIndex = index;
        name = ingredient;
      } else if (index === minIndex && ingredient.length > name.length) {
        name = ingredient;
      }
    });

    console.log("matched with: ", name);
  } else {
    console.log("No match found for: ", name);
  }

  return { amount, units, name };
}

module.exports = splitIngredientString;
