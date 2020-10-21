const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";

let db;
MongoClient
  .connect(url, { useUnifiedTopology: true })
  .then(client => {
    db = client.db('reviews');
  })
  .catch(error => console.error(error));

// exporting before connection resolves
module.exports = { db };