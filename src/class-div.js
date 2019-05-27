import Digit from './class-digit';
import Sub from './class-sub';
import Mul from './class-mul';
import { reducer, isBigger } from './utils.js';

class Div {
  constructor({ maxDecimal, digits, divideByZeroError, divisionError }) {
    this.maxDecimal = maxDecimal;
    this._mapZeroDigits(digits);
    if (this.zeroDigits.first && this.zeroDigits.next === null) return new Digit(0);
    if (this.zeroDigits.next) return divisionError(divideByZeroError, this.zeroDigits.next);
    this.result = reducer(digits, (dividend, divisor) => this._divDigits(dividend, divisor, false));
    this.result.round(this.maxDecimal === 0 ? 1 : -this.maxDecimal);
    this.result.removeE();
    return this.result;
  }

  _mapZeroDigits(digits) {
    this.zeroDigits = { first: false, next: null };
    digits.some((digit, index) => {
      if (digit.equalsZero) {
        if (index === 0) this.zeroDigits.first = true;
        else {
          this.zeroDigits.next = index;
          return true;
        }
      }
    });
  }

  _divDigits(dividend, divisor) {
    const getExponential = () => -(divisor.e - dividend.e);
    const getNegative = () => !((dividend.negative && divisor.negative) || (!dividend.negative && !divisor.negative));
    if (divisor.equalsTenths) {
      divisor.setExponential(1, 1);
      dividend.e = getExponential();
      dividend.negative = getNegative();
      return dividend;
    }

    dividend.toIntegers();
    divisor.toIntegers();
    const finalExponential = getExponential();
    const finalNegative = getNegative();
    divisor.negative = false;
    divisor.e = 0;

    const resultDigit = new Digit(0);
    const safeDivisor = extractSafeInteger(divisor, 14);
    let moveExponential = 0, mul, sub;

    while (true) {
      dividend.negative = false;
      dividend.e = 0;
      const safeDividend = extractSafeInteger(dividend, 15);
      const approxResult = Math.floor(safeDividend.value / safeDivisor.value);

      if (approxResult < 1) {
        const lengthDifference = safeDivisor.extracted.length - safeDividend.extracted.length;
        const extraExponential = lengthDifference || 1;
        dividend.removeE(extraExponential);
        moveExponential -= extraExponential;
      } else {
        const approxDigit = new Digit(approxResult);
        approxDigit.e = safeDividend.left - safeDivisor.left;
        mul = new Mul({ digits: [approxDigit, divisor] });
        sub = new Sub({ digits: [dividend, mul] });
        approxDigit.e += moveExponential;
        resultDigit.add(approxDigit);
        dividend = sub;
        if (!isBigger(divisor, sub)) continue;
      }
      if ((sub && sub.toString() == 0) || resultDigit.after.length - finalExponential >= this.maxDecimal + 1) break;
      continue;
    }

    resultDigit.e = finalExponential;
    resultDigit.negative = finalNegative;
    resultDigit.floor(-(this.maxDecimal + 1));
    return resultDigit;

    function extractSafeInteger(digit, num) {
      const extracted = digit.before.slice(0, num);
      const left = digit.before.length - extracted.length;
      const value = Number(extracted.join(''));
      return { extracted, left, value };
    }
  }
}

export default Div;