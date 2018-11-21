import Digit from './class-digit.js';
import Add from './class-add.js';

class Sub {
  constructor(data) {
    this._turnNegatives(data.digits);
    return new Add(data);
  }

  _turnNegatives(digits) {
    for (let i = 1; i < digits.length; i++) {
      digits[i].negative = !digits[i].negative;
    }
  }

  static _subDigits(minuend, subtrahend, negative) {
    const longestAfter = minuend.after.length > subtrahend.after.length ? minuend.after.length : subtrahend.after.length;
    const longestBefore = minuend.before.length > subtrahend.before.length ? minuend.before.length : subtrahend.before.length;
    let borrowed = false;
    const subAfter = subtract(longestAfter, 'after');
    const subBefore = subtract(longestBefore, 'before');
    return new Digit({
      before: subBefore,
      after: subAfter,
      e: 0,
      negative: negative
    });

    function subtract(longest, side) {
      const arr = [];
      for (let x = longest - 1; x >= 0; x--) {
        let ax = side === 'after' ? x : x - (longest - (minuend[side].length));
        let bx = side === 'after' ? x : x - (longest - (subtrahend[side].length));
        let a = Number(minuend[side][ax]) || 0;
        let b = Number(subtrahend[side][bx]) || 0;

        if (borrowed) {
          if (a == 0) {
            a = 9;
          } else {
            a--;
            borrowed = false;
          }
        }

        if (a < b) {
          arr[x] = (10 + a) - b;
          borrowed = true;
        } else {
          arr[x] = a - b;
        }
      }
      return arr;
    }

  }

}

export default Sub;