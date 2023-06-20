import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import navBarStyles from "../styles/navBarStyles";

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
    <View style={navBarStyles.container}>
      <TouchableOpacity onPress={navigateToHome} style={navBarStyles.button}>
        <Text style={navBarStyles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToRecipes} style={navBarStyles.button}>
        <Text style={navBarStyles.buttonText}>Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToShoppingList}
        style={navBarStyles.button}
      >
        <Text style={navBarStyles.buttonText}>Shopping List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
