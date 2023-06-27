import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RecipeStorage from "../storage/RecipeStorage";
import getDynamicStyles from "../styles/commonStyles";
import recipesScreenStyles from "../styles/recipesScreenStyles";
import RecipeCard from "../components/RecipeCard";
import { SettingsContext } from "../contexts/SettingsContext";
import { TextInput } from "react-native-gesture-handler";

const RecipesScreen = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const { settings } = useContext(SettingsContext);
  const commonStyles = getDynamicStyles(settings);
  const styles = recipesScreenStyles(settings);
  const [searchTerm, setSearchTerm] = useState("");

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

  const searchRecipes = (searchString) => {
    return recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchString.toLowerCase());
    });
  };

  return (
    <View style={styles.container}>
      <Text style={commonStyles.title}>Recipes:</Text>
      <TextInput
        placeholder="Search"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      ></TextInput>
      <FlatList
        data={searchRecipes(searchTerm)}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.name.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default RecipesScreen;
