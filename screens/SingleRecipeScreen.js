import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import sortIngredients from "../utils/sortIngredients";
import RecipeStorage from "../storage/RecipeStorage";

const SingleRecipeScreen = (props) => {
  const navigation = useNavigation();
  const [recipe, setRecipe] = useState(null);
  const recipeName = props.route.params;

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = async () => {
    try {
      const recipeData = await RecipeStorage.getRecipe(recipeName);

      setRecipe(recipeData);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const handleEditRecipe = () => {
    navigation.navigate("ConfirmRecipe", {
      recipe,
    });
  };

  const handleDeleteRecipe = async () => {
    try {
      await RecipeStorage.deleteRecipe(recipe.name);
      navigation.navigate("Recipes");
    } catch (error) {
      console.log("Error deleting recipe:", error);
    }
  };

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: recipe.imageLink }}
        style={styles.image}
        resizeMode={"contain"}
      />
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.subtitle}>{recipe.timeToCook}</Text>

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {sortIngredients(recipe.ingredients).map((ingredient, index) => (
        <Text
          key={index}
        >{`${ingredient.amount} ${ingredient.units} - ${ingredient.name}`}</Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions:</Text>
      {recipe.instructions.map((instruction, index) => (
        <Text key={index}>{`${index + 1}. ${instruction}`}</Text>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleEditRecipe}>
        <Text style={styles.buttonText}>Edit Recipe</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDeleteRecipe}>
        <Text style={styles.buttonText}>Delete Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
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
  button: {
    backgroundColor: "#f4511e",
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
    marginBottom: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: 200,
  },
});

export default SingleRecipeScreen;
