import type from 'of-type';
import log from './class-log-controller.js';
import actions from './class-actions-controller.js';

class InputController {
  constructor({ id, logNumber, logLowerThan, logBiggerThan, logBetween, logInteger }) {
    this._node = document.getElementById(id);
    this._addListeners();
    this._valid = false;
    this._logs = { logNumber, logLowerThan, logBiggerThan, logBetween, logInteger };
  }

  get value() {
    const isNumber = !((/^\s*$/g).test(this._node.value) || Number.isNaN(Number(this._node.value)));
    return isNumber ? Number(this._node.value) : null;
  }

  get stringValue() {
    return this._node.value;
  }

  get valid() {
    return this._valid;
  }

  set valid(valid) {
    this._valid = valid;
    this._style();
  }

  reset() {
    this._node.value = '';
    this.valid = false;
    log.update([]);
    actions.update();
  }

  block() {
    this._node.setAttribute('disabled', 'disabled');
  }

  unblock() {
    this._node.removeAttribute('disabled');
  }

  _addListeners() {
    this._node.addEventListener('focus', () => this._validate());
    this._node.addEventListener('input', () => this._validate());
  }

  _validate() {
    this._logMessages = [];
    this._isNumber();
    this._isLowerThan();
    this._isBiggerThan();
    this._isBetween();
    this._isInteger();
    this.valid = !this._logMessages.length;
    log.update(this._logMessages);
    actions.update();
  }

  _style() {
    this._node.classList.add(this.valid ? 'valid' : 'invalid');
    this._node.classList.remove(this.valid ? 'invalid' : 'valid');
  }

  _isNumber() {
    const data = this._logs.logNumber;
    if (!type(data, String)) return;
    const invalid = !type(this.value, Number) || this.value === Infinity || this.value === -Infinity;
    const message = type(data, Function) ? data() : data;
    if (invalid) this._logMessages.push(message);
  }

  _isLowerThan() {
    const data = this._logs.logLowerThan;
    if (!type(data, Array)) return;
    const max = type(data[1], Function) ? data[1]() : data[1];
    const message = type(data[0], Function) ? data[0](max) : data;
    const invalid = type(max, Number) && type(this.value, Number) && this.value >= max;
    if (invalid) this._logMessages.push(message);
    if (type(max, Number) && type(data[2], Function)) data[2](!invalid);
  }

  _isBiggerThan() {
    const data = this._logs.logBiggerThan;
    if (!type(data, Array)) return;
    const min = type(data[1], Function) ? data[1]() : data[1];
    const message = type(data[0], Function) ? data[0](min) : data;
    const invalid = type(min, Number) && type(this.value, Number) && this.value <= min;
    if (invalid) this._logMessages.push(message);
    if (type(min, Number) && type(data[2], Function)) data[2](!invalid);
  }

  _isBetween() {
    const data = this._logs.logBetween;
    if (!type(data, Array)) return;
    const min = type(data[1], Number) ? data[1] : -Infinity;
    const max = type(data[2], Number) ? data[2] : Infinity;
    const message = type(data[0], Function) ? data[0](min, max) : data;
    const invalid = type(this.value, Number) && (this.value < min || this.value > max);
    if (invalid) this._logMessages.push(message);
  }

  _isInteger() {
    const data = this._logs.logInteger;
    if (!type(data, String)) return;
    const invalid = type(this.value, Number) && Math.round(this.value) !== this.value;
    if (invalid) this._logMessages.push(data);
  }

}

const inputs = {
  min: new InputController({
    id: 'button-min',
    logNumber: 'Enter the initial numerical value.',
    logLowerThan: [
      (/*max*/) => 'Enter the value lower than max value.',
      () => inputs.max.value,
      (valid) => inputs.max.valid = valid
    ]
  }),
  max: new InputController({
    id: 'button-max',
    logNumber: 'Enter the final numerical value.',
    logBiggerThan: [
      (/*min*/) => 'Enter the value higher than min value.',
      () => inputs.min.value,
      (valid) => inputs.min.valid = valid
    ]
  }),
  step: new InputController({
    id: 'button-step',
    logNumber: 'Enter the step numerical value.',
    logBiggerThan: [
      (/*min*/) => 'Enter the positive value.',
      0,
      (valid) => inputs.step.valid = valid
    ]
  }),
  number: new InputController({
    id: 'button-number',
    logNumber: 'Enter the number of counting combinations.',
    logBetween: [(min, max) => `Enter the value between ${min} and ${max}.`, 2, 10],
    logInteger: 'Enter the integer value.'
  })
};

export default inputs;