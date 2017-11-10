const Recipe = require('../../db/models/recipe.js');

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
