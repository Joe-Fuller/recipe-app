import { StyleSheet, StatusBar } from "react-native";

const confirmRecipeScreenStyles = (settings) => {
  return StyleSheet.create({
    formContainer: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      padding: 10,
      marginTop: StatusBar.currentHeight,
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
    },
    ingredientContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    amountInput: {
      width: 50,
      marginRight: 8,
    },
    unitsInput: {
      width: 50,
      marginRight: 8,
    },
    nameInput: {
      flex: 1,
      marginRight: 8,
    },

    instructionsContainer: {
      marginTop: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
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
    },
    instructionText: {
      flex: 1,
      marginRight: 8,
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
