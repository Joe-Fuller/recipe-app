import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  const navigateToRecipes = () => {
    navigation.navigate("Recipes");
  };

  const navigateToShoppingList = () => {
    navigation.navigate("ShoppingList");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToHome} style={styles.button}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToRecipes} style={styles.button}>
        <Text style={styles.buttonText}>Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToShoppingList} style={styles.button}>
        <Text style={styles.buttonText}>Shopping List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#2c3e50",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default NavBar;
