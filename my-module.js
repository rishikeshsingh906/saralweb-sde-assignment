const mergeTimeRanges = (ranges, threshold) => {

  if (!Array.isArray(ranges) || ranges.length === 0) {
    return [];

  }

  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);

  const merged = [];
  let [currentStart, currentEnd] = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const [nextStart, nextEnd] = sorted[i];

    if (nextStart <= currentEnd) {
      currentEnd = Math.max(currentEnd, nextEnd);
    } else if (nextStart - currentEnd <= threshold) {
      currentEnd = nextEnd;
    } else {
      merged.push([currentStart, currentEnd]);
      currentStart = nextStart;
      currentEnd = nextEnd;
    }

  }

  merged.push([currentStart, currentEnd]);

  return merged;



};

module.exports = {
  mergeTimeRanges
  
};
