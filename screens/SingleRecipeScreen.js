import React, { useState, useEffect, useContext } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import sortIngredients from "../utils/sortIngredients";
import RecipeStorage from "../storage/RecipeStorage";
import Dialog from "react-native-dialog";
import { SettingsContext } from "../contexts/SettingsContext";
import recipeScreenStyles from "../styles/recipeScreenStyles";

const SingleRecipeScreen = (props) => {
  const navigation = useNavigation();
  const [recipe, setRecipe] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const recipeName = props.route.params;
  const { settings, version } = useContext(SettingsContext);
  const [currentSettings, setCurrentSettings] = useState(settings);
  const styles = recipeScreenStyles(settings);

  useEffect(() => {
    setCurrentSettings(settings);
  }, [settings, version]);

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
      hasOriginalIngredients: false,
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
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image
          source={{ uri: recipe.imageFilePath }}
          style={styles.image}
          resizeMode={"contain"}
        />
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.subtitle}>{recipe.timeToCook}</Text>

        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {sortIngredients(recipe.ingredients).map((ingredient, index) => (
          <Text
            key={index}
            style={styles.text}
          >{`${ingredient.amount} ${ingredient.units} - ${ingredient.name}`}</Text>
        ))}

        <Text style={styles.sectionTitle}>Instructions:</Text>
        {recipe.instructions.map((instruction, index) => (
          <Text key={index} style={styles.text}>
            {`${index + 1}. ${instruction}`}
          </Text>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleEditRecipe}>
          <Text style={styles.buttonText}>Edit Recipe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setDialogVisible(true)}
        >
          <Text style={styles.buttonText}>Delete Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Delete Recipe?</Dialog.Title>
        <Dialog.Button label="Yes" onPress={handleDeleteRecipe}></Dialog.Button>
        <Dialog.Button
          label="No"
          onPress={() => setDialogVisible(false)}
        ></Dialog.Button>
      </Dialog.Container>
    </View>
  );
};

export default SingleRecipeScreen;
