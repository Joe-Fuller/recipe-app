import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

const SingleRecipeScreen = ({ route }) => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = route.params;

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = async () => {
    try {
      // Fetch the recipe details from the backend
      const recipeResponse = await axios.get(
        `https://recipe-app.cyclic.app/recipes/${recipeId}`
      );
      const recipe = recipeResponse.data;

      // Fetch the ingredients for the recipe
      const ingredientsResponse = await axios.get(
        `https://recipe-app.cyclic.app/ingredients/${recipeId}`
      );
      const ingredients = ingredientsResponse.data;

      // Fetch the instructions for the recipe
      const instructionsResponse = await axios.get(
        `https://recipe-app.cyclic.app/instructions/${recipeId}`
      );
      const instructions = instructionsResponse.data;

      // Add the ingredients and instructions to the recipe object
      const recipeWithDetails = {
        ...recipe,
        ingredients,
        instructions,
      };

      setRecipe(recipeWithDetails);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.recipe_name}</Text>
      <Text style={styles.subtitle}>Time to Cook: {recipe.time_to_cook}</Text>

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text
          key={index}
        >{`${ingredient.ingredient_amount} ${ingredient.ingredient_units} - ${ingredient.ingredient_name}`}</Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions:</Text>
      {recipe.instructions.map((instruction, index) => (
        <Text key={index}>{`${index + 1}. ${
          instruction.instruction_text
        }`}</Text>
      ))}
    </ScrollView>
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
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
});

export default SingleRecipeScreen;
