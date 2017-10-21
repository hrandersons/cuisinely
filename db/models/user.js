const mongoose = require('mongoose');
const ifeedme = require('../config');
const Promise = require('bluebird');

userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userid: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bookmarks: { type: [], required: true }
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
