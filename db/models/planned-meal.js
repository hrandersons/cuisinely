const mongoose = require('mongoose');
const ifeedme = require('../config');
mongoose.Promise = require('bluebird');

const plannedMealSchema = new mongoose.Schema({
  // user who scheduled this meal
  userId: {type: String, required: true },
  // scheduled date for this meal
  date: {type: Date, required: true },
  // recipe for this meal
  recipe: {type: String, required: true },
  // status of meal (incomplete/complete)
  status: {type: String, required: true },

});

const PlannedMeal = mongoose.model('PlannedMeal', plannedMealSchema);
module.exports = PlannedMeal;

/* This schema may seem like we would be scattering data, but it will allow for a better control over adjusting individual meals in a weekly plan. Since each planned meal would be its own entity with a specific date, we can even allow for multiple meals for one day, and adjusting the date would also be easier under the hood. making db queries for meals a user has scheduled within a certain time frame should be pretty simple, too. */
