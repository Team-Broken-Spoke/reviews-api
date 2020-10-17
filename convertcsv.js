const csv = require('csvtojson')
const fs = require('fs');


// convert csv to json
let writeStream = fs.createWriteStream('../data-csvs/fullData.json');
let readStream = fs.createReadStream('../data-csvs/reviews.csv')
readStream.pipe(csv({downstreamFormat: 'array'})).pipe(writeStream);