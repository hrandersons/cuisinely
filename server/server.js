const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const handler = require('./request-handler.js');
const PORT = process.env.PORT || 3000;
console.log('ENV VAirable  --> ', process.env.VAR1);
console.log('USerrr -> ', process.env.USER);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client/public'));

app.get('/api/hello', (req, res) => {
  res.send({message: 'Hello World!'});
});


app.listen(PORT, () => {
  console.log('Listening on Port', PORT);
});

app.get('/api/user/:userId', handler.getUserInfo);

app.get('/api/recipes/detail/:recipeId', handler.getRecipeDetail);

app.get('/api/recipes', handler.sendRecipes);

app.post('/api/recipes', handler.newRecipe);

app.get('/api/calendarRecipes', handler.getCalendarRecipes);

app.get('/api/mealPlan', handler.sendMealPlan);

app.post('/api/mealPlan', handler.saveMealPlan);

app.get('/api/recipes/:userId', handler.sendBookmarkedRecipes);

// Bookmarks handlers
app.put('/api/bookmarks', handler.addBookmark);
app.delete('/api/bookmarks', handler.removeBookmark);
app.get('/api/bookmarks', handler.checkBookmarks);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client/public/index.html'));
});
