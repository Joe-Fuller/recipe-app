const sortIngredients = (ingredients) => {
  return ingredients.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};

module.exports = { sortIngredients };
