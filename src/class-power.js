import Digit from './class-digit';
import Mul from './class-mul';

class Power {
  constructor({ digit, power }) {
    this.digit = digit;
    this.power = power;
    this.digitPower = new Digit(this.power);

    if (this.digitPower.equalsZero) return new Digit({
      before: [1],
      after: [],
      e: 0,
      negative: false
    });

    if (this.digit.equalsZero) return new Digit({
      before: [0],
      after: [],
      e: 0,
      negative: false
    });

    if (this.digit.equalsTenths) {
      this.digit.setExponential(1, 1);
      this.digit.e *= this.power;
      this.digit.removeE();
      return this.digit;
    }

    return new Mul({
      digits: [this.digit],
      power: this.power
    });

  }

}

export default Power;