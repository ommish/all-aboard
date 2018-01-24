const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
let db;

MongoClient.connect('link', (err, database) => {
  if (err) return console.log(err);

  app.listen(3000, () => {
    db = database;
  });
});

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + `/index.html`);
});

app.post('/quotes', (req, res) => {
  console.log(req.body.quote);
});
