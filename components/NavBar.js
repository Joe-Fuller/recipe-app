import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import navBarStyles from "../styles/navBarStyles";
import { SettingsContext } from "../contexts/SettingsContext";

const NavBar = () => {
  const navigation = useNavigation();
  const { settings } = useContext(SettingsContext);
  const styles = navBarStyles(settings);

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

export default NavBar;
