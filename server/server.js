const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client/public'));

app.get('/api/hello', (req, res) => {
  res.send({message: 'Hello World!'});
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client/public/index.html'));
});

app.listen(PORT, () => {
  console.log('Listening on Port', PORT);
});
