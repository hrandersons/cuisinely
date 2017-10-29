const Recipe = require('../db/models/recipe.js');
const User = require('../db/models/user.js');
const MealPlan = require('../db/models/mealplan.js');
const recipeHelper = require('../helpers/recipe-helper.js');
const randomizer = require ('../helpers/dbEntryRandomizer.js');
const mongoose = require ('mongoose');
const cloudinary = require('cloudinary');
const cloudinaryKeys = require('./cloudinary_keys');
const request = require('request');
//all requests go here
//export contents to server.js
//TODO: write function that sends some or all of a user's info to client on Login
//TODO: write backend auth functions
cloudinary.config(cloudinaryKeys);

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
let filterResults = function(arr, bool) {
  if (bool) {
    return arr.filter((word) => {
      if (word !== 'Pound' && word !== 'Kilogram' && word !== 'Gram' && word !== 'Handful' && word !== 'Ounce' && word !== 'Dessert spoon' && word !== 'Cubic inch' && word !== 'Tad' && word !== 'Salt spoon') {
        return word;
      }
    });
  } else {
    return arr.filter((word) => {
      if (word !== 'Quart' && word !== 'Gallon' && word !== 'Bottle' && word !== 'Liter' && word !== 'Milliliter' && word !== 'Tad' && word !== 'Pint' && word !== 'Fluid ounce' && word !== 'Dessert spoon' && word !== 'Cubic inch' && word !== 'Tad' && word !== 'Salt spoon') {
        return word;
      }
    });
  }
};

exports.getsourceUnits = (req, res) => {
  console.log('Ingridient --> ', req.body);
  let appid = '6a032b94';
  let appkey = 'af04dee8c1b92b496501c456b635a697';
  let url = 'https://api.edamam.com/api/food-database/parser?ingr=' + req.body.food + '&app_id=' + appid + '&app_key=' + appkey + '&page=0';
  if (req.body.food !== '') {
    request.get(url, (error, response, body) => {
      if (error) {
        console.log('Error --> ', error);
      }
      var result = JSON.parse(body);
      if (result['hints'].length !== 0) {
        var temp = result['hints'][0]['measures'];
        let arr = temp.reduce((acc, el) => {
          acc.push(el.label);
          return acc;
        }, []);
        if (arr.indexOf['Fluid ounce'] !== -1) {
          arr = filterResults(arr, true);
        } else {
          arr = filterResults(arr, false);
        }
        console.log('Response --> ', arr.length);
        res.status(200).send(arr); 
      } else {
        res.status(200).send('No response'); 
      }
    });
  } else {
    res.status(200).send('No input');
  }
};


exports.sendRecipes = (req, res) => {
  let query = req.query;
  //we'll use this to find recipes with a high correllation to our search terms
  //but for now we can just send 5 random recipes from the db
  Recipe.find({})
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
  // function to calculate recipe difficulty? Or should we let users select their own?
  let difficulty = recipeHelper.calcDifficulty(req.body);
  let pic = req.file;
  let image = '';
  cloudinary.v2.uploader.upload(pic.path, {public_id: req.body.name}, function(error, result) {
    if (error) {
      console.log('Error ---> ', error);
    }
    image = result.url;
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
      imageUrl: image || 'none',
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

  });

  //invoke next(); to move onto async image processing function
  //TODO: write image processing & imageUrl update function
};

exports.addBookmark = (req, res) => {
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
        } else {
          res.status(200).send('already bookmarked!');
        }
      }
    })
    .then(() => { res.status(200).send('bookmarked!'); })
    .catch((err) => {
      console.log(err);
    });
};

exports.removeBookmark = (req, res) => {
  //id of recipe to bookmark
  const { recipeId, userId } = req.query;
  // locate user schema
  User.findOne({ userId: userId })
    .then((user) => {
      if (!user) {
        return res.status(400).send('user not found');
      } else {
        const bookmarkIndex = user.bookmarks.indexOf(recipeId);
        if (bookmarkIndex !== -1) {
          user.bookmarks.splice(bookmarkIndex, 1);
          user.save();
        }
      }
    })
    .then(() => { res.status(200).send('removed!'); })
    .catch((err) => {
      console.log(err);
    });
};

exports.checkBookmarks = (req, res) => {
  const { recipeId, userId } = req.query;

  User.findOne({ userId: userId })
    .then((user) => {
      if (!user) {
        return res.status(400).send('user not found');
      } else {
        const exists = !!(user.bookmarks.indexOf(recipeId) !== -1);
        res.status(200).send(exists);
      }

    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.getBookmarks = (req, res) => {
  const { userId } = req.query;

  User.findOne({ userId: userId })
    .then((user) => {
      if (!user) {
        return res.status(400).send('user not found');
      } else {
        return user.bookmarks;
      }
    })
    .then((bookmarks) => {
      let recipes = [];
      bookmarks.forEach((bookmark) => {
        recipes.push(
          Recipe.findById(bookmark)
            .then((recipe) => {
              return recipe;
            })
        );
      });
      return Promise.all(recipes).then(recipes);
    })
    .then((recipes) => {
      res.status(200).send(recipes);
    })
    .catch((err) => {
      res.status(400).send(err);
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

exports.sendMealPlan = (req, res) => {
  const id = req.query.userId;
  MealPlan.findOne({ userId: id})
    .exec((err, plan) => {
      if (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
      } else {
        res.status(200).send(plan);
      }
    });
};

exports.awardPoints = (req, res) => {
  User.findOne({ userId: req.body.userId })
    .exec((err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send('Failed to update points');
      } else {
        user.points += req.body.points;
        user.save();
        res.status(200).send('Points updated!');
      }
    });
};
