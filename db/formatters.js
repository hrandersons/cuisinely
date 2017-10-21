const rawRecipes = require('./samples.js');
const fs = require('fs');

const calcDifficulty = (recipe) => {
  let timeDiff;
  let instructionsDiff;
  let ingredientsDiff;

  if (recipe.time <= 30) {
    timeDiff = 1;
  } else if (recipe.time <= 60) {
    timeDiff = 2;
  } else {
    timeDiff = 3;
  }

  if (recipe.instructions.length <= 5) {
    instructionsDiff = 1;
  } else if (recipe.instructions.length <= 10) {
    instructionsDiff = 2;
  } else if (recipe.instructions.length <= 15) {
    instructionsDiff = 3;
  } else {
    instructionsDiff = 4;
  }

  if (recipe.ingredients.length <= 5) {
    ingredientsDiff = 1;
  } else if (recipe.ingredients.length <= 10) {
    ingredientsDiff = 2;
  } else {
    ingredientsDiff = 3;
  }

  return timeDiff + instructionsDiff + ingredientsDiff;
};

const formatRaw = (data) => {
  let results = [];
  data.forEach((value) => {
    let recipe = {};
    recipe.name = value.name;
    recipe.ingredients = value.ingredients.map((ingredient) => {
      let formattedIngredient = {};
      formattedIngredient.name = ingredient.name;
      formattedIngredient.quantity = ingredient.quantity;
      return formattedIngredient;
    });
    recipe.instructions = value.steps;
    recipe.time = value.timers.reduce((acc, val) => {
      return acc + val;
    });
    recipe.difficulty = calcDifficulty(recipe);
    recipe.rating = 0;
    recipe.imageUrl = value.imageUrl;
    if (value.originalURL) {
      recipe.source = value.originalURL;
    } else {
      recipe.source = '0';
    }

    results.push(recipe);
  });
  return results;
};

fs.writeFile('recipes.json', JSON.stringify(formatRaw(rawRecipes)), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('file saved');
  }
});
//console.log(JSON.stringify(formatRaw(rawRecipes)));
