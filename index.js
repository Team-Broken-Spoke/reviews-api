const express = require('express');
const app = express();
app.use(express.json());
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const port = 3000;
app.listen(port, () => console.info(`REST API running on port ${port}`));

let db;
MongoClient
  .connect(url, { useUnifiedTopology: true })
  .then(client => {
    db = client.db('reviews');
  })
  .catch(error => console.error(error));


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

  app.post('/reviews/:productId', (req, res) => {
    const collection = db.collection('tester');
    collection.updateOne (
      { product_id: req.params.productId },
      {
        $push: {
          results: {
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
      .then(() => {
        res.send('success!')
      })
      .catch(error => {
        console.error(error)
      })
  })
