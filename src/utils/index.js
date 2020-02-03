function nestedCopy(array) {
  return JSON.parse(JSON.stringify(array));
}

function generate2DArray(size) {
  return new Array(size)
    .fill(null)
    .map(() =>
      new Array(size).fill(null).map(x => (Math.random() >= 0.5 ? 1 : 0))
    );
}

export { nestedCopy, generate2DArray };
