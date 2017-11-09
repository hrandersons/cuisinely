const rawRecipes = require('./samples.js');
const fs = require('fs');
const readline = require('readline');
const filename = 'db/recipeDump.json';
var formatted = [];

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

const formatPioneerRecipes = (object) => {
  let recipe = {};
  let splitIngredients = object.ingredients.split('\n');
  let formattedIngredients = [];
  let cookTime;
  let prepTime;
  if (object.cookTime) {
    cookTime = object.cookTime.substring(2);
  } else {
    cookTime = '0M';
  }

  if (object.prepTime) {
    prepTime = object.prepTime.substring(2);
  } else {
    prepTime = '0M';
  }

  if (cookTime[cookTime.length - 1] === 'H') {
    cookTime = Number(cookTime.substring(0, cookTime.length - 1)) * 60;
  } else {
    cookTime = Number(cookTime.substring(0, cookTime.length - 1));
  }
  if (prepTime[prepTime.length - 1] === 'H') {
    prepTime = Number(prepTime.substring(0, prepTime.length - 1)) * 60;
  } else {
    prepTime = Number(prepTime.substring(0, prepTime.length - 1));
  }
  let totalTime = cookTime + prepTime;
  splitIngredients.forEach((ingredient) => {
    let splitIngredient = ingredient.split(' ');
    let formatted = {};
    if (Number(splitIngredient[0]) || splitIngredient[0].split('/').length === 2) {
      if (splitIngredient.length > 2) {
        formatted.quantity = splitIngredient[0] + ' ' + splitIngredient[1];
        formatted.name = splitIngredient.slice(2).join(' ');
      } else {
        formatted.quantity = splitIngredient[0];
        formatted.name = splitIngredient[1];
      }
      formattedIngredients.push(formatted);
    } else {
      formatted.quantity = '';
      formatted.name = splitIngredient.join(' ');
    }
  });

  recipe.name = object.name;
  recipe.time = totalTime;
  recipe.servings = object.recipeYield;
  recipe.ingredients = formattedIngredients;
  recipe.instructions = [`Detailed instructions available here: ${object.url}`];
  recipe.rating = 0;
  recipe.difficulty = calcDifficulty(recipe);
  recipe.likes = 0;
  recipe.imageUrl = 'none';
  recipe.source = object.source;
  return recipe;
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
    recipe.imageUrl = value.imageURL;
    if (value.originalURL) {
      recipe.source = value.originalURL;
    } else {
      recipe.source = '0';
    }

    results.push(recipe);
  });
  return results;
};

readline.createInterface({
  input: fs.createReadStream(filename),
  terminal: false
}).on('line', (line) => {
  line = JSON.parse(line);
  if (line.source === 'thepioneerwoman') {
    formatted.push(formatPioneerRecipes(line));
  }
}).on('close', () => {
  fs.appendFile('db/pioneerRecipes.json', JSON.stringify(formatted), (err) => {
    if (err) {
      console.log (err);
      return;
    }
    console.log('success!');
  });
});
