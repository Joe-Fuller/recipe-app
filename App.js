import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AddRecipeScreen from "./screens/AddRecipeScreen";
import ConfirmRecipeScreen from "./screens/ConfirmRecipeScreen";
import RecipesScreen from "./screens/RecipesScreen";
import SingleRecipeScreen from "./screens/SingleRecipeScreen";
import HomeScreen from "./screens/HomeScreen";
import RecipeSelectionScreen from "./screens/RecipeSelectionScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home Screen" }}
        />
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
        <Stack.Screen
          name="Recipes"
          component={RecipesScreen}
          options={{ title: "Recipes" }}
        />
        <Stack.Screen
          name="SingleRecipe"
          component={SingleRecipeScreen}
          options={{ title: "Recipe" }}
        />
        <Stack.Screen
          name="RecipeSelection"
          component={RecipeSelectionScreen}
          options={{ title: "RecipeSelection" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
