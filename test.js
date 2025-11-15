const myLib = require('./my-module.js');

const sample = [
  [1000, 2000],
  [2500, 4000],
  [3900, 4100],
  [8000, 9000],
  [9050, 9500]
];

const threshold = 200;

console.log(myLib.mergeTimeRanges(sample, threshold));
