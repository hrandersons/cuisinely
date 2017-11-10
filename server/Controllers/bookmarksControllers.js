const User = require('../../db/models/user.js');
const Recipe = require('../../db/models/recipe.js');

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
    .then(() => {
      res.status(200).send('bookmarked!');
    })
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
    .then(() => {
      res.status(200).send('removed!');
    })
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
