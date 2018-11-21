const type = require('of-type');

export const actions = {
  add: 'addition',
  sub: 'subtraction',
  mul: 'multiplication',
  div: 'division',
  round: 'rounding operation',
  ceil: 'ceiling operation',
  floor: 'flooring operation',
  pow: 'exponentiation operation',
  formula: 'formula calculation'
};

export const joinArrayConfig = (names) => {
  return {
    array: names,
    separator: ', ',
    last: ' and ',
    each: (value) => type(value, String) ? `"${value}"` : value
  };
};