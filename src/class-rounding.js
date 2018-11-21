import Digit from './class-digit';
import { fill } from './utils.js';

class Rounding {
  constructor({ digit, places }, action) {
    this.action = action;
    this.digit = digit;
    this.digit.removeE();
    this.places = places;

    if (this.places === 0) return this.digit;

    this.mode = this.places > 0 ? 'before' : 'after';
    const zeros = this.mode === 'before' ? this.places - 1 : 0;
    if (this.mode === 'after') this.places *= -1;
    if (this.mode === 'before') this.places = this.digit.before.length - this.places + 1;

    const roundNumber = this._reduceRight();
    if (roundNumber === null) {
      return new Digit({
        before: [0],
        after: [],
        e: 0,
        negative: false
      });
    } else {
      this._round(roundNumber);
      this._addZeros(zeros);
      this.digit.trimZeros();
      return this.digit;
    }
  }

  _reduceRight() {
    if (this.action !== 'ceil' && this.places < 0 && this.mode === 'before') return null;
    if (this.places < 0) this.places = 0;
    return this.digit[this.mode].splice(this.places, this.digit[this.mode].length - this.places).concat(this.mode === 'before' ? this.digit.after.splice(0, this.digit.after.length) : []);
  }

  _round(reduced) {
    if (this.action === 'floor') return;
    if (!reduced.length) return;

    if (this.action === 'round' ? roundUp.call(this) : ceilUp.call(this)) {
      if (this.digit.after.length) {
        this.digit.after[this.digit.after.length - 1]++;
        moveLeft.call(this);
      } else if (this.digit.before.length) {
        this.digit.before[this.digit.before.length - 1]++;
        moveLeft.call(this);
      } else {
        this.digit.before[0] = 1;
      }
    }

    function moveLeft() {
      for (let i = this.digit.after.length - 1; i >= 0; i--) {
        if (Number(this.digit.after[i]) < 10) return;
        let afterEnd = i - 1 < 0;
        if (i === this.digit.after.length - 1) {
          this.digit.after.pop();
        } else {
          this.digit.after[i] = 0;
        }
        this.digit[afterEnd ? 'before' : 'after'][afterEnd ? this.digit.before.length - 1 : i - 1]++;
      }
      for (let i = this.digit.before.length - 1; i >= 0; i--) {
        if (Number(this.digit.before[i]) < 10) return;
        let beforeEnd = i - 1 < 0;
        this.digit.before[i] = 0;
        if (beforeEnd) {
          this.digit.before.unshift(1);
        } else {
          this.digit.before[i - 1]++;
        }
      }
    }

    function roundUp() {
      return Number(reduced[0]) >= 5;
    }

    function ceilUp() {
      for (let i in reduced) {
        if (Number(reduced[i]) > 0) {
          return true;
        }
      }
      return false;
    }
  }

  _addZeros(zeros) {
    if (!this.digit.before.length) {
      this.digit.before[0] = 0;
      return;
    }
    this.digit.before.push(...fill(0, zeros));
  }
}

export class Round extends Rounding {
  constructor(data) {
    super(data, 'round');
  }
}

export class Ceil extends Rounding {
  constructor(data) {
    super(data, 'ceil');
  }
}

export class Floor extends Rounding {
  constructor(data) {
    super(data, 'floor');
  }
}