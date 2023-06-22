import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import commonStyles from "../styles/commonStyles";
import { SettingsContext } from "../contexts/SettingsContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { settings } = useContext(SettingsContext);
  console.log(settings);

  const handleAllRecipes = () => {
    navigation.navigate("Recipes");
  };

  const handleAddRecipe = () => {
    navigation.navigate("AddRecipe");
  };

  const handleMakeAShoppingList = () => {
    navigation.navigate("RecipeSelection");
  };

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={commonStyles.container}>
      <Text
        style={[
          commonStyles.title,
          { color: theme.colors.text, fontSize: settings.textSize },
        ]}
      >
        Welcome to Imprecipe!
      </Text>

      <TouchableOpacity style={commonStyles.button} onPress={handleAllRecipes}>
        <Text style={commonStyles.buttonText}>View All Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={commonStyles.button} onPress={handleAddRecipe}>
        <Text style={commonStyles.buttonText}>Add a Recipe</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={commonStyles.button}
        onPress={handleMakeAShoppingList}
      >
        <Text style={commonStyles.buttonText}>Make A Shopping List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={commonStyles.button} onPress={handleSettings}>
        <Text style={commonStyles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
