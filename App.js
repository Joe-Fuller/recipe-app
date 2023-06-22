import "react-native-gesture-handler";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AddRecipeScreen from "./screens/AddRecipeScreen";
import ConfirmRecipeScreen from "./screens/ConfirmRecipeScreen";
import RecipesScreen from "./screens/RecipesScreen";
import SingleRecipeScreen from "./screens/SingleRecipeScreen";
import HomeScreen from "./screens/HomeScreen";
import RecipeSelectionScreen from "./screens/RecipeSelectionScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import NavBar from "./components/NavBar";
import { useColorScheme } from "react-native";
import SettingsScreen from "./screens/SettingsScreen";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TextSizeProvider } from "./contexts/TextSizeContext";

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider>
      <TextSizeProvider>
        <NavigationContainer theme={theme}>
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
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <NavBar />
        </NavigationContainer>
      </TextSizeProvider>
    </ThemeProvider>
  );
}
