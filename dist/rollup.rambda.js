function range(start, end) {
  const willReturn = [];
  for (let i = start; i < end; i++) {
    willReturn.push(i);
  }

  return willReturn;
}

function fn(x) {
  return range(2, x);
}

console.log(fn(10));
