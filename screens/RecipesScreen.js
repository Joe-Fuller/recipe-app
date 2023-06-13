import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const RecipesScreen = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipeNames();
  }, []);

  const fetchRecipeNames = async () => {
    try {
      const response = await axios.get("https://recipe-app.cyclic.app/recipes");
      const recipeData = response.data;
      const fetchedRecipes = [];
      recipeData.forEach((recipe) => {
        fetchedRecipes.push(recipe);
      });
      setRecipes([...fetchedRecipes]);
    } catch (error) {
      console.error("Error fetching recipe names:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes:</Text>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <Text>{item.recipe_name}</Text>}
        keyExtractor={(item) => item.recipe_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default RecipesScreen;
