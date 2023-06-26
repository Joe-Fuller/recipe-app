import AsyncStorage from "@react-native-async-storage/async-storage";

export const resetData = async () => {
  try {
    await AsyncStorage.clear();
    console.log(`Successfully deleted all data`);
  } catch (error) {
    console.error(`Error deleting all data:`, error);
  }
};

export default {
  resetData,
};
