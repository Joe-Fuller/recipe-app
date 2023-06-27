import { StyleSheet } from "react-native";
import colours from "./colours";

const recipesScreenStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colours[settings.theme].background,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    input: {
      fontSize: settings.textSize,
      borderWidth: 1,
      borderColor: colours[settings.theme].subtext,
      borderRadius: 5,
      padding: 10,
      marginRight: 0,
      color: colours[settings.theme].text,
    },
  });
};

export default recipesScreenStyles;
