import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";

const GetRecipesScreen = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("https://recipe-app.cyclic.app/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error retrieving recipes:", error);
    }
  };

  const renderRecipeItem = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>Time to Cook: {item.timeToCook}</Text>
        <Text>Ingredients:</Text>
        <FlatList
          data={item.ingredients}
          renderItem={({ item }) => <Text>- {item}</Text>}
          keyExtractor={(ingredient) => ingredient}
        />
        <Text>Instructions:</Text>
        <FlatList
          data={item.instructions}
          renderItem={({ item, index }) => (
            <Text>{`${index + 1}. ${item}`}</Text>
          )}
          keyExtractor={(instruction, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <View>
      <Text>Recipes:</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(recipe) => recipe.id.toString()}
      />
    </View>
  );
};

export default GetRecipesScreen;
