import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

const AddRecipeScreen = () => {
  const navigation = useNavigation();
  const [url, setUrl] = useState("");

  const handleAddRecipe = async () => {
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
    <View>
      <TextInput
        placeholder="Enter Recipe URL"
        value={url}
        onChangeText={setUrl}
      />
      <Button title="Paste" onPress={handlePasteURL}>
        Paste Recipe URL
      </Button>
      <Button title="Add Recipe" onPress={handleAddRecipe} />
    </View>
  );
};

export default AddRecipeScreen;
