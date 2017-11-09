const mongoose = require('mongoose');
const ifeedme = require('../config');
mongoose.Promise = require('bluebird');

const mealPlanSchema = new mongoose.Schema({
  // owner of mealplan - use mongodb objectId or auth0 id
  userId: {type: String, required: true },
  // start date of meal plan (beginning of the week)
  startDate: {type: Date, required: true },
  // end date of the meal plan (end of the week)
  endDate: {type: Date, required: true },
  // set of recipes - use index to maintain order (length of 5?)
  recipes: {type: [], required: true },
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);
module.exports = MealPlan;

/* In this schema, each item in the recipes array would need to be an object that stores the actual recipe object as well as the status of the recipe.
Rescheduling would be accomplished by rearranging items inside the array,
which would be a linear operation but the array will always have a length of 5.
Each recipe would not be assigned to a specific date,
since we will just count from the startDate using the array index.
Manipulating individual recipes may be slightly more difficult. */
