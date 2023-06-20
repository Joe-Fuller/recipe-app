import { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Dialog from "react-native-dialog";

const ErrorMessage = ({ errorText, onHide }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handlePressOkay = () => {
    setIsVisible(false);
    onHide(); // Call the onHide callback function to hide the error message
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={isVisible}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Description>{errorText}</Dialog.Description>
        <Dialog.Button label="Okay" onPress={handlePressOkay} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
});

export default ErrorMessage;
