import { StyleSheet } from "react-native";

const navBarStyles = (settings) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: 60,
      backgroundColor: "#2c3e50",
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    buttonText: {
      fontSize: settings.textSize,
      fontWeight: "bold",
      color: "#ffffff",
    },
  });
};

export default navBarStyles;
