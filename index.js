const express = require('express');
const app = express();
const axios = require('axios');
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.info(`API running on port ${port}`);
})

let db;
MongoClient
  .connect(url, { useUnifiedTopology: true })
  .then(client => {
    db = client.db('reviews');
  })
  .catch(error => console.error(error));

  const getNextSequenceValue = (sequenceName) => {
    return db.collection('counters').findOneAndUpdate(
      { "_id" : sequenceName },
      { $inc: { sequence_value: 1 } },
      { new: true }
    )
  }

  app.get('/reviews/:productId', (req, res) => {
    const collection = db.collection('all-reviews');
    collection.findOne({ product_id: req.params.productId })
      .then(response => {
        res.send(response)
      })
      .catch(error => {
        console.error(`Error getting reviews for product id:
          ${req.params.productId}. Error: ${error}`);
      })
  });

  app.get('/reviews/:productId/characteristics', (req, res) => {
    const collection = db.collection('characteristicsByProduct');
    collection.findOne({ product_id: req.params.productId })
      .then(response => {
        res.send(response)
      })
      .catch(error => {
        console.error(`Error getting characteristics for product id:
          ${req.params.productId}. Error: ${error}`)
      })
  })

  app.get('/reviews/:productId/characteristic-reviews', (req, res) => {
    const collection = db.collection('characteristic-reviews');
    const allReviews = db.collection('all-reviews');
    let results = [];
    let total = 0;

    allReviews.findOne({ product_id: req.params.productId })
      .then(response => {
        total = response.results.length;
        response.results.forEach(result => {
          let promise = new Promise((resolve, reject) => {

            collection.findOne({ review_id: result.review_id })
              .then(response => {
                resolve(response)
              })
              .catch(err => {
                reject(err)
              })

          })
          promise.then(data => {
            results.push(data)
            if(results.length === total) {
              res.send(results)
            }
            res.send(results)
          })
          promise.catch(err => {
            console.error(err)
          })
        })
      })
  })

  app.post('/reviews/:productId', (req, res) => {
    const collection = db.collection('all-reviews');
    getNextSequenceValue('reviewid')
      .then((doc) => {
        collection.updateOne (
          { product_id: req.params.productId },
          {
            $push: {
              results: {
                review_id: JSON.stringify(doc.value.sequence_value),
                rating: req.body.rating,
                summary: req.body.summary,
                recommend: req.body.recommend,
                response: "",
                body: req.body.body,
                date: new Date().toISOString().substr(0, 10),
                reviewer_name: req.body.reviewer_name,
                helpfulness: "0"
              }
            }
          })
      })
      .then(() => {
        res.send('successfully posted review.')
      })
      .catch(error => {
        console.error(`Error posting a review to product id: ${req.params.productId}. Error: ${error}`)
      })
  })

  app.post('reviews/responses/:reviewId', (req, res) => {
    const collection = db.collection('all-reviews');
    collection.updateOne(
      { 'results.review_id': req.params.reviewId  },
      { $set: { "results.$.response": req.body.response } }
    )
      .then(() => {
        res.send(`Successfully added your response to review id: ${req.params.reviewId}`)
      })
      .catch(error => {
        console.error(`Error posting a response to review: ${req.params.reviewId}. Error: ${error}`);
      })
  })
