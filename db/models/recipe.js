const mongoose = require('mongoose');
const ifeedme = require('../config');
mongoose.Promise = require('bluebird');

const recipeSchema = new mongoose.Schema({
  //Full recipe title
  name: { type: String, required: true },
  //may want to collect keywords (nationality, flavor profiles, nutrition details?) to assist with search relevance
  //keywords: { type: ?, required: true }
  //need to decide whether to store ingredient quantities
  //in the same string as the ingredient or separately
  //something like {name: 'tomato puree', quantity: 2, units: 'cups'}
  ingredients: { type: [], required: true },
  //equipments, if needed
  equipment: { type: [] },
  //total prep & cook time
  time: { type: Number, required: true },
  //short description of recipes
  description: { type: String },
  //instructions, collected in order
  instructions: { type: [], required: true },
  //difficulty rating, will have to calculate on recipe save
  difficulty: { type: Number, required: true },
  //user rating, can have this default to 0 or 10 until we implement rating changes
  rating: { type: Number, required: true },
  //image source
  imageUrl: { type: String, required: true },
  //original recipe source: need to track whether recipe is user-submitted or from an external site
  source: {type: String, required: true}
});

const Recipe = mongoose.model('recipe', recipeSchema);
module.exports = Recipe;
