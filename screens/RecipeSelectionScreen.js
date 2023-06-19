import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ShoppingListStorage from "../storage/ShoppingListStorage";
import RecipeStorage from "../storage/RecipeStorage";

const RecipeSelectionScreen = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = async () => {
    const recipeData = await RecipeStorage.getAllRecipes();
    setRecipes(recipeData);
  };

  const navigateToRecipe = (recipeName) => {
    navigation.navigate("SingleRecipe", recipeName);
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

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeContainer}
      onPress={() => navigateToRecipe(item.name)}
    >
      <Image source={{ uri: item.imageLink }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.name}</Text>
      <Button
        title={selectedRecipes.includes(item) ? "Selected" : "Select"}
        onPress={() => handleRecipeSelection(item)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes:</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.name.toString()}
        numColumns={2}
      />
      <Button
        title="Generate Shopping List"
        onPress={handleGenerateShoppingList}
        disabled={selectedRecipes.length === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  recipeContainer: {
    flex: 1,
    margin: 8,
    alignItems: "center",
  },
  recipeImage: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RecipeSelectionScreen;
