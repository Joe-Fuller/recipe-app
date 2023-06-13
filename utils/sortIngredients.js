const sortIngredients = (ingredients) => {
  return ingredients.sort((a, b) => {
    const nameA = a.name || a.ingredient_name;
    const nameB = b.name || b.ingredient_name;
    return nameA.localeCompare(nameB);
  });
};

module.exports = { sortIngredients };
