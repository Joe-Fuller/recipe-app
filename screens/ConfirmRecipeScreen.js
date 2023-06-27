import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RecipeStorage from "../storage/RecipeStorage";
import getDynamicStyles from "../styles/commonStyles";
import confirmRecipeScreenStyles from "../styles/confirmRecipeScreenStyles";
import { SettingsContext } from "../contexts/SettingsContext";

const ConfirmRecipeScreen = (props) => {
  const navigation = useNavigation();
  const { settings } = useContext(SettingsContext);
  const commonStyles = getDynamicStyles(settings);
  const styles = confirmRecipeScreenStyles(settings);

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
    return Object.entries(ingredients).map(
      ([ingredientKey, ingredientValue], index) => (
        <View key={index} style={styles.ingredientContainer}>
          <View style={styles.ingredientKeyContainer}>
            <Text style={styles.ingredientKeyText}>{ingredientKey}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="Amount"
              placeholderTextColor={settings.theme === "dark" ? "#aaa" : "#ccc"}
              value={ingredientValue.amount}
              onChangeText={(text) => updateIngredient(index, "amount", text)}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.unitsInput}
              placeholder="Units"
              placeholderTextColor={settings.theme === "dark" ? "#aaa" : "#ccc"}
              value={ingredientValue.units}
              onChangeText={(text) => updateIngredient(index, "units", text)}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.nameInput}
              placeholder="Ingredient Name"
              placeholderTextColor={settings.theme === "dark" ? "#aaa" : "#ccc"}
              value={ingredientValue.name}
              onChangeText={(text) => updateIngredient(index, "name", text)}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={commonStyles.removeButton}
              onPress={() => removeIngredient(index)}
            >
              <Text style={commonStyles.buttonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    );
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
          placeholderTextColor={settings.theme === "dark" ? "#aaa" : "#ccc"}
          value={instruction}
          onChangeText={(text) => updateInstruction(index, text)}
          multiline={true}
          style={[styles.instructionText, { maxHeight: 15 * 20 }]}
        />
        <TouchableOpacity
          style={commonStyles.removeButton}
          onPress={() => removeInstruction(index)}
        >
          <Text style={commonStyles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  // Update Recipe Logic
  const handleConfirmRecipe = async () => {
    await RecipeStorage.saveRecipe(recipeName, {
      timeToCook,
      ingredients,
      instructions,
      imageFilePath: recipe.imageFilePath,
    });

    navigation.navigate("Recipes");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Image
          source={{ uri: recipe.imageFilePath }}
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
          placeholder="Enter Cooking Time"
          placeholderTextColor={settings.theme === "dark" ? "#aaa" : "#ccc"}
          style={[
            styles.input,
            timeToCook === "" && { borderColor: "red", borderWidth: 2 },
          ]}
        />

        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {renderIngredients()}
        <TouchableOpacity
          style={commonStyles.button}
          onPress={() => addIngredient()}
        >
          <Text style={commonStyles.buttonText}>Add Ingredient</Text>
        </TouchableOpacity>

        <View style={styles.instructionsContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {renderInstructions()}
        </View>
        <TouchableOpacity
          style={commonStyles.button}
          onPress={() => addInstruction()}
        >
          <Text style={commonStyles.buttonText}>Add Instruction</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={commonStyles.button}
        onPress={handleConfirmRecipe}
      >
        <Text style={commonStyles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmRecipeScreen;
