const fs = require('fs');
const readline = require('readline');


let writeStream = fs.createWriteStream('../data-csvs/transformed_characteristics.json');
let readStream = fs.createReadStream('../data-csvs/characteristics.json');

let currentId = "1";
let characteristicObj = {
  "product_id" : "1",
  "results": []
}

const processRecord = (data) => {
  if(data.product_id === currentId) {
    characteristicObj["results"].push({"id": data.id, "name": data.name});
  } else {
    writeStream.write(JSON.stringify(characteristicObj));
    characteristicObj = { "product_id": data.product_id, "results": [] };
    currentId = data.product_id;
    characteristicObj["results"].push({"id": data.id, "name": data.name});
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

