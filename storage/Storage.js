import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    console.log(`Data saved successfully with key: ${key}`);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const getData = async (key) => {
  try {
    const dataString = await AsyncStorage.getItem(key);
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
  saveData,
  getData,
};
