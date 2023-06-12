import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";

const ConfirmRecipeScreen = (props) => {
  const recipe = props.route.params.recipe;
  const [recipeName, setRecipeName] = useState(recipe.name);
  const [timeToCook, setTimeToCook] = useState(recipe.timeToCook);
  const [ingredients, setIngredients] = useState(recipe.ingredients);

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
          title="Remove"
          onPress={() => removeIngredient(index)}
          style={styles.removeButton}
        />
      </View>
    ));
  };

  return (
    <View contentContainerStyle={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Text>Recipe Name:</Text>
        <TextInput
          value={recipeName}
          onChangeText={(text) => setRecipeName(text)}
          style={styles.input}
        />

        <Text>Time to Cook:</Text>
        <TextInput
          value={timeToCook}
          onChangeText={(text) => setTimeToCook(text)}
          style={styles.input}
        />

        <Text>Ingredients:</Text>
        {renderIngredients()}
        <Button title="Add Ingredient" onPress={addIngredient} />

        <Text>Instructions:</Text>
        {/* Render instructions component or input field */}

        <Button
          title="Save Recipe"
          onPress={() => {
            /* Save recipe logic */
          }}
        />
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
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  amountInput: {
    width: 80,
    marginRight: 8,
  },
  unitsInput: {
    width: 80,
    marginRight: 8,
  },
  nameInput: {
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    marginLeft: "auto",
  },
});

export default ConfirmRecipeScreen;
