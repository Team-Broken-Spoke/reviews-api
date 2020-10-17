const fs = require('fs');
const readline = require('readline');


let writeStream = fs.createWriteStream('../data-csvs/fullConvertedData.json');
let readStream = fs.createReadStream('../data-csvs/fullData.json');


const reviewDetails = (review) => {
  return {
    "review_id": review.id,
    "rating": review.rating,
    "summary": review.summary,
    "recommend": review.recommend,
    "response": review.response,
    "body": review.body,
    "date": review.date,
    "reviewer_name": review.reviewer_name,
    "helpfulness": review.helpfulness
  }
}

let currentId = "1";
let obj = {
  "product_id" : "1",
  "results": []
}

const processRecord = (data) => {
  if(data.product_id !== currentId) {
    obj["results"].push(reviewDetails(data));
    writeStream.write(JSON.stringify(obj))
    obj = { "product_id": data.product_id, "results": [] }
    currentId = data.product_id;
  } else {
    obj["results"].push(reviewDetails(data));
  }
}

// read data line-by-line
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


