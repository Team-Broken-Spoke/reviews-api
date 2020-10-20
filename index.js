const express = require('express');
const app = express();
const port = 3000;
const database = require('./database/dbConnection.js');
app.use(express.json());


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})


app.get('/reviews/:productId', (req, res) => {
  database.connect((err, client) => {
    if(err) {
      console.error('There was an error connecting to the database');
    } else {
      let collection = database.getDb().collection('all-reviews');
      database.getAllReviewsForProduct(collection, req.params.productId, (err, data) => {
        if(err) {
          console.error('There was an error getting the document');
        } else {
          res.send(data);
        }
      })
    }
  })
})

app.post('/reviews/:productId', (req, res) => {
  database.connect((err, client) => {
    if(err) {
      console.error('There was an error connecting to the database');
    } else {
      let collection = database.getDb().collection('tester');
      database.postReview(collection, req.params.productId, req.body);
      res.end();
    }
  })
})
