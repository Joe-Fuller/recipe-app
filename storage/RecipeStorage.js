import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveRecipe = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    console.log(`Data saved successfully with key: ${key}`);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const getRecipe = async (key) => {
  try {
    const dataString = await AsyncStorage.getItem(key);
    if (dataString !== null) {
      const data = JSON.parse(dataString);
      console.log(`Data retrieved successfully with key: ${key}`);
      return { name: key, ...data };
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
