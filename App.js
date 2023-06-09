import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AddRecipeScreen from "./screens/AddRecipeScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Recipe App</Text>
      <AddRecipeScreen></AddRecipeScreen>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
