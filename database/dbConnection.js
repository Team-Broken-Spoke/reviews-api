
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

  getAllReviewsForProduct(collection, productId, callback) {
    collection.findOne({product_id: productId}, (err, document) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, document);
      }
    });
  },

  /*
  Request body should look like this:
  {
    "rating": "5",
    "summary": "A good product",
    "recommend": "true",
    "body": "I do not regret this purchase",
    "reviewer_name": "Name",
  }
  */

  postReview(collection, productId, data) {
    collection.updateOne (
      { product_id: productId },
      {
        $push: {
          results: {
            rating: data.rating,
            summary: data.summary,
            recommend: data.recommend,
            response: "",
            body: data.body,
            date: new Date().toISOString().substr(0, 10),
            reviewer_name: data.reviewer_name,
            helpfulness: "0"
          }
        }
      }
    )}

}