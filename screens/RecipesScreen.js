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
import { useNavigation } from "@react-navigation/native";
import RecipeStorage from "../storage/RecipeStorage";
import commonStyles from "../styles/commonStyles";
import recipeCardStyles from "../styles/recipeCardStyles";
import RecipeCard from "../components/RecipeCard";

const RecipesScreen = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const onFocus = navigation.addListener("focus", () => {
      fetchRecipeData();
    });

    return onFocus;
  }, []);

  const fetchRecipeData = async () => {
    const recipeData = await RecipeStorage.getAllRecipes();
    setRecipes(recipeData);
  };

  const renderRecipeCard = ({ item }) => {
    return <RecipeCard recipe={item} />;
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: StatusBar.currentHeight,
  },
});

export default RecipesScreen;
