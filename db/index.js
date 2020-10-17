const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const db = client.db("reviews");
    // query all-reviews collection and console.log document with product_id: "2"
    const collection = db.collection("all-reviews");
    const reviewGroup = await collection.findOne({ product_id: "2" });
    console.log(reviewGroup);

  } finally {
    await client.close();
  }
}
run().catch(console.dir);