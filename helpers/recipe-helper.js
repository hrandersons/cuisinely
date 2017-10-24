exports.calcDifficulty = (recipe) => {
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
