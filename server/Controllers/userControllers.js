const User = require('../../db/models/user.js');

exports.getUserInfo = (req, res) => {
  const { userId } = req.params;
  User.findOne({ userId: userId })
    .exec((err, found) => {
      if (found) {
        res.status(200).json(found);
      } else {
        // let now = new Date();
        // let week2 = new Date(now);
        // week2.setDate(week2.getDate() + 7);
        // let week3 = new Date(now);
        // week3.setDate(week3.getDate() + 14);
        // let week4 = new Date(now);
        // week4.setDate(week4.getDate() + 21);
        // let weekly = { week1: {date: now, points: 0}, week2: {date: week2, points: 0}, week3: {date: week3, points: 0}, week4: {date: week4, points: 0}};
        let now = new Date();
        let week1 = new Date(now);
        week1.setDate(week1.getDate() - 21);
        let week2 = new Date(now);
        week2.setDate(week2.getDate() - 14);
        let week3 = new Date(now);
        week3.setDate(week3.getDate() - 7);
        let weekly = { week1: {date: week1, points: 30}, week2: {date: week2, points: 35}, week3: {date: week3, points: 40}, week4: {date: now, points: 35}};
        let Sunday = new Date(now);
        Sunday.setDate(Sunday.getDate() - 4);
        let Monday = new Date(now);
        Monday.setDate(Monday.getDate() - 3);
        let Tuesday = new Date(now);
        Tuesday.setDate(Tuesday.getDate() - 2);
        let Wednesday = new Date(now);
        Wednesday.setDate(Wednesday.getDate() - 1);
        let pointsGraph = [{weekDay: 0, points: 4, date: Sunday}, {weekDay: 1, points: 5, date: Monday}, {weekDay: 2, points: 3, date: Tuesday}, {weekDay: 3, points: 6, date: Wednesday}, {weekDay: 4, points: 1, date: now}];
        User.create({
          userId: userId,
          bookmarks: [],
          points: 35,
          level: 4,
          pointsGraph: pointsGraph,
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
