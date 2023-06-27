import { StyleSheet } from "react-native";

const settingsScreenStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: settings.theme === "dark" ? "#1a1a1a" : "#ffffff",
    },
    title: {
      fontSize: settings.textSize + 10,
      fontWeight: "bold",
      marginBottom: 16,
      color: settings.theme === "dark" ? "#ffffff" : "#000000",
    },
    settingContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    settingLabel: {
      fontSize: settings.textSize,
      marginRight: 8,
      color: settings.theme === "dark" ? "#ffffff" : "#000000",
    },
    scaryButton: {
      backgroundColor: "#ff0000",
      padding: 10,
      borderRadius: 5,
      marginBottom: 16,
      marginTop: 100,
      width: "100%",
      borderWidth: 2,
      borderColor: "#000000",
    },
  });
};

export default settingsScreenStyles;
