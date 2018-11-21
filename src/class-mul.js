import Digit from './class-digit';
import { cutTens } from './utils.js';

class Mul {
  constructor({ digits, zeroValue = -1, power = null }) {
    if (zeroValue >= 0) return new Digit({
      before: [0],
      after: [],
      e: 0,
      negative: false
    });
    let result;
    digits[0].toIntegers();
    if (power === null) {
      result = digits.reduce((a, b) => {
        b.toIntegers();
        return this.constructor._mulDigits(a, b);
      });
    } else {
      result = digits[0];
      for (let i = 0; i < power - 1; i++) {
        result = this.constructor._mulDigits(result, digits[0]);
      }
    }
    result.removeE();
    return result;
  }

  static _mulDigits(a, b) {
    const sum = [];
    const sumLength = a.before.length + b.before.length - 1;
    const aTenths = a.equalsTenths;
    const bTenths = b.equalsTenths;
    if (aTenths || bTenths) {
      if (aTenths) a.setExponential(1, 1);
      if (bTenths) b.setExponential(1, 1);
      return new Digit({
        before: aTenths ? b.before.slice() : a.before.slice(),
        after: aTenths ? b.after.slice() : a.after.slice(),
        e: a.e + b.e,
        negative: !((a.negative && b.negative) || (!a.negative && !b.negative))
      });
    }

    for (let posX = sumLength - 1, x = a.before.length - 1; x >= 0; x-- , posX--) {
      for (let posY = 0, y = b.before.length - 1; y >= 0; y-- , posY++) {
        sum[posX - posY] = sum[posX - posY] || 0;
        sum[posX - posY] += a.before[x] * b.before[y];
      }
    }

    for (let i = sum.length - 1; i >= 0; i--) {
      var rest = cutTens(sum, i);
      if (i - 1 >= 0) sum[i - 1] += rest;
    }

    while (rest > 0) {
      sum.unshift(rest);
      rest = cutTens(sum, 0);
    }
    return new Digit({
      before: sum,
      after: [],
      e: a.e + b.e,
      negative: !((a.negative && b.negative) || (!a.negative && !b.negative))
    });
  }
}

export default Mul;