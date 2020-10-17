const fs = require('fs');
const readline = require('readline');


let writeStream = fs.createWriteStream('../data-csvs/transformed_characteristic_reviews.json');
let readStream = fs.createReadStream('../data-csvs/characteristic_reviews.json');

let currentId = "1";
let characteristicReviews = {
  "review_id": "1",
  "rating": []
};

const processRecord = (data) => {
  if (data.review_id === currentId) {
    characteristicReviews.rating.push({ "characteristic_id": data.characteristic_id, "value": data.value });
  } else {
    writeStream.write(JSON.stringify(characteristicReviews));
    characteristicReviews = { "review_id": data.review_id, "rating": [] };
    currentId = data.review_id;
    characteristicReviews.rating.push({ "characteristic_id": data.characteristic_id, "value": data.value });
  }
};

const readInterface = readline.createInterface({
  input: readStream
});

readInterface.on('line', (line) => {
  line = line.trim();

  if (line.charAt(line.length-1) === ',') {
      line = line.substr(0, line.length-1);
  }

  if (line.charAt(0) === '{') {
      processRecord(JSON.parse(line));
  }
});


