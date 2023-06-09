import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import axios from "axios";

const AddRecipeScreen = () => {
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
      }
    } catch (error) {
      console.log(error);
      // Error occurred while adding the recipe
      // You can handle the error and provide appropriate feedback to the user
      console.error("Failed to add recipe:", error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Recipe URL"
        value={url}
        onChangeText={setUrl}
      />
      <Button title="Add Recipe" onPress={handleAddRecipe} />
    </View>
  );
};

export default AddRecipeScreen;
