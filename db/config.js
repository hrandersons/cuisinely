var mongoose = require('mongoose');

var url = (process.env.NODE_ENV === 'production') ? process.env.MONGODB_URI : 'mongodb://127.0.0.1/ifeedme';
mongoose.connect(url, { useMongoClient: true });

var ifeedme = mongoose.connection;

ifeedme.on('error', console.error.bind(console, 'connection error:'));
ifeedme.once('open', () => {
  console.log('connected to MongoDB');
});

module.exports = ifeedme;
