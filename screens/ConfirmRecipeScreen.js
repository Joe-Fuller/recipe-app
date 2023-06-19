import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RecipeStorage from "../storage/RecipeStorage";

const ConfirmRecipeScreen = (props) => {
  const navigation = useNavigation();

  const recipe = props.route.params.recipe;

  const [recipeName, setRecipeName] = useState(recipe.name);
  const [timeToCook, setTimeToCook] = useState(recipe.timeToCook);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);

  // Helper function to handle adding new ingredient
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", units: "" }]);
  };

  // Helper function to handle updating ingredient
  const updateIngredient = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  // Helper function to handle removing ingredient
  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  // Render ingredient inputs
  const renderIngredients = () => {
    return ingredients.map((ingredient, index) => (
      <View key={index} style={styles.ingredientContainer}>
        <TextInput
          style={styles.amountInput}
          placeholder="Amount"
          value={ingredient.amount}
          onChangeText={(text) => updateIngredient(index, "amount", text)}
        />
        <TextInput
          style={styles.unitsInput}
          placeholder="Units"
          value={ingredient.units}
          onChangeText={(text) => updateIngredient(index, "units", text)}
        />
        <TextInput
          style={styles.nameInput}
          placeholder="Ingredient Name"
          value={ingredient.name}
          onChangeText={(text) => updateIngredient(index, "name", text)}
        />
        <Button
          title="X"
          onPress={() => removeIngredient(index)}
          style={styles.removeButton}
        />
      </View>
    ));
  };

  // Helper function to handle adding new instruction
  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  // Helper function to handle updating instruction
  const updateInstruction = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  // Helper function to handle removing instruction
  const removeInstruction = (index) => {
    const updatedInstructions = [...instructions];
    updatedInstructions.splice(index, 1);
    setInstructions(updatedInstructions);
  };

  // Render instructions inputs
  const renderInstructions = () => {
    return instructions.map((instruction, index) => (
      <View key={index} style={styles.instructionItem}>
        <Text style={styles.instructionIndex}>{index + 1}.</Text>
        <TextInput
          placeholder={`Step ${index + 1}`}
          value={instruction}
          onChangeText={(text) => updateInstruction(index, text)}
          multiline={true}
          style={[styles.instructionText, { maxHeight: 15 * 20 }]} // Adjust the line height here (e.g., 20)
        />
        <Button
          title="X"
          onPress={() => removeInstruction(index)}
          style={styles.removeButton}
        />
      </View>
    ));
  };

  // Update Recipe Logic
  const handleConfirmRecipe = async () => {
    const recipeData = {
      name: recipeName,
      timeToCook: timeToCook,
      ingredients: ingredients,
      instructions: instructions,
    };

    await RecipeStorage.saveRecipe(recipeName, {
      timeToCook,
      ingredients,
      instructions,
      imageLink: recipe.imageLink,
    });

    navigation.navigate("Recipes");
  };

  return (
    <View contentContainerStyle={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Image
          source={{ uri: recipe.imageLink }}
          style={styles.image}
          resizeMode={"contain"}
        />
        <TextInput
          value={recipeName}
          onChangeText={(text) => setRecipeName(text)}
          style={styles.input}
        />

        <TextInput
          value={timeToCook}
          onChangeText={(text) => setTimeToCook(text)}
          style={styles.input}
        />

        <Text>Ingredients:</Text>
        {renderIngredients()}
        <Button title="Add Ingredient" onPress={addIngredient} />

        <View style={styles.instructionsContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {renderInstructions()}
        </View>
        <Button title="Add Instruction" onPress={addInstruction} />

        <View style={styles.buttonContainer}>
          <Button title="Save Recipe" onPress={handleConfirmRecipe} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  amountInput: {
    width: 50,
    marginRight: 8,
  },
  unitsInput: {
    width: 50,
    marginRight: 8,
  },
  nameInput: {
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    marginLeft: "auto",
  },
  instructionsContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  instructionIndex: {
    width: 32,
    marginRight: 8,
    textAlign: "right",
  },
  instructionText: {
    flex: 1,
    marginRight: 8,
  },
  image: {
    flex: 1,
    width: "100%",
    height: 200,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 50,
  },
});

export default ConfirmRecipeScreen;
