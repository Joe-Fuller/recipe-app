import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GetRecipesScreen from "./screens/GetRecipesScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Recipe App</Text>
      <GetRecipesScreen></GetRecipesScreen>
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
