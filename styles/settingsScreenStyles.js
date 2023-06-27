import { StyleSheet } from "react-native";
import colours from "./colours";

const settingsScreenStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colours[settings.theme].background,
    },
    title: {
      fontSize: settings.textSize + 10,
      fontWeight: "bold",
      marginBottom: 16,
      color: colours[settings.theme].text,
    },
    settingContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    settingLabel: {
      fontSize: settings.textSize,
      marginRight: 8,
      color: colours[settings.theme].text,
    },
    scaryButton: {
      backgroundColor: colours[settings.theme].button,
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
