import { StyleSheet, StatusBar } from "react-native";

const confirmRecipeScreenStyles = (settings) => {
  return StyleSheet.create({
    formContainer: {
      width: "100%",
      borderWidth: 1,
      padding: 10,
      marginTop: StatusBar.currentHeight,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      backgroundColor: settings.theme === "dark" ? "black" : "white",
    },
    ingredientContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    input: {
      color: settings.theme === "dark" ? "white" : "black",
    },
    amountInput: {
      width: 50,
      marginRight: 8,
      color: settings.theme === "dark" ? "white" : "black",
    },
    unitsInput: {
      width: 50,
      marginRight: 8,
      color: settings.theme === "dark" ? "white" : "black",
    },
    nameInput: {
      flex: 1,
      marginRight: 8,
      color: settings.theme === "dark" ? "white" : "black",
    },
    instructionsContainer: {
      marginTop: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: settings.theme === "dark" ? "white" : "black",
    },
    instructionItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    instructionIndex: {
      width: 32,
      marginRight: 8,
      textAlign: "right",
      color: settings.theme === "dark" ? "white" : "black",
    },
    instructionText: {
      flex: 1,
      marginRight: 8,
      color: settings.theme === "dark" ? "white" : "black",
    },
    image: {
      flex: 1,
      width: "100%",
      height: 200,
    },
    buttonContainer: {
      marginTop: 16,
      marginBottom: 50,
    },
  });
};

export default confirmRecipeScreenStyles;
