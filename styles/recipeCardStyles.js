import { StyleSheet } from "react-native";
import colours from "./colours";

const recipeCardStyles = (settings) => {
  return StyleSheet.create({
    recipeContainer: {
      flex: 1,
      margin: 8,
      alignItems: "center",
    },
    recipeImage: {
      width: "100%",
      height: "auto",
      aspectRatio: 1,
      borderRadius: 8,
      marginBottom: 8,
    },
    recipeTitle: {
      fontSize: settings.textSize + 8,
      fontWeight: "bold",
      textAlign: "center",
      color: colours[settings.theme].subtext,
    },
  });
};

export default recipeCardStyles;
