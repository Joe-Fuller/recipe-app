import { Image, Text, TouchableOpacity } from "react-native";
import recipeCardStyles from "../styles/recipeCardStyles";
import { useNavigation } from "@react-navigation/core";

const RecipeCard = ({ recipe }) => {
  console.log(recipe);
  const navigation = useNavigation();

  const navigateToRecipe = () => {
    navigation.navigate("SingleRecipe", recipe.name);
  };

  return (
    <TouchableOpacity
      style={recipeCardStyles.recipeContainer}
      onPress={() => navigateToRecipe()}
    >
      <Image
        source={{ uri: recipe.imageLink }}
        style={recipeCardStyles.recipeImage}
      ></Image>
      <Text style={recipeCardStyles.recipeTitle}>{recipe.name}</Text>
    </TouchableOpacity>
  );
};

export default RecipeCard;
