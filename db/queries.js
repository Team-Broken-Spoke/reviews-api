(async function() {

  const {client, db} = await require("./index.js");

  const collection = db.collection("all-reviews");
  const reviewGroup = await collection.findOne({ product_id: "2" });
  console.log(reviewGroup);

})();
