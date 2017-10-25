const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const handler = require('./request-handler.js');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client/public'));

app.get('/api/hello', (req, res) => {
  res.send({message: 'Hello World!'});
});


app.listen(PORT, () => {
  console.log('Listening on Port', PORT);
});

app.get('/api/recipes/detail/:recipeId', handler.getRecipeDetail);

app.get('/api/recipes', handler.sendRecipes);

app.post('/api/recipes', handler.newRecipe);

app.get('/api/calendarRecipes', handler.getCalendarRecipes);

app.get('/api/recipes/:userId', handler.sendBookmarkedRecipes);

app.post('/api/bookmarks/:userId', handler.addToBookmarks);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client/public/index.html'));
});
