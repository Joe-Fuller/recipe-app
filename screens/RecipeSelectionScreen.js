import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Storage from "../storage/Storage";

const RecipeSelectionScreen = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = async () => {
    try {
      const response = await axios.get("https://recipe-app.cyclic.app/recipes");
      const recipeData = response.data;
      setRecipes(recipeData);
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  };

  const navigateToRecipe = (recipeId) => {
    navigation.navigate("SingleRecipe", { recipeId });
  };

  const handleRecipeSelection = (recipeId) => {
    // Toggle recipe selection
    if (selectedRecipes.includes(recipeId)) {
      setSelectedRecipes(
        selectedRecipes.filter((selected) => selected !== recipeId)
      );
    } else {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
  };

  const handleGenerateShoppingList = async () => {
    try {
      const shoppingList = [];

      // Fetch selected recipe details from the server
      for (const recipeId of selectedRecipes) {
        const response = await axios.get(
          `https://recipe-app.cyclic.app/ingredients/${recipeId}`
        );
        const recipeDetails = response.data;

        recipeDetails.forEach((ingredient) => {
          const { ingredient_name, ingredient_amount, ingredient_units } =
            ingredient;
          const existingItem = shoppingList.find(
            (item) => item.ingredient === ingredient_name
          );

          if (existingItem && existingItem.units === ingredient_units) {
            existingItem.amount += ingredient_amount;
          } else {
            shoppingList.push({
              ingredient: ingredient_name,
              amount: ingredient_amount,
              units: ingredient_units,
            });
          }
        });
      }

      await Storage.saveData("shoppingList", shoppingList);

      // Navigate to the ShoppingListScreen and pass the shopping list data as a parameter
      navigation.navigate("ShoppingList");
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeContainer}
      onPress={() => navigateToRecipe(item.recipe_id)}
    >
      <Image source={{ uri: item.image_link }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.recipe_name}</Text>
      <Button
        title={selectedRecipes.includes(item.recipe_id) ? "Selected" : "Select"}
        onPress={() => handleRecipeSelection(item.recipe_id)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes:</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.recipe_id.toString()}
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
