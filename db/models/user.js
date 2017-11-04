const mongoose = require('mongoose');
const ifeedme = require('../config');
mongoose.Promise = require('bluebird');

userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: { unique: true }},
    bookmarks: { type: [] },
    points: {type: Number },
    pointsGraph: { type: []},
    level: { type: Number }
  }
);

var User = mongoose.model('User', userSchema);
module.exports = User;

//fields always generated with Auth0
//name
//nickname
//picture
//user id

//fields generated when details available
//email
//email_verified (boolean indicating verified or not)
//given name
//family name
