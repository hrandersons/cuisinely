const Recipe = require('../db/models/recipe.js');
const User = require('../db/models/user.js');
const MealPlan = require('../db/models/mealplan.js');
const recipeHelper = require('../helpers/recipe-helper.js');
const randomizer = require ('../helpers/dbEntryRandomizer.js');
const mongoose = require ('mongoose');
const cloudinary = require('cloudinary');
const cloudinaryKeys = (process.env.NODE_ENV === 'production') ? {cloud_name: process.env.CLOUD_NAME, api_key: process.env.API_KEY, api_secret: process.env.API_SECRET } : require('./cloudinary_keys');
const nodemailer = require('nodemailer');
const algoliaKeys = require('./algolia_keys');
const algoliasearch = require('algoliasearch');

var client = algoliasearch(algoliaKeys.application_ID, algoliaKeys.adminAPI_key);
var index = client.initIndex('allrecipes');

//all requests go here
//export contents to server.js
//TODO: write function that sends some or all of a user's info to client on Login
//TODO: write backend auth functions
cloudinary.config(cloudinaryKeys);

let updateUserPoints = (userId, points, pointsGraph, level, weeklyPoints, callback) => {
  User.findOneAndUpdate({ userId: userId }, { '$set': { 'points': points, pointsGraph: pointsGraph, level: level, weeklyPoints: weeklyPoints} }).exec((err, user) => {
    if (err) {
      console.log('Err ---> ', err);
    } else {
      callback(user);
    }
  });
};

exports.getUserInfo = (req, res) => {
  const { userId } = req.params;
  User.findOne({ userId: userId })
    .exec((err, found) => {
      if (found) {
        res.status(200).json(found);
      } else {
        let now = new Date();
        let week2 = new Date(now);
        week2.setDate(week2.getDate() + 7);
        let week3 = new Date(now);
        week3.setDate(week3.getDate() + 14);
        let week4 = new Date(now);
        week4.setDate(week4.getDate() + 21);
        let weekly = { week1: {date: now, points: 0}, week2: {date: week2, points: 0}, week3: {date: week3, points: 0}, week4: {date: week4, points: 0}};
        User.create({
          userId: userId,
          bookmarks: [],
          points: 0,
          level: 1,
          weeklyPoints: weekly
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
  Recipe.find({'algolia': recipeId}).exec()
    .then((recipe) => {
      res.status(200).send(recipe);
    }).catch((err) => {
      res.status(500).send(err);
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
  let difficulty = recipeHelper.calcDifficulty(req.body);
  let pic = req.file;
  let image = '';
  cloudinary.v2.uploader.upload(pic.path, {publicId: req.body.name}, function(error, result) {
    if (error) {
      console.log(error);
    }
    image = result.url;
    var recipeObj = req.body;
    recipeObj.imageUrl = image;
    index.addObject(recipeObj, function(err, content) {
      if (err) {
        console.log(err);
      }
      var id = content.objectID;
      let newRecipe = new Recipe({
        algolia: id,
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
          User.findOneAndUpdate({ userId: req.body.userId }, { $inc: {points: 1 }}).exec((err, newuser) => {
            if (err) {
              console.log('Error --> ', err);
            } else {
              let now = new Date();
              let weekDay = now.getDay();
              if (newuser.pointsGraph.length === 0 ) {
                newuser.pointsGraph.push({ date: now, points: newuser.points + 1, weekDay: weekDay});
              } else {
                let lastelement = newuser.pointsGraph[newuser.pointsGraph.length - 1];
                if (weekDay !== lastelement.weekDay) {
                  newuser.pointsGraph.push({ date: now, points: 1, weekDay: weekDay});
                } else {
                  newuser.pointsGraph.push({ date: now, points: newuser.points + 1, weekDay: weekDay});
                }
              }
              updateUserPoints(req.body.userId, points, pointsGraph, level, newuser.weeklyPoints, (user) => {
                res.status(201).send({point: user.points});
              });
            }
          });
        }
      });
    });
  });

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
      let bookmark = bookmarks[0];
      bookmarks.forEach((bookmark) => {
        recipes.push(
          Recipe.findOne({ 'algolia': bookmark })
            .then((recipe) => {
              if (!recipe) {
                console.log('Not Found');
              }
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

exports.bonusPoints = (req, res) => {
  let points = req.body.points;
  User.findOne({ userId: req.body.userId }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      let level = user.level;
      let leftPoints = levels.levels[level + 1].points - points;
      if (leftPoints === 0) {
        points = 0;
        level += 1;
      } else if (leftPoints < 0) {
        points = Math.abs(leftPoints);
        level += 1;
      }

      //res.status(200).send({points: points});
      updateUserPoints(req.body.userId, points, user.pointsGraph, level, user.weeklyPoints, (user) => {
        res.status(200).send({points: points});
      });
    }
  });
};

let compareDays = (day1, day2) => {
  var one = new Date(day1.getFullYear(), day1.getMonth(), day1.getDate());
  var two = new Date(day2.getFullYear(), day2.getMonth(), day2.getDate());
  var millisecondsPerDay = 1000 * 60 * 60 * 24;
  var millisBetween = two.getTime() - one.getTime();
  var days = millisBetween / millisecondsPerDay;
  return days;
};

exports.awardPoints = (req, res) => {
  User.findOne({ userId: req.body.userId }).exec((err, newuser) => {
    if (err) {
      console.log('Error --> ', err);
      res.status(500).send('Failed to update points');
    } else {
      let now = new Date();
      let today = new Date(now);
      today.setDate(today.getDate());
      let points = newuser.points + 1;
      let weekDay = now.getDay();
      let arr = newuser.pointsGraph;
      let nextLevel = levels.levels[newuser.level + 1].points;
      let level = newuser.level;
      let weeklyPoints = newuser.weeklyPoints;
      //checks dates week1 - week2
      if (compareDays(today, weeklyPoints.week2.date) > 0 ) {
        weeklyPoints.week1.points += 1;
      } else if (compareDays(today, weeklyPoints.week2.date) === 0) {
        arr = [];
        weeklyPoints.week2.points += 1;
      } else if (compareDays(today, weeklyPoints.week2.date) > -7 ) {
        if (weeklyPoints.week2.points === 0) {
          arr = [];
        }
        weeklyPoints.week2.points += 1;
      }
      // checks week2 - week3
      else if (compareDays(today, weeklyPoints.week3.date) > -7) {
        if (weeklyPoints.week3.points === 0) {
          arr = [];
        }
        weeklyPoints.week3.points += 1;
      } else if (compareDays(today, weeklyPoints.week3.date) === 0) {
        arr = [];
        weeklyPoints.week3.points += 1;
      }
      // checks week3 - week4
      else if (compareDays(today, weeklyPoints.week4.date) > -7) {
        if (weeklyPoints.week4.points === 0) {
          arr = [];
        }
        weeklyPoints.week4.points += 1;
      } else if (compareDays(today, weeklyPoints.week4.date) === 0) {
        arr = [];
        weeklyPoints.week4.points += 1;
      } else {
        arr = [];
        let week2 = new Date(now);
        week2.setDate(week2.getDate() + 7);
        let week3 = new Date(now);
        week3.setDate(week3.getDate() + 14);
        let week4 = new Date(now);
        week4.setDate(week4.getDate() + 21);
        weeklyPoints = { week1: {date: now, points: 1}, week2: {date: week2, points: 0}, week3: {date: week3, points: 0}, week4: {date: week4, points: 0}};
      }

      if (arr.length === 0 ) {
        arr.push({ date: now, points: 1, weekDay: weekDay});
      } else {
        let lastelement = arr[arr.length - 1];
        if (weekDay !== lastelement.weekDay) {
          arr.push({ date: now, points: 1, weekDay: weekDay });
        } else {
          arr[arr.length - 1]['points'] += 1;
        }
      }
      if (points === nextLevel) {
        level += 1;
        points = 0;
      }

      updateUserPoints(req.body.userId, points, arr, level, weeklyPoints, (user) => {
        res.status(200).send(user);
      });
    }
  });
};

exports.getData = (req, res) => {
  const { userId } = req.params;
  User.findOne({ userId: userId })
    .exec((err, found) => {
      if (found) {
        res.status(200).json(found);
      }
    });
};

exports.recommendedRecipes = (req, res) => {
  var userId = req.query['0'];
  let isMealPlan = req.isMealPlan || false;
  console.log(isMealPlan);
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
      let bookmark = bookmarks[0];
      bookmarks.forEach((bookmark) => {
        recipes.push(
          Recipe.findOne({ 'algolia': bookmark })
            .then((recipe) => {
              if (!recipe) {
                console.log('Not Found');
              }
              return recipe;
            })
        );
      });
      return Promise.all(recipes).then(recipes);
    })
    .then((recipes) => {
      let count = 0;
      let sum = recipes.reduce((acc, el) => {
        acc += el.difficulty;
        count += 1;
        return acc;
      }, 0);
      let average = (Math.floor(sum / count) >= 4) ? Math.floor(sum / count) : 4;
      let newRecipes = [];
      return Recipe.find( {'difficulty': average}).limit(15);
    })
    .then((newRecipes) => {
      let filteredRecipes;
      if (isMealPlan = true) {
        filteredRecipes = newRecipes.filter((recipe) => {
          let newIngredients = [];
          recipe.ingredients.forEach((ingredient) => {
            newIngredients.push(ingredient.name);
          });
          return newIngredients.join('').toLowerCase().includes('sugar') === false;
        });
      }
      if (filteredRecipes.length) {
        newRecipes = filteredRecipes;
      }
      let recipe = [];
      let obj = {};
      while ( recipe.length !== 5) {
        let rand = Math.floor(Math.random() * newRecipes.length);
        if (obj[rand] === undefined) {
          recipe.push(newRecipes[rand]);
          obj[rand] = true;
        }
      }
      res.status(200).send(recipe);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.popularRecipes = (req, res) => {
  Recipe.find( {'difficulty': 3}).limit(5).exec((err, recipes) => {
    res.status(200).send(recipes);
  });
};

exports.emailRecipe = (req, res) => {
  var userEmail = req.body.email;
  var recipe = req.body.recipe;
  var user = req.body.user;
  var link = 'localhost:8080/recipes/' + req.body.recipe.id;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ifeedmeteam@gmail.com',
      pass: 'foodfoodfood1'
    }
  });
  var mailOptions = {
    to: userEmail,
    subject: 'Hi from iFeedMe! Check out this recipe!',
    html: '<b> Hi </b>' + userEmail + '! <br />' +
          '<b>Here is the recipe you wanted to share: <br /></b>' +
          recipe.name + ' ' + '<br />' +
          'View more at: ' + link,
    attachments: [
      {path: recipe.imageUrl}
    ]
  };
  transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.json({hi: 'error here'});
    } else {
      console.log('Email sent: ' + response);
      res.json({response: response});
    }
  });
};

exports.handleRating = (req, res) => {
  const rating = req.body.rating;
  const id = req.body.recipeId;
  Recipe.findOne({'algolia': id})
    .then((recipe) => {
      let newRating = 0;
      if (recipe.rating !== 0) {
        newRating = (rating + recipe.rating) / 2;
        newRating = newRating.toFixed(1);
      } else {
        newRating = rating;
      }
      return Recipe.findOneAndUpdate({'algolia': id}, { '$set': {rating: newRating} });
    })
    .then((newRating) => {
      res.status(200).json(newRating);
      index.partialUpdateObject({
        rating: newRating.rating,
        objectID: id,
      }, function(err, content) {
        console.log(content);
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
