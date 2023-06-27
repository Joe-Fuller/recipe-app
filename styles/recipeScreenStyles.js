import { StyleSheet } from "react-native";

const recipeScreenStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: settings.theme === "dark" ? "black" : "white",
    },
    scrollContainer: {
      flex: 1,
    },
    title: {
      fontSize: settings.textSize + 10,
      fontWeight: "bold",
      marginBottom: 16,
      color: settings.theme === "dark" ? "white" : "black",
    },
    subtitle: {
      fontSize: settings.textSize,
      marginBottom: 16,
      color: settings.theme === "dark" ? "white" : "black",
    },
    sectionTitle: {
      fontSize: settings.textSize + 4,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
      color: settings.theme === "dark" ? "white" : "black",
    },
    button: {
      backgroundColor: "#f4511e",
      padding: 10,
      borderRadius: 5,
      marginTop: 16,
      marginBottom: 50,
    },
    buttonText: {
      color: "white",
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
      color: settings.theme === "dark" ? "white" : "black",
    },
  });
};

export default recipeScreenStyles;
