/**
 * Normalize and merge time intervals treating small gaps as continuous.
 *
 * @param {Array<Array<number>>} intervals - list of [start, end) pairs (can be unsorted)
 * @param {number} maxGap - maximum gap (in ms) that we consider joinable
 * @returns {Array<Array<number>>} merged, sorted non-overlapping intervals
 */
function consolidateIntervals(intervals, maxGap) {
  // Basic guards
  if (!Array.isArray(intervals) || intervals.length === 0) return [];

  // Make a shallow copy and ensure each interval is [start, end] numbers
  const cleaned = intervals
    .map(pair => [Number(pair[0]), Number(pair[1])])
    .filter(pair => Number.isFinite(pair[0]) && Number.isFinite(pair[1]) && pair[0] < pair[1]);

  if (cleaned.length === 0) return [];

  // Sort by start time
  cleaned.sort((a, b) => a[0] - b[0]);

  const result = [];
  // Start from the first interval
  let [s, e] = cleaned[0];

  for (let i = 1; i < cleaned.length; i++) {
    const [ns, ne] = cleaned[i];

    // Overlap or touching: ns <= e
    if (ns <= e) {
      // Extend if needed
      if (ne > e) e = ne;
      continue;
    }

    // Small gap allowed: if gap <= maxGap, join them
    const gap = ns - e;
    if (gap <= maxGap) {
      // We treat them as continuous — extend the end to the new interval's end
      e = Math.max(e, ne);
      continue;
    }

    // Otherwise, finalize current and move to next
    result.push([s, e]);
    s = ns;
    e = ne;
  }

  // push last accumulated interval
  result.push([s, e]);
  return result;
}

module.exports = {
  mergeTimeRanges: consolidateIntervals
};
