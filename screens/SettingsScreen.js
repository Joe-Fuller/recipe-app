import React, { useState, useEffect } from "react";
import { View, Text, Switch, Slider } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getSettings, setSetting } from "./SettingsStorage";

const SettingsScreen = () => {
  const [theme, setTheme] = useState("");
  const [textSize, setTextSize] = useState(16);

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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text style={{ color: colors.text, fontSize: textSize }}>Settings</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>Dark Mode</Text>
        <Switch value={theme === "dark"} onValueChange={handleThemeToggle} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>Text Size</Text>
        <Slider
          value={textSize}
          minimumValue={12}
          maximumValue={24}
          step={2}
          onSlidingComplete={handleTextSizeChange}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
