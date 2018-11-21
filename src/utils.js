export const orEqual = function () {
  for (let i = 1; i < arguments.length; i++) {
    if (arguments[0] === arguments[i]) return true;
  }
  return false;
};

export const isInteger = function (value) {
  return value % 1 === 0;
};

export const fill = function (value, length) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr[i] = value;
  }
  return arr;
};

export const cutTens = function (arr, x) {
  if (arr[x] <= 9) return 0;
  const unities = arr[x] % 10;
  const tens = (arr[x] - unities) / 10;
  arr[x] = unities;
  return tens;
};

export const isBigger = function (a, b) {
  if (a.before.length > b.before.length) return true;
  if (a.before.length < b.before.length) return false;
  for (let i = 0; i < a.before.length; i++) {
    let x = Number(a.before[i]);
    let y = Number(b.before[i]);
    if (x > y) return true;
    if (x < y) return false;
  }
  let i = 0;
  while (true) {
    let x = Number(a.after[i]);
    let y = Number(b.after[i]);
    if (Number.isNaN(x) && Number.isNaN(y)) return false;
    if (x > y || Number.isNaN(y)) return true;
    if (x < y || Number.isNaN(x)) return false;
    i++;
  }
};

export const reducer = function (arr, callback, initial) {
  const hasInitial = arguments.length >= 3;
  let total = hasInitial ? initial : arr[0];
  for (let i = hasInitial ? 0 : 1; i < arr.length; i++) {
    let currentValue = arr[i];
    let newTotal = callback(total, currentValue);
    total = newTotal;
  }
  return total;
};

export const collectionVariables = function (collection, index) {
  let first = index === 0;
  let last = index === collection.length - 1;
  return {
    first, last,
    item: collection[index],
    index: index,
    previous: first ? null : collection[index - 1],
    next: last ? null : collection[index + 1]
  };
};