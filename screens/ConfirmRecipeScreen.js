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
      <View key={index}>
        <TextInput
          placeholder="Ingredient Name"
          value={ingredient.name}
          onChangeText={(text) => updateIngredient(index, "name", text)}
        />
        <TextInput
          placeholder="Amount"
          value={ingredient.amount}
          onChangeText={(text) => updateIngredient(index, "amount", text)}
        />
        <TextInput
          placeholder="Units"
          value={ingredient.units}
          onChangeText={(text) => updateIngredient(index, "units", text)}
        />
        <Button title="Remove" onPress={() => removeIngredient(index)} />
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
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
});

export default ConfirmRecipeScreen;
