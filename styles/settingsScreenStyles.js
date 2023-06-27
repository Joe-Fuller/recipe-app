import { StyleSheet, StatusBar } from "react-native";

const settingsScreenStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      marginTop: StatusBar.currentHeight,
      backgroundColor: settings.theme === "dark" ? "black" : "white",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: settings.theme === "dark" ? "white" : "black",
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
    scaryButton: {
      backgroundColor: "#f70000",
      padding: 10,
      borderRadius: 5,
      marginBottom: 16,
      marginTop: 100,
      width: "100%",
      borderWidth: 2,
      borderColor: "000000",
    },
  });
};

export default settingsScreenStyles;
