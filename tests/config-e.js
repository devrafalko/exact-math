/* global describe, beforeAll, it, expect */

const joinArray = require('join-array');
const samples = require('./data/exponential-samples.json');
const actions = require('./commons/commons.js').actions;
const config = require('./commons/commons.js').joinArrayConfig;

describe('When the module is executed', function () {
  beforeAll(function () {
    this.incorrectTypes = this.incorrects({ exclude: ['positiveInteger', 'infinity'] });
    this.incorrectValues = this.incorrects({ include: ['nan', 'negativeInteger', 'negativeDecimal', 'positiveDecimal', 'negativeInfinity'] });
    this.expect = this.expectDefaults(samples);
  });
  describe('without the [Object] config object', function () {
    it("the default 'ePlus' and 'eMinus' values should be used", function () {
      this.expect();
    });
  });
  describe('with the [Object] config object', function () {
    describe("that has not 'ePlus' and 'eMinus' property defined", function () {
      it("the default 'ePlus' and 'eMinus' values should be used", function () {
        this.expect({});
      });
    });
    describe("that has 'ePlus' and 'eMinus' property defined", function () {
      describe('but of incorrect type', function () {
        it("the default 'ePlus' and 'eMinus' values should be used", function () {
          for (let type of this.incorrectTypes) {
            this.expect({ ePlus: type, eMinus: type });
          }
        });
      });
      describe('of correct [Number] type', function () {
        describe('but incorrect value', function () {
          it("the default 'ePlus' and 'eMinus' values should be used", function () {
            for (let value of this.incorrectValues) {
              this.expect({ ePlus: value, eMinus: value });
            }
          });
        });
        describe('and correct [Number] value', function () {
          for (let item of samples.ePlus) {
            describe(`The result of ${actions[item.method]} for ${joinArray(config(item.arguments))} and 'ePlus' property set to ${item.exponential}`, function () {
              it(`and 'returnString' set to true, should be equal to ${item.result.string}`, function () {
                expect(this.exactMath[item.method](...item.arguments, { returnString: true, ePlus: item.exponential })).toBe(item.result.string);
              });
              it(`and 'returnString' set to false, should be equal to ${item.result.number}`, function () {
                expect(this.exactMath[item.method](...item.arguments, { returnString: false, ePlus: item.exponential })).toBe(item.result.number);
              });
            });
          }
          for (let item of samples.eMinus) {
            describe(`The result of ${actions[item.method]} for ${joinArray(config(item.arguments))} and 'eMinus' property set to ${item.exponential}`, function () {
              it(`and 'returnString' set to true, should be equal to ${item.result.string}`, function () {
                expect(this.exactMath[item.method](...item.arguments, { returnString: true, eMinus: item.exponential })).toBe(item.result.string);
              });
              it(`and 'returnString' set to false, should be equal to ${item.result.number}`, function () {
                expect(this.exactMath[item.method](...item.arguments, { returnString: false, eMinus: item.exponential })).toBe(item.result.number);
              });
            });
          }
          for (let item of samples.infinity) {
            describe(`The result of ${actions[item.method]} for ${joinArray(config(item.arguments))} and 'eMinus' property set to Infinity`, function () {
              it(`and 'returnString' set to true, should be equal to ${item.result.string}`, function () {
                expect(this.exactMath[item.method](...item.arguments, { returnString: true, eMinus: Infinity, ePlus: Infinity })).toBe(item.result.string);
              });
              it(`and 'returnString' set to false, should be equal to ${item.result.number}`, function () {
                expect(this.exactMath[item.method](...item.arguments, { returnString: false, eMinus: Infinity, ePlus: Infinity })).toBe(item.result.number);
              });
            });
          }
        });
      });
    });
  });
});