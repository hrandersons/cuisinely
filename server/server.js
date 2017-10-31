const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const handler = require('./request-handler.js');
const PORT = process.env.PORT || 3000;
const multer = require('multer');
const upload = multer({dest: './uploads/'});
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
app.get('/api/user-data/:userId', handler.getData);

let foodUpload = upload.single('picture');

// export recipe
app.post('/api/emailRecipe', handler.emailRecipe);

// Recipes handlers
app.get('/api/recipes/detail/:recipeId', handler.getRecipeDetail);
app.get('/api/recipes', handler.sendRecipes);
app.post('/api/recipes', foodUpload, handler.newRecipe);

// meal plan handlers
app.post('/api/units', handler.getsourceUnits);
app.get('/api/calendarRecipes', handler.getCalendarRecipes);
app.get('/api/mealPlan', handler.sendMealPlan);
app.post('/api/mealPlan', handler.saveMealPlan);

// Bookmarks handlers
app.put('/api/bookmarks', handler.addBookmark);
app.delete('/api/bookmarks', handler.removeBookmark);
app.get('/api/bookmarks/get', handler.getBookmarks);
app.get('/api/bookmarks/check', handler.checkBookmarks);

//Points handlers
app.post('/api/points', handler.awardPoints);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client/public/index.html'));
});
