/* global jasmine, describe, beforeAll, it, expect */

describe('When the module is executed', function () {
  beforeAll(function () {
    this.incorrectTypes = this.incorrects({exclude:['boolean']});
    this._expect = function (config, type) {
      expect(this.exactMath.add(2, 2, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.add('10', '5.5', ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.sub(10, 2, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.sub('50', '5', ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.mul(6.66, 3.52, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.mul('2.12', '.055', ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.div(28, 2, 10, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.div('3.33', '.3', '.1', ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.round(0.000028, -5, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.round('0.123', -2, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.ceil(0.918273645, -4, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.ceil('0.999998991', 2, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.floor(123456.123456, 3, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.floor('9081726354.4536271809', 6, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.pow(0.1, 5, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.pow('0.1', 5678, ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.formula('0.055/(-5e-5)', ...config)).toEqual(jasmine.any(type));
      expect(this.exactMath.formula('(5)*(4)-(3/.1)+(.1*(5))', ...config)).toEqual(jasmine.any(type));
    };
    this.expectNumber = function (config) {
      this._expect(config, Number);
    };
    this.expectString = function (config) {
      this._expect(config, String);
    };
  });
  describe('without the config argument defined', function () {
    it('the [Number] calculation result is returned', function () {
      this.expectNumber([]);
    });
  });
  describe('with the [Boolean] config argument', function () {
    describe('that is set to true', function () {
      it('the [String] calculation result is returned', function () {
        this.expectString([true]);
      });
    });
    describe('that is set to false', function () {
      it('the [Number] calculation result is returned', function () {
        this.expectNumber([false]);
      });
    });
  });
  describe('with the [Object] config object', function () {
    describe("that has not 'returnString' property defined", function () {
      it('the [Number] calculation result is returned', function () {
        this.expectNumber([{}]);
      });
    });
    describe("that has 'returnString' property defined", function () {
      describe('but of incorrect type', function () {
        it('the [Number] calculation result is returned', function () {
          for (let type of this.incorrectTypes) {
            this.expectNumber([{ returnString: type }]);
          }
        });
      });
      describe('with the [Boolean] true value', function () {
        it('the [String] calculation result is returned', function () {
          this.expectString([{ returnString: true }]);
        });
      });
      describe('with the [Boolean] false value', function () {
        it('the [Number] calculation result is returned', function () {
          this.expectNumber([{ returnString: false }]);
        });
      });
    });
  });
});