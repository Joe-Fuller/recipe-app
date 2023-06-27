import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ShoppingListStorage from "../storage/ShoppingListStorage";
import RecipeStorage from "../storage/RecipeStorage";
import getDynamicStyles from "../styles/commonStyles";
import recipesScreenStyles from "../styles/recipesScreenStyles";
import recipeCardStyles from "../styles/recipeCardStyles";
import RecipeCard from "../components/RecipeCard";
import { SettingsContext } from "../contexts/SettingsContext";

const RecipeSelectionScreen = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const { settings } = useContext(SettingsContext);
  const commonStyles = getDynamicStyles(settings);
  const styles = recipesScreenStyles(settings);

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = async () => {
    const recipeData = await RecipeStorage.getAllRecipes();
    setRecipes(recipeData);
  };

  const handleRecipeSelection = (recipe) => {
    // Toggle recipe selection
    if (selectedRecipes.includes(recipe)) {
      setSelectedRecipes(
        selectedRecipes.filter((selected) => selected.name !== recipe.name)
      );
    } else {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
  };

  const handleGenerateShoppingList = async () => {
    try {
      const shoppingList = [];

      // Fetch selected recipe details from the server
      for (const recipe of selectedRecipes) {
        recipe.ingredients.forEach((ingredient) => {
          const existingItem = shoppingList.find(
            (item) => item.ingredient === ingredient.name
          );

          if (existingItem && existingItem.units === ingredient.units) {
            existingItem.amount =
              parseFloat(existingItem.amount) + parseFloat(ingredient.amount);
          } else {
            shoppingList.push({
              ingredient: ingredient.name,
              amount: ingredient.amount,
              units: ingredient.units,
            });
          }
        });
      }

      await ShoppingListStorage.saveShoppingList(shoppingList);

      // Navigate to the ShoppingListScreen and pass the shopping list data as a parameter
      navigation.navigate("ShoppingList");
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const renderRecipeCard = ({ item }) => {
    return (
      <View style={commonStyles.container}>
        <RecipeCard recipe={item} />
        <TouchableOpacity
          style={[commonStyles.button]}
          onPress={() => handleRecipeSelection(item)}
        >
          <Text style={commonStyles.buttonText}>
            {selectedRecipes.includes(item) ? "Selected" : "Select"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={commonStyles.title}>Recipes:</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.name.toString()}
        numColumns={2}
      />
      <TouchableOpacity
        style={[
          commonStyles.button,
          {
            backgroundColor: selectedRecipes.length === 0 ? "#ccc" : "#f4511e",
          },
        ]}
        onPress={handleGenerateShoppingList}
        disabled={selectedRecipes.length === 0}
      >
        <Text style={commonStyles.buttonText}>Generate Shopping List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecipeSelectionScreen;
