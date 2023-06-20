import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#f4511e" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingSpinner;
