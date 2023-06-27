import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import scrapeRecipeFromUrl from "../utils/scrapeRecipe";
import getDynamicStyles from "../styles/commonStyles";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { SettingsContext } from "../contexts/SettingsContext";

const AddRecipeScreen = () => {
  const navigation = useNavigation();
  const [url, setUrl] = useState("");
  const [isEmptyUrl, setIsEmptyUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { settings } = useContext(SettingsContext);
  const commonStyles = getDynamicStyles(settings);

  const handleAddRecipe = async () => {
    setIsLoading(true);
    if (!url.trim()) {
      // URL is empty, show error styling
      setIsEmptyUrl(true);
      setIsLoading(false);
      return;
    }
    try {
      const recipe = await scrapeRecipeFromUrl(url);

      if (recipe) {
        // Go to ConfirmRecipeScreen
        navigation.navigate("ConfirmRecipe", { recipe });
      }
    } catch (error) {
      setIsError(true);
      console.error("Failed to add recipe:", error);
    } finally {
      setIsError(false);
      setIsLoading(false);
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

  const handleHideError = () => {
    setIsError(false);
  };

  return (
    <View style={commonStyles.container}>
      {isLoading ? <LoadingSpinner></LoadingSpinner> : null}
      {isError ? (
        <ErrorMessage
          errorText="Please enter a valid url"
          onHide={handleHideError}
        ></ErrorMessage>
      ) : null}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Recipe URL"
          value={url}
          onChangeText={setUrl}
          style={[styles.input, isEmptyUrl && styles.errorInput]}
        />
        <TouchableOpacity style={styles.pasteButton} onPress={handlePasteURL}>
          <Text style={styles.pasteButtonText}>Paste</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={commonStyles.button} onPress={handleAddRecipe}>
        <Text style={commonStyles.buttonText}>Add Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginRight: 0,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 2,
  },
  pasteButton: {
    backgroundColor: "#f4511e",
    padding: 10,
    borderRadius: 5,
    height: 50,
    marginLeft: 2,
  },
  pasteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 26,
  },
});

export default AddRecipeScreen;
