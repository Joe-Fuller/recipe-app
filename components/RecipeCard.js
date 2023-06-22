import { Image, Text, TouchableOpacity } from "react-native";
import recipeCardStyles from "../styles/recipeCardStyles";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

const RecipeCard = ({ recipe }) => {
  const navigation = useNavigation();
  const { settings } = useContext(SettingsContext);
  const styles = recipeCardStyles(settings);

  const navigateToRecipe = () => {
    navigation.navigate("SingleRecipe", recipe.name);
  };

  return (
    <TouchableOpacity
      style={styles.recipeContainer}
      onPress={() => navigateToRecipe()}
    >
      <Image
        source={{ uri: recipe.imageFilePath }}
        style={styles.recipeImage}
      ></Image>
      <Text style={styles.recipeTitle}>{recipe.name}</Text>
    </TouchableOpacity>
  );
};

export default RecipeCard;
