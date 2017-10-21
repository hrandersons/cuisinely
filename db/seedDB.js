let recipeData = require('./recipes.json');
const Recipe = require('./models/recipe.js');
//const seedData = JSON.parse(recipeData);

let seedDB = () => {
  recipeData.forEach((recipe) => {
    Recipe.findOne({ name: recipe.name }, (err, entry) => {
      if (err) {
        console.log(err);
      } else if (entry) {
        console.log('Recipe already exists!');
        return;
      } else {
        let newRecipe = new Recipe({
          name: recipe.name,
          ingredients: recipe.ingredients,
          time: recipe.time,
          instructions: recipe.instructions,
          difficulty: recipe.difficulty,
          rating: recipe.rating,
          imageUrl: recipe.imageUrl,
          source: recipe.source
        });
        newRecipe.save((err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Recipe saved!');
          }
        });
      }
    });
  });
  console.log('Database seeded!');
};

seedDB();
