const cheerio = require("cheerio");
const splitIngredientString = require("./splitIngredientString");
const sortIngredients = require("./sortIngredients");
const he = require("he");
import downloadImage from "./downloadImage";

const combineTime = (prepTime, cookTime) => {
  if (!(prepTime && cookTime)) {
    return "";
  }
  // Regular expression to extract hours and minutes from time strings
  const timeRegex = /PT(\d+H)?(\d+M)?/;

  // Extract hours and minutes from prep time
  const prepTimeMatch = prepTime.match(timeRegex);
  const prepHours = prepTimeMatch[1] ? parseInt(prepTimeMatch[1]) : 0;
  const prepMinutes = prepTimeMatch[2] ? parseInt(prepTimeMatch[2]) : 0;

  // Extract hours and minutes from cook time
  const cookTimeMatch = cookTime.match(timeRegex);
  const cookHours = cookTimeMatch[1] ? parseInt(cookTimeMatch[1]) : 0;
  const cookMinutes = cookTimeMatch[2] ? parseInt(cookTimeMatch[2]) : 0;

  // Calculate total hours and minutes
  const totalHours = prepHours + cookHours;
  const totalMinutes = prepMinutes + cookMinutes;

  // Format the combined time
  let timeString = "";
  if (totalHours > 0) {
    timeString += `${totalHours}H`;
  }
  if (totalMinutes > 0) {
    timeString += ` ${totalMinutes}M`;
  }

  return timeString.trim();
};

// Function to find the script tag with the desired schema
function findScriptWithSchema($) {
  // Find all script tags on the page
  const scriptTags = $("script");

  // Iterate over each script tag
  for (let i = 0; i < scriptTags.length; i++) {
    const scriptContent = $(scriptTags[i]).text();

    // It just looks for recipeInstructions, should be specific enough
    try {
      const schema = JSON.parse(scriptContent);

      // Check if the script has the desired properties
      if (schema && schema.recipeInstructions) {
        return schema;
      } else if (schema && schema["@graph"]) {
        // Some are arranged weirdly
        // This searches them
        const graph = schema["@graph"];

        for (let j = 0; j < graph.length; j++) {
          if (graph[j] && graph[j].recipeInstructions) {
            return graph[j];
          }
        }
      }
    } catch (error) {
      // Ignore if the script content is not valid JSON
    }
  }

  return null;
}

// Function to find the script tag with the desired schema
function tryHarder($) {
  // So far only tested for olivewoodvegan
  console.log("trying harder");
  const recipeData = {
    name: null,
    timeToCook: null,
    recipeIngredient: null,
    recipeInstructions: null,
    image: null,
  };

  // NAME
  const name = $("h1").text();
  recipeData.name = name;

  // INGREDIENTS
  const ingredients = [];
  $('[itemprop="recipeIngredient"]').each((index, element) => {
    const ingredient = $(element).attr("content");
    ingredients.push(ingredient);
  });

  if (ingredients.length === 0) {
    // Get everything that is a list item
    const lists = $("ul, ol");

    lists.each((index, element) => {
      const listItems = $(element).children("li");

      listItems.each((index, listItem) => {
        const text = $(listItem).text();
        ingredients.push(text);
      });
    });
  }

  recipeData.recipeIngredient = ingredients;

  // INSTRUCTIONS
  const instructions = [];
  $('[itemprop="recipeInstruction"]').each((index, element) => {
    const instruction = $(element).attr("content");
    instructions.push(instruction);
  });

  if (instructions.length === 0) {
    const regex = /^\d+\. /;

    $("p, li").each((index, element) => {
      const text = $(element).text().trim();
      if (regex.test(text)) {
        const instruction = text.replace(regex, "");
        instructions.push(instruction);
      }
    });
  }

  recipeData.recipeInstructions = instructions;

  // IMAGE
  let image = "";
  const firstImage = $("img").first();
  if (firstImage.length > 0) {
    image = firstImage.data("src");
  }

  recipeData.image = image;

  return recipeData;
}

async function scrapeRecipeFromUrl(url) {
  try {
    const response = await fetch(url);
    const responseText = await response.text();
    const html = responseText;

    const $ = cheerio.load(html);

    const recipeData = findScriptWithSchema($) || tryHarder($);

    if (!recipeData) {
      console.log("frick no recipe data");
    }

    // Access the recipe data and decode HTML entities
    const recipeName = he.decode(recipeData.name);
    let recipeImageUrl = recipeData.image.url || recipeData.image;
    const recipeIngredients = recipeData.recipeIngredient.map((ingredient) =>
      he.decode(ingredient)
    );
    const recipeInstructions = recipeData.recipeInstructions.map(
      (instruction) =>
        instruction.text ? he.decode(instruction.text) : instruction
    );
    const recipeTime = combineTime(recipeData.prepTime, recipeData.cookTime);

    // Extract ingredients
    const ingredients = {};
    recipeIngredients.forEach((ingredient) => {
      ingredients[ingredient] = splitIngredientString(ingredient);
    });

    // Make sure the image is a string, not an array
    if (Array.isArray(recipeImageUrl)) {
      recipeImageUrl = recipeImageUrl[0];
    }

    const recipeImageFilePath = await downloadImage(recipeImageUrl, recipeName);

    // Create the recipe object
    const recipe = {
      name: recipeName,
      timeToCook: recipeTime,
      ingredients: ingredients,
      instructions: recipeInstructions,
      imageFilePath: recipeImageFilePath,
    };

    return recipe;
  } catch (error) {
    console.error("Error scraping recipe:", error);
    return null;
  }
}

module.exports = scrapeRecipeFromUrl;
