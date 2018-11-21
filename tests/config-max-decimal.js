/* global describe, beforeAll, it, expect */

const joinArray = require('join-array');
const samples = require('./data/max-decimal-samples.json');
const actions = require('./commons/commons.js').actions;
const config = require('./commons/commons.js').joinArrayConfig;

describe('When the module is executed', function () {
  beforeAll(function () {
    this.incorrectTypes = this.incorrects({ exclude: ['positiveInteger'] });
    this.incorrectValues = this.incorrects({ include: ['nan', 'negativeInteger', 'negativeDecimal', 'positiveDecimal', 'infinity', 'negativeInfinity'] });
    this.expect = this.expectDefaults(samples);
  });
  describe('without the [Object] config object', function () {
    it("the default 'maxDecimal' value should be used for division results", function () {
      this.expectDefaults();
    });
  });
  describe('with the [Object] config object', function () {
    describe("that has not 'maxDecimal' property defined", function () {
      it("the default 'maxDecimal' value should be used for division results", function () {
        this.expectDefaults({});
      });
    });
    describe("that has 'maxDecimal' property defined", function () {
      describe('but of incorrect type', function () {
        it("the default 'maxDecimal' value should be used for division results", function () {
          for (let type of this.incorrectTypes) {
            this.expectDefaults({ maxDecimal: type });
          }
        });
      });
      describe('of correct [Number] type', function () {
        describe('but incorrect value', function () {
          it("the default 'maxDecimal' value should be used for division results", function () {
            for (let value of this.incorrectValues) {
              this.expectDefaults({ maxDecimal: value });
            }
          });
        });
        describe('and correct [Number] value', function () {
          describe("when the 'div' method is fired", function () {
            for (let sample of samples.division) {
              describe(`the result of ${actions['div']} for ${joinArray(config(sample.arguments))} and 'maxDecimal' property set to ${sample.maxDecimal}`, function () {
                it(`and 'returnString' set to true, should be equal to ${sample.result.string}`, function () {
                  expect(this.exactMath.div(...sample.arguments, { returnString: true, maxDecimal: sample.maxDecimal })).toBe(sample.result.string);
                });
                it(`and 'returnString' set to false, should be equal to ${sample.result.number}`, function () {
                  expect(this.exactMath.div(...sample.arguments, { returnString: false, maxDecimal: sample.maxDecimal })).toBe(sample.result.number);
                });
              });
            }
          });
          describe("when the 'formula' method is fired", function () {
            for (let sample of samples.formula) {
              describe(`and when the 'maxDecimal' property is set to ${sample.maxDecimal}`, function () {
                it(`the result of "${sample.formulaA}" formula should be the same as the result of "${sample.formulaB}"`, function () {
                  const config = { returnString: true, maxDecimal: sample.maxDecimal };
                  expect(this.exactMath.formula(sample.formulaA, config)).toBe(this.exactMath.formula(sample.formulaB, config));
                });
              });
            }
          });
          describe("when the other than 'div' and 'formula' method is fired", function () {
            for (let sample of samples.other) {
              describe(`the result of ${actions[sample.method]} for ${joinArray(config(sample.arguments))} and 'maxDecimal' property set to ${sample.maxDecimal}`, function () {
                it(`and 'returnString' set to true, should be equal to ${sample.result.string}`, function () {
                  expect(this.exactMath[sample.method](...sample.arguments, { returnString: true, maxDecimal: sample.maxDecimal })).toBe(sample.result.string);
                });
                it(`and 'returnString' set to false, should be equal to ${sample.result.number}`, function () {
                  expect(this.exactMath[sample.method](...sample.arguments, { returnString: false, maxDecimal: sample.maxDecimal })).toBe(sample.result.number);
                });
              });
            }
          });
        });
      });
    });
  });
});