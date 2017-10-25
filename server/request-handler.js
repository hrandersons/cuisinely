const Recipe = require('../db/models/recipe.js');
const User = require('../db/models/user.js');
const MealPlan = require('../db/models/mealplan.js');
const recipeHelper = require('../helpers/recipe-helper.js');
const randomizer = require ('../helpers/dbEntryRandomizer.js');
const mongoose = require ('mongoose');

//all requests go here
//export contents to server.js
//TODO: write function that sends some or all of a user's info to client on Login
//TODO: write backend auth functions

exports.getUserInfo = (req, res) => {
  console.log('geting user info');
  const { userId } = req.params;
  console.log(userId);
  User.findOne({ userId: userId })
    .exec((err, found) => {
      if (found) {
        console.log('user found!');
        res.status(200).json(found);
      } else {
        User.create({
          userId: userId,
          bookmarks: [],
          points: 0
        })
          .then((newUser) => {
            console.log('user created!');
            res.status(200).json(newUser);
          });
      }
    });
};

exports.sendRecipes = (req, res) => {
  let query = req.query;
  //we'll use this to find recipes with a high correllation to our search terms
  //but for now we can just send 5 random recipes from the db
  Recipe.find({})
    .limit(10)
    .exec( (err, recipes) => {
      if (err) {
        console.log(err);
        res.status(404).send('An error occurred');
      } else {
        res.status(200).send(recipes);
      }
    });
};

exports.getRecipeDetail = (req, res) => {
  const { recipeId } = req.params;

  Recipe.find({'_id': recipeId}).exec()
    .then((recipe) => {
      res.status(200).send(recipe);
    }).catch((err) =>{
      res.status(500).send('error: ', err);
    });
};

exports.getCalendarRecipes = (req, res) => {
  Recipe.count({}, (err, count) => {
    let skipRecords = randomizer(1, count - 5);
    Recipe.find({})
      .skip(skipRecords)
      .exec((err, result) => {
        if (err) {
          console.log(err);
          res.status(404).send('Failed to find recipes');
        } else {
          res.status(200).send(result);
        }
      });
  });
};

exports.newRecipe = (req, res) => {
  //function to calculate recipe difficulty? Or should we let users select their own?
  let difficulty = recipeHelper.calcDifficulty(req.body);

  let newRecipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    equipment: req.body.equipment,
    description: req.body.description,
    time: req.body.time,
    instructions: req.body.instructions,
    //hard-coded for now
    difficulty: difficulty,
    //also hard-coded for now
    rating: 0,
    //Allow users to upload pictures with the recipe;
    //upload to hosting service may take a while,
    //so we'll save a placeholder and update the recipe entry with the right url when the upload is done.
    imageUrl: req.body.imageUrl || 'none',
    //save a reference to the original submitter
    source: req.body.userId
  });
  newRecipe.save((err, recipe) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send('Recipe saved!');
    }
  });
  //invoke next(); to move onto async image processing function
  //TODO: write image processing & imageUrl update function
};

exports.sendBookmarkedRecipes = (req, res) => {
  let bookmarks = req.body.bookmarks; //should be an array of recipe IDs
  Recipe.find({
    //selects all documents where the array specified by $in contains the value recorded in the field
    name: { $in: bookmarks }
    //maybe we'll use ID instead of name?
  })
    .exec((err, recipes) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving your recipies');
      } else {
        res.status(200).send(recipes);
      }
    });
};

exports.addToBookmarks = (req, res) => {
  //id of recipe to bookmark
  const { recipeId, userId } = req.body;
  //locate user schema
  User.findOne({ userId: userId })
    .then((user) => {
      if (!user) {
        return res.status(400).send('user not found');
      } else {
        if (user.bookmarks.indexOf(recipeId) === -1) {
          user.bookmarks.push(recipeId);
          user.save();
        } 
      }
    })
    .then(() => { res.status(200).send('bookmarked!'); })
    .catch((err) => {
      console.log(err);
    });
};

exports.saveMealPlan = (req, res) => {
  let plan = {
    userId: req.body.userId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    recipes: req.body.recipes
  };

  MealPlan.findOneAndUpdate({ userId: req.body.userId}, plan, (err, found) => {
    if (found) {
      res.status(200).json(found);
    } else {
      MealPlan.create(plan)
        .then((newPlan) => {
          res.status(201).json(newPlan);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send('Something went wrong!');
        });
    }
  });
};
