/* global exactMath */
import inputs from './class-input-controller.js';
import operation from './class-operation-controller.js';
import print from './class-print-controller.js';
import log from './class-log-controller.js';
import actions from './class-actions-controller.js';

class Compute {
  constructor({ intervalTime }) {
    this._intervalTime = intervalTime;
    this._data = {};
    this._state = {};
  }

  initiate() {
    for (let property in inputs) this._data[property] = inputs[property].stringValue;
    print.clear();
    this._data.operation = operation.value;
    this._defineSign();
    this._createStepMap();
    this._initiateState();
    this.continue();
  }

  stop() {
    this._state.stopped = true;
  }

  continue() {
    this._state.stopped = false;
    this._loopSteps((values, iter, total) => {
      const formula = this._printFormula(values);
      const jsResult = this._computeJS(values);
      const libResult = this._computeLib(formula);
      if (String(jsResult) !== libResult) this._state.errorOperations++;
      this._printResults({ formula, jsResult, libResult });
      this._printLogs({ iter, total, errorOperations: this._state.errorOperations });

      if (iter === total) {
        actions.stop();
        actions.block(actions.nodeRun);
      }
    });
  }

  _defineSign() {
    const map = {
      add: ' + ',
      mul: ' * ',
      sub: ' - ',
      div: ' / '
    };
    this._data.sign = map[this._data.operation];
  }

  _createStepMap() {
    this._data.stepMap = [];
    let currentStep = this._data.min;
    while (Number(currentStep) <= Number(this._data.max)) {
      this._data.stepMap.push(currentStep);
      currentStep = exactMath.add(currentStep, this._data.step, true);
    }
  }

  _initiateState() {
    this._state = {
      stopped: false,
      errorOperations: 0,
      collection: [],
      iter: 0,
      total: Math.pow(this._data.stepMap.length, this._data.number)
    };
    this._state.collection.length = this._data.number;
    this._state.collection.fill(0);
  }

  _loopSteps(callback) {
    const interval = setInterval(() => {
      if (this._state.stopped) return clearInterval(interval);
      let currentItem = this._data.number - 1;
      callback(this._valuesCollection(this._state.collection), ++this._state.iter, this._state.total);
      while (this._state.collection[currentItem] === this._data.stepMap.length - 1) {
        currentItem--;
        this._state.collection.fill(0, currentItem + 1);
        if (currentItem < 0) {
          clearInterval(interval);
          break;
        }
      }
      this._state.collection[currentItem]++;
    }, this._intervalTime);
  }

  _valuesCollection(collection) {
    const values = [];
    for (let iter of collection) values.push(this._data.stepMap[iter]);
    return values;
  }

  _printFormula(values) {
    let formula = '';
    for (let i = 0; i < values.length; i++) {
      formula += values[i];
      if (i < values.length - 1) formula += this._data.sign;
    }
    return formula;
  }

  _computeJS(values) {
    return values.reduce((a, b) => {
      const total = Number(a);
      const next = Number(b);
      switch (this._data.operation) {
        case 'add':
          return total + next;
        case 'mul':
          return total * next;
        case 'sub':
          return total - next;
        case 'div':
          return total / next;
      }
    });

  }

  _computeLib(formula) {
    return exactMath.formula(formula, true);
  }

  _printResults({ formula, jsResult, libResult }) {
    print.add([
      `${formula} = ${String(jsResult)}`,
      `${formula} = ${libResult}`
    ]);
  }

  _printLogs({ iter, total, errorOperations }) {
    const progress = `Total: ${Math.round((iter / total) * 100)}%`;
    const done = `Operations done: ${iter}`;
    const differences = `Differences: ${errorOperations}`;
    log.update([progress, done, differences]);
  }

}

export default new Compute({
  intervalTime: 10
});