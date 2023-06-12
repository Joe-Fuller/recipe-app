import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GetRecipesScreen from "./screens/GetRecipesScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";
import ConfirmRecipeScreen from "./screens/ConfirmRecipeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddRecipe">
        <Stack.Screen
          name="AddRecipe"
          component={AddRecipeScreen}
          options={{ title: "Add Recipe" }}
        />
        <Stack.Screen
          name="ConfirmRecipe"
          component={ConfirmRecipeScreen}
          options={{ title: "Confirm Recipe" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
