import { StyleSheet, StatusBar } from "react-native";

const recipesScreenStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      marginTop: StatusBar.currentHeight,
      backgroundColor: settings.theme === "dark" ? "black" : "white",
    },
  });
};

export default recipesScreenStyles;
