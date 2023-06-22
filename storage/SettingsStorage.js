import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem("settings");
    return value !== null ? JSON.parse(settings) : null;
  } catch (error) {
    console.error("Failed to retrieve settings:", error);
    return null;
  }
};

export const setSetting = async (setting, value) => {
  try {
    const settings = await AsyncStorage.getSettings();
    const updatedSettings = { ...settings, setting: value };
    await AsyncStorage.setItem("settings", JSON.stringify(updatedSettings));
    console.log(`Setting ${setting} updated successfully`);
  } catch (error) {
    console.error(`Failed to save setting ${setting}:`, error);
  }
};
