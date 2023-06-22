import React, { useContext } from "react";
import { View, Text, Switch, Slider, StyleSheet } from "react-native";
import { ThemeContext, TextSizeContext } from "../contexts";

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { textSize, setTextSize } = useContext(TextSizeContext);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleTextSizeChange = (value) => {
    setTextSize(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dark Mode</Text>
        <Switch value={theme === "dark"} onValueChange={handleThemeToggle} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text Size</Text>
        <Slider
          value={textSize}
          minimumValue={12}
          maximumValue={24}
          step={2}
          onValueChange={handleTextSizeChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginRight: 16,
  },
});

export default SettingsScreen;
