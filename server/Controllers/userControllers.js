const User = require('../../db/models/user.js');

exports.getUserInfo = (req, res) => {
  const { userId } = req.params;
  User.findOne({ userId: userId })
    .exec((err, found) => {
      if (found) {
        res.status(200).json(found);
      } else {
        let now = new Date();
        let week2 = new Date(now);
        week2.setDate(week2.getDate() + 7);
        let week3 = new Date(now);
        week3.setDate(week3.getDate() + 14);
        let week4 = new Date(now);
        week4.setDate(week4.getDate() + 21);
        let weekly = { week1: {date: now, points: 0}, week2: {date: week2, points: 0}, week3: {date: week3, points: 0}, week4: {date: week4, points: 0}};
        User.create({
          userId: userId,
          bookmarks: [],
          points: 0,
          level: 1,
          weeklyPoints: weekly
        })
          .then((newUser) => {
            console.log('user created!');
            res.status(200).json(newUser);
          });
      }
    });
};

exports.getData = (req, res) => {
  const { userId } = req.params;
  User.findOne({ userId: userId })
    .exec((err, found) => {
      if (found) {
        res.status(200).json(found);
      }
    });
};
