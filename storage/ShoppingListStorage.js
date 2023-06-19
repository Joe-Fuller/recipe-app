import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveShoppingList = async (data) => {
  try {
    await AsyncStorage.setItem("shoppingList", JSON.stringify(data));
    console.log("Shopping List Data saved successfully");
  } catch (error) {
    console.error("Error saving shopping list data:", error);
  }
};

export const getShoppingList = async () => {
  try {
    const dataString = await AsyncStorage.getItem("shoppingList");
    if (dataString !== null) {
      const data = JSON.parse(dataString);
      console.log("Shopping List Data retrieved successfully");
      return data;
    }
  } catch (error) {
    console.error("Error retrieving shopping list data:", error);
  }
  return null;
};

export default {
  saveShoppingList,
  getShoppingList,
};
