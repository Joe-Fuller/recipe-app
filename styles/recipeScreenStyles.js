import { StyleSheet } from "react-native";
import colours from "./colours";

const recipeScreenStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colours[settings.theme].background,
    },
    scrollContainer: {
      flex: 1,
    },
    title: {
      fontSize: settings.textSize + 10,
      fontWeight: "bold",
      marginBottom: 16,
      color: colours[settings.theme].text,
    },
    subtitle: {
      fontSize: settings.textSize,
      marginBottom: 16,
      color: colours[settings.theme].text,
    },
    sectionTitle: {
      fontSize: settings.textSize + 4,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
      color: colours[settings.theme].text,
    },
    button: {
      backgroundColor: colours[settings.theme].button,
      padding: 10,
      borderRadius: 5,
      marginTop: 16,
      marginBottom: 50,
    },
    buttonText: {
      color: colours[settings.theme].buttonText,
      fontSize: settings.textSize,
      fontWeight: "bold",
      textAlign: "center",
    },
    image: {
      flex: 1,
      width: "100%",
      height: 200,
    },
    text: {
      fontSize: settings.textSize,
      marginBottom: 10,
      color: colours[settings.theme].text,
    },
  });
};

export default recipeScreenStyles;
