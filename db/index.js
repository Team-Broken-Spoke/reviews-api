const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

// const client = new MongoClient(uri, { useUnifiedTopology: true });

module.exports = (async function() {

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true
  });

   const db = client.db('reviews');
   return { client, db };

 })().catch(console.dir);

