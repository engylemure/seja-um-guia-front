export function uniqueValueOnMergedArray(a, b) {
  return [...new Set([...a, ...b])];
}
