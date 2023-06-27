import { StyleSheet } from "react-native";
import colours from "./colours";

const confirmRecipeScreenStyles = (settings) => {
  return StyleSheet.create({
    formContainer: {
      width: "100%",
      padding: 10,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      backgroundColor: colours[settings.theme].background,
    },
    ingredientContainer: {
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colours[settings.theme].subtext,
      padding: 8,
    },
    ingredientKeyContainer: {
      marginBottom: 4,
    },
    ingredientKeyText: {
      color: colours[settings.theme].text,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      marginRight: 8,
      color: colours[settings.theme].text,
    },
    amountInput: {
      width: 30,
      marginRight: 8,
      color: colours[settings.theme].text,
    },
    unitsInput: {
      width: 40,
      marginRight: 8,
      color: colours[settings.theme].text,
    },
    nameInput: {
      flex: 1,
      marginRight: 8,
      color: colours[settings.theme].text,
    },
    instructionsContainer: {
      marginTop: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: colours[settings.theme].text,
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
      color: colours[settings.theme].text,
    },
    instructionText: {
      flex: 1,
      marginRight: 8,
      color: colours[settings.theme].text,
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
    settingContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    settingLabel: {
      fontSize: settings.textSize,
      marginRight: 8,
      color: colours[settings.theme].text,
    },
  });
};

export default confirmRecipeScreenStyles;
