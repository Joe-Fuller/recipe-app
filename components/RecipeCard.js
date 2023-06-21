import { Image, Text, TouchableOpacity } from "react-native";
import recipeCardStyles from "../styles/recipeCardStyles";
import { useNavigation, useTheme } from "@react-navigation/native";

const RecipeCard = ({ recipe }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const navigateToRecipe = () => {
    navigation.navigate("SingleRecipe", recipe.name);
  };

  return (
    <TouchableOpacity
      style={recipeCardStyles.recipeContainer}
      onPress={() => navigateToRecipe()}
    >
      <Image
        source={{ uri: recipe.imageFilePath }}
        style={recipeCardStyles.recipeImage}
      ></Image>
      <Text
        style={[recipeCardStyles.recipeTitle, { color: theme.colors.text }]}
      >
        {recipe.name}
      </Text>
    </TouchableOpacity>
  );
};

export default RecipeCard;
