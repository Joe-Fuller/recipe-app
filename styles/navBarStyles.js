import { StyleSheet } from "react-native";
import colours from "./colours";

const navBarStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: 60,
      backgroundColor: colours[settings.theme].button,
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    buttonText: {
      fontSize: settings.textSize,
      fontWeight: "bold",
      color: colours[settings.theme].text,
    },
  });
};

export default navBarStyles;
