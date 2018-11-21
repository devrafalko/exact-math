import type from 'of-type';
import Add from './class-add';
import { Floor, Round } from './class-rounding';
import { fill } from './utils.js';

class Digit {
  constructor(o) {
    if (type(o, Object)) {
      this.negative = o.negative;
      this.before = o.before;
      this.after = o.after;
      this.e = o.e;
    } else {
      this.print = type(o, String) ? o : String(o);
      const parts = /^\s*([+-]?)(\d*)(?:(?:([.,])(\d+)))?(?:e([+-]\d+))?\s*$/.exec(this.print);

      this.negative = parts[1] === '-';
      this.before = (parts[2] || '0').split('');
      this.after = (parts[4] || '').split('');
      this.e = parts[5] ? Number(parts[5]) : 0;
    }
    this.trimZeros();
  }

  get equalsZero() {
    return this.toString() == 0;
  }

  get equalsTenths() {
    this.trimZeros();
    if (this.before[0] == 1 && !this.after.length && this.before.every((a, ind) => ind === 0 ? true : a == 0)) return true;
    if (this.after[this.after.length - 1] == 1 && this.beforeEqualsZero && this.after.every((a, ind, arr) => ind === arr.length - 1 ? true : a == 0)) return true;
    return false;
  }

  get beforeEqualsZero() {
    return this.before.length === 1 && this.before[0] == 0;
  }

  trimZeros() {
    while (this.before.length > 1 && this.before[0] == 0) {
      this.before.shift();
    }
    while (this.after.length && this.after[this.after.length - 1] == 0) {
      this.after.pop();
    }
    if (!this.before.length) this.before[0] = 0;
  }

  setExponential(eMinus, ePlus) {
    if (!this.after.length && this.before.length >= ePlus) {
      while (this.before.length > 1 && this.before[this.before.length - 1] == 0) {
        this.before.pop();
        this.e++;
      }
    } else if (this.beforeEqualsZero && this.after.length >= eMinus) {
      while (this.after[0] == 0) {
        this.after.shift();
        this.e--;
      }
      this.before[0] = this.after.shift();
      this.e--;
    }
  }

  reduceE() {
    if (this.e > 0) {
      const spliced = this.after.splice(0, this.e);
      this.before.push(...spliced);
      this.e = this.e - spliced.length;
    }
    if (this.e < 0) {
      const diff = this.before.length + this.e;
      const position = diff < 0 ? 0 : diff;
      const spliced = this.before.splice(position, this.before.length - position);
      this.after.unshift(...spliced);
      this.e = this.e + spliced.length;
      if (!this.before.length) this.before[0] = 0;
    }
    this.trimZeros();
  }

  removeE(e) {
    if (type(e, Number)) this.e += e;
    this.reduceE();
    if (this.e > 0) this.before.push(...fill(0, this.e));
    if (this.e < 0) this.after.unshift(...fill(0, this.e * -1));
    this.e = 0;
  }

  toString() {
    const negative = this.negative && !(this.beforeEqualsZero && !this.after.length) ? '-' : '';
    const before = !this.before.length ? '0' : this.before.join('');
    const after = this.after.length ? '.' + this.after.join('') : '';
    const e = this.e > 0 ? 'e+' + String(this.e) : this.e < 0 ? 'e' + String(this.e) : '';
    return negative + before + after + e;
  }

  toIntegers() {
    if (this.after.length) {
      this.e -= this.after.length;
      this.before.push(...this.after.splice(0, this.after.length));
    }
    if (this.e > 0) this.removeE();
    this.trimZeros();
  }

  negate() {
    this.negative = !this.negative;
  }

  floor(places) {
    new Floor({
      digit: this,
      places
    });
  }

  round(places) {
    new Round({
      digit: this,
      places
    });
  }

  add(digit) {
    new Add({ digits: [this, digit], addToFirst: true });
  }
}

export default Digit;