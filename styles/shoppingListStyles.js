import { StyleSheet } from "react-native";
import colours from "./colours";

const shoppingListScreenStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colours[settings.theme].background,
    },
    title: {
      fontSize: settings.textSize + 10,
      fontWeight: "bold",
      marginBottom: 16,
      color: colours[settings.theme].text,
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
      color: colours[settings.theme].text,
    },
    itemAmount: {
      fontSize: settings.textSize - 2,
      color: colours[settings.theme].subtext,
    },
  });
};

export default shoppingListScreenStyles;
