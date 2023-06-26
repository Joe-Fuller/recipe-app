import React, { useState, useEffect, useContext } from "react";
import { View, Text, Switch, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getSettings, setSetting } from "../storage/SettingsStorage";
import Slider from "@react-native-community/slider";
import { SettingsContext } from "../contexts/SettingsContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const SettingsScreen = () => {
  const [theme, setTheme] = useState("");
  const [textSize, setTextSize] = useState(16);
  const { settings, updateSetting } = useContext(SettingsContext);
  const [confirmCancelVisible, setConfirmCancelVisible] = useState(false);

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

  const { colors } = useTheme();

  const handleResetDataButton = () => {};

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <View style={styles.settingContainer}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>
          Dark Mode
        </Text>
        <Switch
          value={theme === "dark"}
          onValueChange={handleThemeToggle}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.text}
        />
      </View>
      <View style={[styles.settingContainer, { width: "100%" }]}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>
          Text Size: {textSize}
        </Text>
        <Slider
          value={textSize}
          minimumValue={12}
          maximumValue={24}
          step={2}
          onSlidingComplete={handleTextSizeChange}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
          style={{ flex: 1 }}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setConfirmCancelVisible(true)}
      >
        Reset Data
      </TouchableOpacity>
      <Dialog.Container visible={confirmCancelVisible}>
        <Dialog.Title>Reset All Data?</Dialog.Title>
        <Dialog.Text>Warning: This will delete all your data</Dialog.Text>
        <Dialog.Button
          label="Reset Data"
          onPress={handleResetData}
        ></Dialog.Button>
        <Dialog.Button
          label="Cancel"
          onPress={() => setDialogVisible(false)}
        ></Dialog.Button>
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  settingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default SettingsScreen;
