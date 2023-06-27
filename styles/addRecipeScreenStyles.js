import { StyleSheet } from "react-native";
import colours from "./colours";

const addRecipeScreenStyles = (settings) => {
  return StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: colours[settings.theme].subtext,
      borderRadius: 5,
      padding: 10,
      marginRight: 0,
      color: colours[settings.theme].text,
    },
    errorInput: {
      borderColor: "red",
      borderWidth: 2,
    },
    pasteButton: {
      backgroundColor: colours[settings.theme].button,
      padding: 10,
      borderRadius: 5,
      height: 50,
      marginLeft: 2,
    },
    pasteButtonText: {
      color: colours[settings.theme].text,
      fontSize: settings.textSize,
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 26,
    },
  });
};

export default addRecipeScreenStyles;
