const User = require('../../db/models/user.js');
var levels = require('../../db/levels');

let updateUserPoints = (userId, points, pointsGraph, level, weeklyPoints, callback) => {
  User.findOneAndUpdate({ userId: userId }, { '$set': { 'points': points, pointsGraph: pointsGraph, level: level, weeklyPoints: weeklyPoints} }).exec((err, user) => {
    if (err) {
      console.log('Err ---> ', err);
    } else {
      callback(user);
    }
  });
};

let compareDays = (day1, day2) => {
  var one = new Date(day1.getFullYear(), day1.getMonth(), day1.getDate());
  var two = new Date(day2.getFullYear(), day2.getMonth(), day2.getDate());
  var millisecondsPerDay = 1000 * 60 * 60 * 24;
  var millisBetween = two.getTime() - one.getTime();
  var days = millisBetween / millisecondsPerDay;
  return days;
};

exports.bonusPoints = (req, res) => {
  let points = req.body.points;
  User.findOne({ userId: req.body.userId }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      let level = user.level;
      let leftPoints = levels.levels[level + 1].points - points;
      if (leftPoints === 0) {
        points = 0;
        level += 1;
      } else if (leftPoints < 0) {
        points = Math.abs(leftPoints);
        level += 1;
      }
      updateUserPoints(req.body.userId, points, user.pointsGraph, level, user.weeklyPoints, (user) => {
        res.status(200).send({points: points});
      });
    }
  });
};

exports.awardPoints = (req, res) => {
  User.findOne({ userId: req.body.userId }).exec((err, newuser) => {
    if (err) {
      console.log('Error --> ', err);
      res.status(500).send('Failed to update points');
    } else {
      let now = new Date();
      let today = new Date(now);
      today.setDate(today.getDate());
      let points = newuser.points + 1;
      let weekDay = now.getDay();
      let arr = newuser.pointsGraph;
      let nextLevel = levels.levels[newuser.level + 1].points;
      let level = newuser.level;
      let weeklyPoints = newuser.weeklyPoints;
      //checks dates week1 - week2
      if (compareDays(today, weeklyPoints.week2.date) > 0 ) {
        weeklyPoints.week1.points += 1;
      } else if (compareDays(today, weeklyPoints.week2.date) === 0) {
        arr = [];
        weeklyPoints.week2.points += 1;
      } else if (compareDays(today, weeklyPoints.week2.date) > -7 ) {
        if (weeklyPoints.week2.points === 0) {
          arr = [];
        }
        weeklyPoints.week2.points += 1;
      }
      // checks week2 - week3
      else if (compareDays(today, weeklyPoints.week3.date) > -7) {
        if (weeklyPoints.week3.points === 0) {
          arr = [];
        }
        weeklyPoints.week3.points += 1;
      } else if (compareDays(today, weeklyPoints.week3.date) === 0) {
        arr = [];
        weeklyPoints.week3.points += 1;
      }
      // checks week3 - week4
      else if (compareDays(today, weeklyPoints.week4.date) > -7) {
        if (weeklyPoints.week4.points === 0) {
          arr = [];
        }
        weeklyPoints.week4.points += 1;
      } else if (compareDays(today, weeklyPoints.week4.date) === 0) {
        arr = [];
        weeklyPoints.week4.points += 1;
      } else {
        arr = [];
        let week2 = new Date(now);
        week2.setDate(week2.getDate() + 7);
        let week3 = new Date(now);
        week3.setDate(week3.getDate() + 14);
        let week4 = new Date(now);
        week4.setDate(week4.getDate() + 21);
        weeklyPoints = { week1: {date: now, points: 1}, week2: {date: week2, points: 0}, week3: {date: week3, points: 0}, week4: {date: week4, points: 0}};
      }

      if (arr.length === 0 ) {
        arr.push({ date: now, points: 1, weekDay: weekDay});
      } else {
        let lastelement = arr[arr.length - 1];
        if (weekDay !== lastelement.weekDay) {
          arr.push({ date: now, points: 1, weekDay: weekDay });
        } else {
          arr[arr.length - 1]['points'] += 1;
        }
      }
      if (points === nextLevel) {
        level += 1;
        points = 0;
      }
      updateUserPoints(req.body.userId, points, arr, level, weeklyPoints, (user) => {
        res.status(200).send(user);
      });
    }
  });
};
