/* global beforeAll, expect */

import exactMath from './../../src/exact-math.js';

beforeAll(function () {
  this.exactMath = exactMath;
  this.incorrects = function ({ exclude = [], include = [] }) {
    const map = {
      positiveInteger: 10,
      positiveDecimal: 2.5,
      negativeInteger: -10,
      negativeDecimal: -2.5,
      nan: NaN,
      infinity: Infinity,
      negativeInfinity: -Infinity,
      array: [1, 2, 3],
      map: new Map(),
      string: 'hello',
      boolean: false,
      object: {},
      regExp: /hello/,
      date: new Date(),
      undefined: undefined,
      null: null,
      function: () => { },
      error: new Error()
    };

    if (include.length) {
      const newMap = [];
      for (let type of include) newMap.push(map[type]);
      return newMap;
    } else if (exclude.length) {
      for (let type of exclude) delete map[type];
      return Object.keys(map).map((a) => map[a]);
    }
  };

  this.loopMethods = function (methods) {
    const args = Array.prototype.slice.call(arguments, 1, arguments.length);
    const callback = args.pop();
    for (let m of methods) {
      let method = this.exactMath[m];
      let bound = args.length ? method.bind(null, ...args) : method;
      callback(bound);
    }
  };

  this.expectDefaults = function (samples) {
    return function (config) {
      const _config = (r) => config ? Object.assign({ returnString: r }, config) : r;
      for (let sample of samples.defaults) {
        expect(this.exactMath[sample.method](...sample.arguments, _config(true))).toBe(sample.result.string);
        expect(this.exactMath[sample.method](...sample.arguments, _config(false))).toBe(sample.result.number);
      }
    };
  };

  this.defaultExpect = function (scenarios) {
    return function (callback) {
      for (let sample of scenarios) {
        let err = sample.errorType === 'TypeError' ? new TypeError(sample.errorMessage) : new Error(sample.errorMessage);
        callback(sample.method, sample.values, err, sample.index);
      }
    };
  };

});