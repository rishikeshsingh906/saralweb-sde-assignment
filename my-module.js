function mergeTimeRanges(list, gap) {
  if (!Array.isArray(list) || list.length === 0) return [];

  const arranged = list.slice().sort((x, y) => x[0] - y[0]);
  const result = [];
  let start = arranged[0][0];
  let end = arranged[0][1];

  for (let i = 1; i < arranged.length; i++) {
    const s = arranged[i][0];
    const e = arranged[i][1];

    if (s <= end) {
      end = e > end ? e : end;
    } else if (s - end <= gap) {
      end = e;
    } else {
      result.push([start, end]);
      start = s;
      end = e;
    }
  }

  result.push([start, end]);
  return result;
  
}

module.exports = { mergeTimeRanges };
