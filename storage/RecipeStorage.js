import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveRecipe = async (recipeName, data) => {
  try {
    await AsyncStorage.setItem(recipeName, JSON.stringify(data));
    console.log(`Data saved successfully with key: ${recipeName}`);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const deleteRecipe = async (recipeName) => {
  try {
    await AsyncStorage.removeItem(recipeName);
    console.log(`Successfully deleted recipe ${recipeName}`);
  } catch (error) {
    console.error(`Error deleting recipe: ${recipeName}`);
  }
};

export const getRecipe = async (recipeName) => {
  try {
    const dataString = await AsyncStorage.getItem(recipeName);
    if (dataString !== null) {
      const data = JSON.parse(dataString);
      console.log(`Data retrieved successfully with key: ${recipeName}`);
      return { name: recipeName, ...data };
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
  return null;
};

export const getAllRecipes = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const recipeKeys = allKeys.filter((key) => key !== "shoppingList");
    const recipeData = await AsyncStorage.multiGet(recipeKeys);
    const recipes = recipeData.map(([key, value]) => ({
      name: key,
      ...JSON.parse(value),
    }));
    console.log("All recipes retrieved successfully");
    return recipes;
  } catch (error) {
    console.error("Error retrieving recipes:", error);
  }
  return [];
};

export default {
  saveRecipe,
  getRecipe,
  getAllRecipes,
};
