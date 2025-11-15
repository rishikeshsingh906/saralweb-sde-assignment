const util = require('./my-module.js');

const data = [
  [1000, 2000],
  [2500, 4000],
  [3900, 4100],
  [8000, 9000],
  [9050, 9500]
  
];

const limit = 200;

console.log(util.mergeTimeRanges(data, limit));
