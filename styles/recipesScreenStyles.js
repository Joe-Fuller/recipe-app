import { StyleSheet } from "react-native";

const recipesScreenStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: settings.theme === "dark" ? "black" : "white",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    input: {
      fontSize: settings.textSize,
      borderWidth: 1,
      borderColor: settings.theme === "dark" ? "#fff" : "#000",
      borderRadius: 5,
      padding: 10,
      marginRight: 0,
      color: settings.theme === "dark" ? "white" : "black",
    },
  });
};

export default recipesScreenStyles;
