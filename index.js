const express = require('express');
const app = express();
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

    collection.findOne({product_id: req.params.productId})
      .then((response) => {
        res.send(response)
      })
      .catch(error => {
        console.error(error);
      })
  });

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

  app.post('/reviews/:productId', (req, res) => {
    const collection = db.collection('tester');
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
        res.send('success!')
      })
      .catch(error => {
        console.error(error)
      })
  })
