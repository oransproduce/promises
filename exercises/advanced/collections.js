/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var fs = require('fs');
var Promise = require('bluebird');
var readdirAsync = Promise.promisify(fs.readdir);
var readFileAsync = Promise.promisify(fs.readFile);
var writeFileAsync = Promise.promisify(fs.writeFile);

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  // TODO
  let promises = filePaths.map((file) => {
    return readFileAsync(file).then((data) => {
      return data.toString().split('\n')[0];
    });
  });

  return Promise.all(promises).then((lines) => {
    let buff = Buffer.alloc(0);
    let count = 1;
    lines.forEach((line) => {
      if (count < lines.length) {
        line+='\n';
        count++;
      }
      buff = Buffer.concat([buff, Buffer.from(line)]);
    });
    return buff;

  }).then((buffer) => {
    return writeFileAsync(writePath, buffer);
  });

};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};