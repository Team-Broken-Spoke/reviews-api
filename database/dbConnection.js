
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";

const dbName = 'reviews';

let _db;
module.exports = {
  connect(callback) {
    MongoClient.connect( url, { useUnifiedTopology: true }, (err, client) => {
      _db  = client.db('reviews');
      return callback(err, client);
    });
  },
  getDb() {
    return _db;
  },
  getAllReviewsForProduct(collection, id, callback) {
    collection.findOne({product_id: id}, (err, document) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, document);
      }
    });
  }
};