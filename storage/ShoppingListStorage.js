import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveShoppingList = async (data) => {
  try {
    await AsyncStorage.setItem("shoppingList", JSON.stringify(data));
    console.log(`Data saved successfully with key: ${key}`);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const getShoppingList = async () => {
  try {
    const dataString = await AsyncStorage.getItem("shoppingList");
    if (dataString !== null) {
      const data = JSON.parse(dataString);
      console.log(`Data retrieved successfully with key: ${key}`);
      return data;
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
  return null;
};

export default {
  saveShoppingList,
  getShoppingList,
};
