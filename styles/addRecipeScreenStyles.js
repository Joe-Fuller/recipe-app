import { StyleSheet } from "react-native";

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
      borderColor: settings.theme === "dark" ? "#fff" : "#000",
      borderRadius: 5,
      padding: 10,
      marginRight: 0,
      color: settings.theme === "dark" ? "white" : "black",
    },
    errorInput: {
      borderColor: "red",
      borderWidth: 2,
    },
    pasteButton: {
      backgroundColor: "#f4511e",
      padding: 10,
      borderRadius: 5,
      height: 50,
      marginLeft: 2,
    },
    pasteButtonText: {
      color: settings.theme === "dark" ? "white" : "black",
      fontSize: settings.textSize,
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 26,
    },
  });
};

export default addRecipeScreenStyles;
