/* global describe, it, expect */

const joinArray = require('join-array');
const calculations = require('./data/algebra-samples.json');
const roundings = require('./data/rounding-samples.json');
const trimRoundings = require('./data/trim-rounding-samples.json');
const exponentiations = require('./data/exponentiations-samples.json');
const formulas = require('./data/formula-samples.json');
const invalidFormulas = require('./data/formula-invalid-samples.json');
const actions = require('./commons/commons.js').actions;
const config = require('./commons/commons.js').joinArrayConfig;

describe('When the module is executed', function () {
  for (let calc of calculations) {
    describe(`The result of ${actions[calc.mode]} for ${joinArray(config(calc.values))}`, function () {
      it(`should be equal to ${calc.result}`, function () {
        expect(this.exactMath[calc.mode](...calc.values, true))[calc.result === 'NaN' ? 'toBeNaN' : 'toBe'](calc.result);
      });
    });
  }
  for (let round of roundings) {
    describe(`The result of ${actions[round.mode]} for ${joinArray(config(round.values))}`, function () {
      it(`should be equal to ${round.result}`, function () {
        expect(this.exactMath[round.mode](...round.values, true)).toBe(round.result);
      });
    });
  }
  for (let round of trimRoundings) {
    describe(`The result of ${actions[round.mode]} for ${joinArray(config(round.values))}`, function () {
      it(`should be equal to ${round.result}`, function () {
        expect(this.exactMath[round.mode](...round.values, {returnString:true, trim: false})).toBe(round.result);
      });
    });
  }
  for (let pow of exponentiations) {
    describe(`The result of ${actions[pow.mode]} for ${joinArray(config(pow.values))}`, function () {
      it(`should be equal to ${pow.result}`, function () {
        expect(this.exactMath[pow.mode](...pow.values, true)).toBe(pow.result);
      });
    });
  }
  for (let formula of formulas) {
    describe(`The result of ${actions.formula} for '${formula.expression}'`, function () {
      it(`should be equal to ${formula.result}`, function () {
        expect(this.exactMath.formula(formula.expression, true)).toBe(formula.result);
      });
    });
  }
  for (let formula of invalidFormulas) {
    describe(`The result of ${actions.formula} for invalid expression '${formula.expression}'`, function () {
      it(`should throw an error that: '${formula.error}'`, function () {
        expect(() => this.exactMath.formula(formula.expression, true)).toThrowError(formula.error);
      });
    });
  }
});