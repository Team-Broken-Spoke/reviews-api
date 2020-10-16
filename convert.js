const csv = require('csvtojson')
const fs = require('fs');
const readline = require('readline');
const jsonData = require('./data.json');
// const convertedData = require('./convertedData.json');


// let data = [{
//   "product_id": 1,
//   "results": [{reviews}, {reviews}, {reviews}]
// }];

// log data to console
// csv().fromFile('./testReviews.csv')
// .subscribe((json)=>{
//     return new Promise((resolve,reject)=>{
//       resolve(json)
//     })
//     .then((json) => {
//       // if(json.product_id === '1') {
//       //   console.log(json)
//       //   readStream.pipe(json).pipe(writeStream);
//       // }
//       console.log(json.product_id)
//     })
// })


// convert all to data.json, then convert data.json to converted.json:

// converts csv from file and saves in data.json:

// let writeStream = fs.createWriteStream('./data.json');
// let readStream = fs.createReadStream('./testReviews.csv')
// readStream.pipe(csv({downstreamFormat: 'array'})).pipe(writeStream);

// let seen = {}
// fs.writeFile('convertedData.json', '[', (err) => { if(err) throw err });

// jsonData.forEach(line => {
//   let currentId = line.product_id
//   let newDoc = { product_id: line.product_id, results: [] }


//   if(!seen[line.product_id]) {
//     fs.appendFile('convertedData.json', (JSON.stringify(newDoc) + '\n').split('\n').join(','), (err) => {
//       if (err) throw err;
//       console.log('The json line was appended to file!');
//     });
//     seen[line.product_id] = true;
//   }
// })

// fs.appendFile('convertedData.json', ']', (err) => { if(err) throw err });

// let file = fs.createWriteStream('./convertedData.json');
// let source = fs.createReadStream('./data.json');

// file.on('error', function(err) { /* error handling */ });
// file.write('[');
// for(let i = 1; i <= 4; i++) {
//   file.write((`{ "product_id": ${i}, "results": [] }\n`).split('\n').join(','));
// }
// file.write(']');

// file.end();


let file = fs.createWriteStream('./convertedData.json');
let source = fs.createReadStream('./data.json');

// read line-by-line
// const readInterface = readline.createInterface({
//   input: fs.createReadStream('./data.json'),
//   output: process.stdout,
//   console: false
// });
// source.on('line', (line) => {
//   // do something
// })

file.on('error', (err) => console.error(err));
let currentId = "1";
let obj = {
  "product_id" : "1",
  "results": []
}

jsonData.forEach(item => {
  if(item.product_id !== currentId) {
    obj["results"].push({
      "review_id": item.id,
      "rating": item.rating,
      "summary": item.summary,
      "recommend": item.recommend,
      "response": item.response,
      "body": item.body,
      "date": item.date,
      "reviewer_name": item.reviewer_name,
      "helpfulness": item.helpfulness
    });
    file.write(JSON.stringify(obj))
    obj = { "product_id": item.product_id, "results": [] }
    currentId = item.product_id;
  } else {
    obj["results"].push({
      "review_id": item.id,
      "rating": item.rating,
      "summary": item.summary,
      "recommend": item.recommend,
      "response": item.response,
      "body": item.body,
      "date": item.date,
      "reviewer_name": item.reviewer_name,
      "helpfulness": item.helpfulness
    });
  }
  // make sure final is being written
})

file.end();


// save current product_id in variable
// if I encounter new product id, write object to file, and start new object


  // "review_id": item.id,
  // "rating": item.rating,
  // "summary": item.summary,
  // "recommend": item.recommend,
  // "response": item.response,
  // "body": item.body,
  // "date": item.date,
  // "reviewer_name": item.reviewer_name,
  // "helpfulness": item.helpfulness
  // "photos": []

