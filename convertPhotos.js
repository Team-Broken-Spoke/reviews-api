const fs = require('fs');
const readline = require('readline');


let writeStream = fs.createWriteStream('../data-csvs/transformedPhotoData.json');
let readStream = fs.createReadStream('../data-csvs/photoData.json');

let currentId = "1";
let photosObj = {
  "review_id": '1',
  "photos": []
};

const processRecord = (data) => {
  if(data.review_id === currentId) {
    photosObj.photos.push({"id": data.id, "url": data.url });
  } else {
    writeStream.write(JSON.stringify(photosObj));
    photosObj = {"review_id": data.review_id, "photos": []};
    currentId = data.review_id;
    photosObj.photos.push({"id": data.id, "url": data.url });
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


