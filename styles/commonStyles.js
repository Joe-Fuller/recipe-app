import { StyleSheet } from "react-native";
import colours from "./colours";

const getDynamicStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: colours[settings.theme].background,
    },
    title: {
      fontSize: settings.textSize + 10,
      fontWeight: "bold",
      marginBottom: 32,
      color: colours[settings.theme].text,
    },
    button: {
      backgroundColor: colours[settings.theme].button,
      padding: 10,
      borderRadius: 5,
      margin: 10,
      width: "100%",
    },
    removeButton: {
      backgroundColor: colours[settings.theme].button,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginBottom: 16,
      marginLeft: "auto",
      width: "auto",
      alignItems: "center",
    },
    buttonText: {
      color: colours[settings.theme].text,
      fontSize: settings.textSize,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
};

export default getDynamicStyles;
