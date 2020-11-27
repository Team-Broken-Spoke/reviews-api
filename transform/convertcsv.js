const csv = require('csvtojson')
const fs = require('fs');


// convert reviews csv to json
// let writeStream = fs.createWriteStream('../data-csvs/fullData.json');
// let readStream = fs.createReadStream('../data-csvs/reviews.csv')
// readStream.pipe(csv({downstreamFormat: 'array'})).pipe(writeStream);

// convert photos csv to json
// let writeStream = fs.createWriteStream('../data-csvs/photoData.json');
// let readStream = fs.createReadStream('../data-csvs/reviews_photos.csv')
// readStream.pipe(csv({downstreamFormat: 'array'})).pipe(writeStream);

// convert characteristic_reviews csv to json
// let writeStream = fs.createWriteStream('../data-csvs/characteristic_reviews.json');
// let readStream = fs.createReadStream('../data-csvs/characteristic_reviews.csv')
// readStream.pipe(csv({downstreamFormat: 'array'})).pipe(writeStream);

// convert characteristics csv to json
let writeStream = fs.createWriteStream('../data-csvs/characteristics.json');
let readStream = fs.createReadStream('../data-csvs/characteristics.csv')
readStream.pipe(csv({downstreamFormat: 'array'})).pipe(writeStream);