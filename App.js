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
import ShoppingListScreen from "./screens/ShoppingListScreen";
import NavBar from "./components/NavBar";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddRecipe"
          component={AddRecipeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmRecipe"
          component={ConfirmRecipeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recipes"
          component={RecipesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingleRecipe"
          component={SingleRecipeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeSelection"
          component={RecipeSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShoppingList"
          component={ShoppingListScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <NavBar />
    </NavigationContainer>
  );
}
