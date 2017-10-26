const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const handler = require('./request-handler.js');
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log('CLient ID --> ', process.env.CLIENT_ID);
console.log('Type --> ', typeof process.env.CLIENT_ID);
console.log( 'domain --> ', process.env.DOMAIN);

let keys = (process.env.CLIENT_ID && process.env.DOMAIN) ? {
  clientId: process.env.CLIENT_ID,
  domain: process.env.DOMAIN
} : require('../Auth/Auth_keys');
console.log('Keys --> ', keys);

app.use(express.static('client/public'));

app.get('/api/hello', (req, res) => {
  res.send({message: 'Hello World!'});
});


app.listen(PORT, () => {
  console.log('Listening on Port', PORT);
});

app.get('/api/user/:userId', handler.getUserInfo);

// Recipes handlers
app.get('/api/recipes/detail/:recipeId', handler.getRecipeDetail);
app.get('/api/recipes', handler.sendRecipes);
app.post('/api/recipes', handler.newRecipe);

// meal plan handlers
app.get('/api/calendarRecipes', handler.getCalendarRecipes);
app.get('/api/mealPlan', handler.sendMealPlan);
app.post('/api/mealPlan', handler.saveMealPlan);

// Bookmarks handlers
app.put('/api/bookmarks', handler.addBookmark);
app.delete('/api/bookmarks', handler.removeBookmark);
app.get('/api/bookmarks/get', handler.getBookmarks);
app.get('/api/bookmarks/check', handler.checkBookmarks);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client/public/index.html'));
});
