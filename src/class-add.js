
import Digit from './class-digit.js';
import Sub from './class-sub.js';
import { isBigger, cutTens } from './utils.js';

class Add {
  constructor({ digits, addToFirst = false }) {
    this.beforeTens = 0;
    this.addToFirst = addToFirst;
    const digitMap = {
      neg: [],
      pos: []
    };

    for (let digit of digits) {
      digitMap[digit.negative ? 'neg' : 'pos'].push(digit);
      digit.removeE();
    }

    const hasPositiveType = !!digitMap.pos.length;
    const hasNegativeType = !!digitMap.neg.length;
    const hasOneType = !hasNegativeType || !hasPositiveType;

    if (hasOneType) {
      return this._addDigits(digitMap[hasPositiveType ? 'pos' : 'neg'], hasNegativeType);
    } else {
      const negativesSum = digitMap.neg.length === 1 ? digitMap.neg[0] : this._addDigits(digitMap.neg, true);
      const positivesSum = digitMap.pos.length === 1 ? digitMap.pos[0] : this._addDigits(digitMap.pos, false);
      const biggerNegative = isBigger(negativesSum, positivesSum);
      const minuend = biggerNegative ? negativesSum : positivesSum;
      const subtrahend = biggerNegative ? positivesSum : negativesSum;
      return Sub._subDigits(minuend, subtrahend, biggerNegative);
    }
  }

  _addDigits(digits, negative) {
    digits.reduce(this._reduceAfter.bind(this));
    digits.reduce(this._reduceBefore.bind(this));

    switch (this.addToFirst) {
      case true:
        digits[0].before = this.sumBefore;
        digits[0].after = this.sumAfter;
        digits[0].e = 0;
        digits[0].negative = negative;
        return digits[0];
      default:
        return new Digit({
          before: this.sumBefore,
          after: this.sumAfter,
          e: 0,
          negative: negative
        });
    }
  }

  _reduceAfter(a, b, index, arr) {
    const longer = a.after.length > b.after.length ? a : b;
    const l = longer.after;
    const s = longer === a ? b.after : a.after;
    let localRest = 0;
    for (let i = s.length - 1; i >= 0; i--) {
      l[i] = Number(l[i]) + Number(s[i]) + localRest;
      localRest = cutTens(l, i);
    }
    this.beforeTens += localRest;
    localRest = 0;
    if (index === arr.length - 1) this.sumAfter = l;
    return longer;
  }

  _reduceBefore(a, b, index, arr) {
    const longer = a.before.length > b.before.length ? a : b;
    const l = longer.before;
    const s = longer === a ? b.before : a.before;
    for (let i = 0; i < l.length; i++) {
      let x = s.length - 1 - i;
      let y = l.length - 1 - i;
      l[y] = Number(l[y]) + (x >= 0 ? Number(s[x]) : 0) + this.beforeTens;
      this.beforeTens = cutTens(l, y);
      if (x === 0 && this.beforeTens === 0) break;
    }
    if (this.beforeTens > 0) l.unshift(this.beforeTens);
    this.beforeTens = 0;
    if (index === arr.length - 1) this.sumBefore = l;
    return longer;
  }
}

export default Add;