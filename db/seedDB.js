let recipeData = require('./recipes.json');
let pioneerRecipes = require('./pioneerRecipes.json');
const Recipe = require('./models/recipe.js');
//const seedData = JSON.parse(recipeData);

let seedDB = () => {
  let soFar = 0;
  // recipeData.forEach((recipe) => {
  //   let newRecipe = new Recipe({
  //     name: recipe.name,
  //     ingredients: recipe.ingredients,
  //     time: recipe.time,
  //     servings: recipe.servings,
  //     instructions: recipe.instructions,
  //     difficulty: recipe.difficulty,
  //     rating: recipe.rating,
  //     likes: recipe.likes,
  //     imageUrl: recipe.imageUrl,
  //     source: recipe.source
  //   });
  //
  //   newRecipe.save((err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       soFar ++;
  //       console.log(soFar, 'Recipe saved!');
  //     }
  //   });
  // });

  pioneerRecipes.forEach((recipe) => {
    let newpioneerRecipe = new Recipe({
      name: recipe.name,
      ingredients: recipe.ingredients,
      time: recipe.time,
      servings: recipe.servings,
      instructions: recipe.instructions,
      difficulty: recipe.difficulty,
      rating: recipe.rating,
      likes: recipe.likes,
      imageUrl: recipe.imageUrl,
      source: recipe.source
    });

    newpioneerRecipe.save((err, result) => {
      if (err) {
        console.log(err);
      } else {
        soFar ++;
        console.log(soFar, 'Recipe saved!');
      }
    });
  });
  console.log('Database seeded!');
};

seedDB();
