import React, { useState, useEffect, useContext } from "react";
import { View, Text, Switch } from "react-native";
import { getSettings, setSetting } from "../storage/SettingsStorage";
import Slider from "@react-native-community/slider";
import { SettingsContext } from "../contexts/SettingsContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import AllStorage from "../storage/AllStorage";
import Dialog from "react-native-dialog";
import getDynamicStyles from "../styles/commonStyles";
import settingsScreenStyles from "../styles/settingsScreenStyles";

const SettingsScreen = () => {
  const [theme, setTheme] = useState("");
  const [textSize, setTextSize] = useState(16);
  const { settings, updateSetting } = useContext(SettingsContext);
  const [confirmCancelVisible, setConfirmCancelVisible] = useState(false);
  const commonStyles = getDynamicStyles(settings);
  const styles = settingsScreenStyles(settings);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const settings = await getSettings();
    if (settings) {
      setTheme(settings.theme);
      setTextSize(settings.textSize);
    }
  };

  const handleThemeToggle = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    await updateSetting("theme", newTheme);
    setTheme(newTheme);
  };

  const handleTextSizeChange = async (value) => {
    await updateSetting("textSize", value);
    setTextSize(value);
  };

  const handleResetData = async () => {
    try {
      await AllStorage.resetData();
    } catch (error) {
      console.log("Error deleting all data:", error);
    }
    setConfirmCancelVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch value={theme === "dark"} onValueChange={handleThemeToggle} />
      </View>
      <View style={[styles.settingContainer, { width: "100%" }]}>
        <Text style={styles.settingLabel}>Text Size: {textSize}</Text>
        <Slider
          value={textSize}
          minimumValue={12}
          maximumValue={24}
          step={2}
          onSlidingComplete={handleTextSizeChange}
          style={{ flex: 1 }}
        />
      </View>
      <TouchableOpacity
        style={styles.scaryButton}
        onPress={() => setConfirmCancelVisible(true)}
      >
        <Text style={commonStyles.buttonText}>!Reset Data!</Text>
      </TouchableOpacity>
      <Dialog.Container visible={confirmCancelVisible}>
        <Dialog.Title>Reset All Data?</Dialog.Title>
        <Dialog.Description>
          Warning: This will delete all your data
        </Dialog.Description>
        <Dialog.Button
          label="Reset Data"
          onPress={handleResetData}
        ></Dialog.Button>
        <Dialog.Button
          label="Cancel"
          onPress={() => setConfirmCancelVisible(false)}
        ></Dialog.Button>
      </Dialog.Container>
    </View>
  );
};

export default SettingsScreen;
