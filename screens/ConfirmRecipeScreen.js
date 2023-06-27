import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RecipeStorage from "../storage/RecipeStorage";
import getDynamicStyles from "../styles/commonStyles";
import confirmRecipeScreenStyles from "../styles/confirmRecipeScreenStyles";
import { SettingsContext } from "../contexts/SettingsContext";
import { unitCorrelation } from "../constants/units";

const ConfirmRecipeScreen = (props) => {
  const navigation = useNavigation();
  const { settings } = useContext(SettingsContext);
  const commonStyles = getDynamicStyles(settings);
  const styles = confirmRecipeScreenStyles(settings);

  const recipe = props.route.params.recipe;
  const hasOriginalIngredients = props.route.params.hasOriginalIngredients;

  const [recipeName, setRecipeName] = useState(recipe.name);
  const [timeToCook, setTimeToCook] = useState(recipe.timeToCook);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);

  const [viewOriginalIngredients, setViewOriginalIngredients] = useState(false);

  // Helper function to handle adding new ingredient
  const addIngredient = () => {
    const ingredientNo = Object.keys(ingredients).length + 1;
    setIngredients({
      ...ingredients,
      ["Ingredient " + ingredientNo]: { name: "", amount: "", units: "" },
    });
  };

  // Helper function to handle updating ingredient
  const updateIngredient = (ingredientKey, field, value) => {
    const updatedIngredients = { ...ingredients };
    updatedIngredients[ingredientKey][field] = value;
    setIngredients(updatedIngredients);
  };

  // Helper function to handle removing ingredient
  const removeIngredient = (ingredientKey) => {
    const updatedIngredients = { ...ingredients };
    delete updatedIngredients[ingredientKey];
    setIngredients(updatedIngredients);
  };

  // Render ingredient inputs
  const renderIngredients = () => {
    return Object.entries(ingredients).map(
      ([ingredientKey, ingredientValue], index) => (
        <View
          key={index}
          style={[
            styles.ingredientContainer,
            { borderWidth: viewOriginalIngredients ? 1 : 0 },
          ]}
        >
          {viewOriginalIngredients ? (
            <View style={styles.ingredientKeyContainer}>
              <Text style={styles.ingredientKeyText}>{ingredientKey}</Text>
            </View>
          ) : null}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="Amount"
              placeholderTextColor={settings.theme === "dark" ? "#aaa" : "#ccc"}
              value={ingredientValue.amount}
              onChangeText={(text) =>
                updateIngredient(ingredientKey, "amount", text)
              }
              autoCapitalize="none"
            />
            <TextInput
              style={styles.unitsInput}
              placeholder="Units"
              placeholderTextColor={settings.theme === "dark" ? "#aaa" : "#ccc"}
              value={ingredientValue.units}
              onChangeText={(text) =>
                updateIngredient(ingredientKey, "units", text)
              }
              autoCapitalize="none"
            />
            <TextInput
              style={styles.nameInput}
              placeholder="Ingredient Name"
              placeholderTextColor={settings.theme === "dark" ? "#aaa" : "#ccc"}
              value={ingredientValue.name}
              onChangeText={(text) =>
                updateIngredient(ingredientKey, "name", text)
              }
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={commonStyles.removeButton}
              onPress={() => removeIngredient(ingredientKey)}
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

  // Helper function to add up ingredient amounts
  function aggregateIngredientAmounts(ingredients) {
    const aggregatedIngredients = [];
    const ingredientMap = new Map();

    for (const ingredient of ingredients) {
      const key = `${ingredient.name} ${findCorrelatedUnit(ingredient.units)}`;
      const existingIngredient = ingredientMap.get(key);

      if (existingIngredient) {
        existingIngredient.amount = (
          parseFloat(eval(existingIngredient.amount)) +
          parseFloat(eval(ingredient.amount))
        ).toString();
      } else {
        ingredientMap.set(key, {
          ...ingredient,

          amount: ingredient.amount.toString(),
          units: findCorrelatedUnit(ingredient.units),
        });
      }
    }

    for (const [, value] of ingredientMap) {
      aggregatedIngredients.push(value);
    }

    return aggregatedIngredients;
  }

  // Helper function to find the correlated unit for a given unit
  function findCorrelatedUnit(unit) {
    for (const [baseUnit, correlatedUnits] of Object.entries(unitCorrelation)) {
      if (correlatedUnits.includes(unit.toLowerCase())) {
        return baseUnit;
      }
    }
    return unit; // If no correlation is found, return the original unit
  }

  // Update Recipe Logic
  const handleConfirmRecipe = async () => {
    // Aggregate ingredients
    const aggregatedIngredients = aggregateIngredientAmounts(
      Object.values(ingredients)
    );

    await RecipeStorage.saveRecipe(recipeName, {
      timeToCook,
      ingredients: aggregatedIngredients,
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
      {hasOriginalIngredients ? (
        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>View Original Ingredients</Text>
          <Switch
            value={viewOriginalIngredients}
            onValueChange={() => {
              setViewOriginalIngredients(!viewOriginalIngredients);
            }}
          />
        </View>
      ) : null}
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
