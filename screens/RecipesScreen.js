import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RecipesScreen = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);

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

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeContainer}
      onPress={() => navigateToRecipe(item.recipe_id)}
    >
      <Image source={{ uri: item.image_link }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.recipe_name}</Text>
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

export default RecipesScreen;
