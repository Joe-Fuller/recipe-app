import React, { useState, useEffect, useContext } from "react";
import { View, Text, Switch, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getSettings, setSetting } from "../storage/SettingsStorage";
import Slider from "@react-native-community/slider";
import { SettingsContext } from "../contexts/SettingsContext";

const SettingsScreen = () => {
  const [theme, setTheme] = useState("");
  const [textSize, setTextSize] = useState(16);
  const { settings } = useContext(SettingsContext);

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
    setTheme(newTheme);
    await setSetting("theme", newTheme);
  };

  const handleTextSizeChange = async (value) => {
    setTextSize(value);
    await setSetting("textSize", value);
  };

  const { colors } = useTheme();

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
          Text Size
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
