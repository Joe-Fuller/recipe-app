import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

const AddRecipeScreen = () => {
  const navigation = useNavigation();
  const [url, setUrl] = useState("");
  const [isError, setIsError] = useState(false);

  const handleAddRecipe = async () => {
    if (!url.trim()) {
      // URL is empty, show error styling
      setIsError(true);
      return;
    }
    try {
      const response = await axios.post(
        "https://recipe-app.cyclic.app/recipes",
        {
          url,
        }
      );

      if (response.status === 201) {
        // Recipe added successfully
        // You can provide feedback to the user, such as displaying a success message
        console.log("Recipe added successfully!");
        // Reset the input field
        setUrl("");

        const recipeId = response.data.id;
        const recipe = response.data.recipe;

        // Go to ConfirmRecipeScreen
        navigation.navigate("ConfirmRecipe", { recipeId, recipe });
      }
    } catch (error) {
      console.log(error);
      // Error occurred while adding the recipe
      // You can handle the error and provide appropriate feedback to the user
      console.error("Failed to add recipe:", error);
    }
  };

  const handlePasteURL = async () => {
    try {
      // Read the text from the clipboard
      const clipboardText = await Clipboard.getStringAsync();
      // Set the clipboard content into the recipeURL state
      setUrl(clipboardText);
    } catch (error) {
      console.error("Failed to read clipboard: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Recipe URL"
          value={url}
          onChangeText={setUrl}
          style={[styles.input, isError && styles.errorInput]}
        />
        <TouchableOpacity style={styles.pasteButton} onPress={handlePasteURL}>
          <Text style={styles.pasteButtonText}>Paste</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddRecipe}>
        <Text style={styles.buttonText}>Add Recipe</Text>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    marginRight: 0, // Remove the marginRight
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 2,
  },
  pasteButton: {
    backgroundColor: "#f4511e",
    padding: 10,
    borderRadius: 5,
    height: 50, // Set the desired height
    marginLeft: 2, // Add marginLeft to create no gap
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
  pasteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 26, // Set the lineHeight to match the button height
  },
});

export default AddRecipeScreen;
