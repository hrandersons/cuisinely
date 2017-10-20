var mongoose = require('mongoose');

var url = 'mongodb://127.0.0.1/ifeedme';
mongoose.connect(url);

var ifeedme = mongoose.connection;

ifeedme.on('error', console.error.bind(console, 'connection error:'));
ifeedme.once('open', () => {
  console.log('connected to MongoDB');
});

module.exports = ifeedme;
