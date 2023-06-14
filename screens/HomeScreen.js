import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleAllRecipes = () => {
    navigation.navigate("Recipes");
  };

  const handleAddRecipe = () => {
    navigation.navigate("AddRecipe");
  };

  const handleMakeAShoppingList = () => {
    navigation.navigate("RecipeSelection");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Recipe App</Text>

      <TouchableOpacity style={styles.button} onPress={handleAllRecipes}>
        <Text style={styles.buttonText}>View All Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddRecipe}>
        <Text style={styles.buttonText}>Add a Recipe</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleMakeAShoppingList}>
        <Text style={styles.buttonText}>Make A Shopping List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#f4511e",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
