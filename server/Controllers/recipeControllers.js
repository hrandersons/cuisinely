const Recipe = require('../../db/models/recipe.js');
const User = require('../../db/models/user.js');
const recipeHelper = require('../../helpers/recipe-helper.js');
const levels = require('../../db/levels');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary');
const cloudinaryKeys = (process.env.NODE_ENV === 'production') ? {cloud_name: process.env.CLOUD_NAME, api_key: process.env.API_KEY, api_secret: process.env.API_SECRET } : require('../cloudinary_keys');
const algoliaKeys = (process.env.NODE_ENV === 'production') ? {application_ID: process.env.APPLICATION_ID, adminAPI_key: process.env.ADMINAPI_KEY } : require('../algolia_keys');
const algoliasearch = require('algoliasearch');
const client = algoliasearch(algoliaKeys.application_ID, algoliaKeys.adminAPI_key);
const index = client.initIndex('allrecipes');

cloudinary.config(cloudinaryKeys);

let updateUserPoints = (userId, points, pointsGraph, level, weeklyPoints, callback) => {
  User.findOneAndUpdate({ userId: userId }, { '$set': { 'points': points, pointsGraph: pointsGraph, level: level, weeklyPoints: weeklyPoints} }) 
      .then((user) => {
        callback(user);
      })
      .catch((err) => {
          console.log('Error --> ',err)
      });
};

exports.getRecipeDetail = (req, res) => {
  const { recipeId } = req.params;
  Recipe.find({'algolia': recipeId}).exec()
    .then((recipe) => {
      res.status(200).send(recipe);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.sendRecipes = (req, res) => {
  let query = req.query;
  Recipe.find({})
    .then((recipes) => {
      res.status(200).send(recipes);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send('An error occurred');
    });
};

exports.newRecipe = (req, res) => {
  let pic = req.file;
  let image = '';
  cloudinary.v2.uploader.upload(pic.path, {publicId: req.body.name}, function(error, result) {
    if (error) {
      console.log(error);
    }
    image = result.url;
    var recipeObj = req.body;
    recipeObj.ingredients = JSON.parse(recipeObj.ingredients);
    recipeObj.equipment = JSON.parse(recipeObj.equipment);
    recipeObj.instructions = recipeObj.instructions.split('\n');
    recipeObj.imageUrl = image;
    let difficulty = recipeHelper.calcDifficulty(recipeObj);
    recipeObj.difficulty = difficulty;
    index.addObject(recipeObj, function(err, content) {
      if (err) {
        console.log(err);
      }
      var id = content.objectID;
      let newRecipe = new Recipe({
        algolia: id,
        name: req.body.name,
        ingredients: recipeObj.ingredients,
        equipment: recipeObj.equipment,
        description: req.body.description,
        time: req.body.time,
        instructions: recipeObj.instructions,
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
          User.findOne({ userId: req.body.userId })
             .then((newuser) => {

              let points = newuser.points + 2;
              let level = newuser.level;
              let pointsGraph = newuser.pointsGraph;
              if (points === levels.levels[level + 1].points) {
                points = 0;
                level += 1;
              } else if (points > levels.levels[level + 1].points) {
                points = 1;
                level += 1;
              }
              updateUserPoints(req.body.userId, points, pointsGraph, level, newuser.weeklyPoints, (user) => {
                res.status(201).send({point: user.points});
              });
             })
             .catch((err) => {
              console.log('Error --> ', err);
             })
            }
          });
      });
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
  Recipe.find( {'difficulty': 3}).limit(5)
    .then((recipes) => {
      res.status(200).send(recipes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occurred');
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
