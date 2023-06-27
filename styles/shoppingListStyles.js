import { StyleSheet, StatusBar } from "react-native";

const shoppingListScreenStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      marginTop: StatusBar.currentHeight,
      backgroundColor: settings.theme === "dark" ? "black" : "white",
    },
    title: {
      fontSize: settings.textSize + 10,
      fontWeight: "bold",
      marginBottom: 16,
      color: settings.theme === "dark" ? "white" : "black",
    },
    scrollContainer: {
      flex: 1,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    checkboxContainer: {
      marginLeft: 16,
    },
    itemDetailsContainer: {
      flex: 1,
      marginRight: 16,
    },
    itemIngredient: {
      fontSize: settings.textSize,
      fontWeight: "bold",
      color: settings.theme === "dark" ? "white" : "black",
    },
    itemAmount: {
      fontSize: settings.textSize - 2,
      color: settings.theme === "dark" ? "#A9A9A9" : "#808080",
    },
  });
};

export default shoppingListScreenStyles;