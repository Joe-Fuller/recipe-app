import { StyleSheet, StatusBar } from "react-native";

const getDynamicStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      marginTop: StatusBar.currentHeight,
    },
    title: {
      fontSize: settings.textSize + 10,
      fontWeight: "bold",
      marginBottom: 32,
    },
    button: {
      backgroundColor: "#f4511e",
      padding: 10,
      borderRadius: 5,
      marginBottom: 16,
      width: "100%",
    },
    removeButton: {
      backgroundColor: "#f4511e",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginBottom: 16,
      marginLeft: "auto",
      width: "auto",
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: settings.textSize,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
};

export default getDynamicStyles;
