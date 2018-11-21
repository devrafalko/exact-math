import type from 'of-type';
import Digit from './class-digit';
import Add from './class-add';
import Sub from './class-sub';
import Mul from './class-mul';
import Div from './class-div';
import Power from './class-power';
import Formula from './class-formula';
import { Round, Ceil, Floor } from './class-rounding';
import { isInteger } from './utils.js';

export default new class ExactMath {
  add() {
    return new _ExactMath(arguments, 'add')._algebra();
  }

  sub() {
    return new _ExactMath(arguments, 'sub')._algebra();
  }

  mul() {
    return new _ExactMath(arguments, 'mul')._algebra();
  }

  div() {
    return new _ExactMath(arguments, 'div')._algebra();
  }

  formula() {
    return new _ExactMath(arguments, 'formula')._formula();
  }

  round() {
    return new _ExactMath(arguments, 'round')._rounding();
  }

  ceil() {
    return new _ExactMath(arguments, 'ceil')._rounding();
  }

  floor() {
    return new _ExactMath(arguments, 'floor')._rounding();
  }

  pow() {
    return new _ExactMath(arguments, 'pow')._power();
  }
};

class _ExactMath {
  constructor(getArguments, mode) {
    this._data = {
      mode: mode,
      invalidReturn: NaN,
      values: Array.prototype.slice.call(getArguments),
      zeroValue: -1,
      digits: []
    };
    defineCallback.call(this);
    defineConfig.call(this);
    validateConfig.call(this);
    validateConfigChars.call(this);
    parseConfigChars.call(this);

    function defineCallback() {
      this._data.callback = type(this._data.values[this._data.values.length - 1], Function) ? this._data.values.pop() : null;
    }

    function defineConfig() {
      const last = this._data.values[this._data.values.length - 1];
      this._data.userConfig = type(last, Object) ? this._data.values.pop() : type(last, Boolean) ? { returnString: this._data.values.pop() } : {};
    }

    function validateConfig() {
      this._data.config = this.configDefaults;
      const configValidatorList = this.configValidatorList;
      const userConfig = this._data.userConfig;
      for (let userProperty in userConfig) {
        let userValue = userConfig[userProperty];
        if (!this._data.config.hasOwnProperty(userProperty) || !configValidatorList[userProperty](userValue)) continue;
        this._data.config[userProperty] = userValue;
      }
    }

    function validateConfigChars() {
      const initialChars = this.charsDefaults;
      const userConfig = this._data.userConfig;
      for (let userProperty in userConfig) {
        let userValue = userConfig[userProperty];
        if (!initialChars.hasOwnProperty(userProperty)) continue;
        initialChars[userProperty] = charValidation(userValue, initialChars[userProperty]);
      }
      delete this._data.userConfig;
      this._data.chars = initialChars;
    }

    function charValidation(value, map) {
      if (type(value, String)) {
        const userKey = value;
        if (!map.has(userKey)) return map;
        map.forEach((_, mapKey) => map.set(mapKey, userKey === mapKey));
      }
      if (type(value, Array)) {
        const userKeys = value;
        if (!userKeys.some((key) => map.has(key))) return map;
        map.forEach((_, mapKey) => map.set(mapKey, userKeys.some((key) => key === mapKey)));
      }
      return map;
    }

    function parseConfigChars() {
      for (let prop in this._data.chars) {
        let map = this._data.chars[prop];
        let chars = '';
        map.forEach((value, key) => {
          if (value) chars += key;
        });
        this._data.chars[prop] = `${chars}`;
      }
    }
  }

  get configValidatorList() {
    return {
      returnString: (val) => type(val, Boolean),
      eMinus: (val) => (this._data.callback || this._data.config.returnString) && type(val, Number) && val >= 0 && (isInteger(val) || val === Infinity),
      ePlus: (val) => (this._data.callback || this._data.config.returnString) && type(val, Number) && val >= 0 && (isInteger(val) || val === Infinity),
      maxDecimal: (val) => (this._data.mode === 'div' || this._data.mode === 'formula') && type(val, Number) && val >= 0 && isInteger(val),
      divideByZeroError: (val) => (this._data.mode === 'div' || this._data.mode === 'formula') && type(val, /(Boolean|.*Error|Function)/),
      invalidError: (val) => type(val, /(Boolean|.*Error|Function)/)
    };
  }

  get configDefaults() {
    return {
      returnString: false,
      eMinus: 7,
      ePlus: 21,
      maxDecimal: 17,
      divideByZeroError: false,
      invalidError: true
    };
  }

  get charsDefaults() {
    return {
      decimalChar: new Map([['.', true], [',', true]]),
      divChar: new Map([['/', true], [':', true], ['÷', true]]),
      mulChar: new Map([['*', true], ['x', true], ['⋅', true]])
    };
  }

  get errorDefaults() {
    return {
      algebraTwoValuesError: () => new Error('Set at least two [Number|String] values.'),
      invalidValueTypeError: (i) => new TypeError(`Incorrect argument [${i}]. The [Number|String] value is expected.`),
      nanValueError: (i) => new TypeError(`Incorrect argument [${i}]. The argument cannot be a NaN value.`),
      infinityValueError: (i) => new TypeError(`Incorrect argument [${i}]. The argument cannot be an Infinity or -Infinity value.`),
      invalidStringValueError: (i) => new Error(`Incorrect argument [${i}]. The [String] argument is not a valid numerical value.`),
      formulaOneParameterError: () => new Error('The one [String] formula argument is expected.'),
      roundingTwoArgumentsError: () => new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'),
      powerTwoArgumentsError: () => new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'),
      roundingInvalidIntegerError: () => new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.'),
      powerInvalidPositiveIntegerError: () => new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.'),
      divideByZeroError: (i) => new Error(`Incorrect argument [${i}]. The division by zero is not allowed.`)
    };
  }

  get invalidCallbackObject() {
    return (err) => ({ number: this._data.invalidReturn, string: this._data.invalidReturn, error: err });
  }

  get validStringNumber() {
    return new RegExp(`^([+-]?\\d*[${this._data.chars.decimalChar}]?\\d+(?:e[+-]\\d+)?)$`);
  }

  _validateValues(values) {
    const validStringNumber = this.validStringNumber;
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      if (type(value, String)) {

        if (value === 'Infinity' || value === '-Infinity') {
          const defaultError = this.errorDefaults.infinityValueError(i);
          return this._handleErrors({
            errorConfig: this._data.config.invalidError,
            errorDefault: defaultError,
            argumentSet: {
              error: defaultError,
              index: i,
              list: this._data.values,
              callback: this._data.callback || undefined
            }
          });
        }

        if (value === 'NaN') {
          const defaultError = this.errorDefaults.nanValueError(i);
          return this._handleErrors({
            errorConfig: this._data.config.invalidError,
            errorDefault: defaultError,
            argumentSet: {
              error: defaultError,
              index: i,
              list: this._data.values,
              callback: this._data.callback || undefined
            }
          });
        }

        if (!validStringNumber.test(value)) {
          const defaultError = this.errorDefaults.invalidStringValueError(i);
          return this._handleErrors({
            errorConfig: this._data.config.invalidError,
            errorDefault: defaultError,
            argumentSet: {
              error: defaultError,
              index: i,
              list: this._data.values,
              callback: this._data.callback || undefined
            }
          });
        }

      } else if (type(value, Number)) {

        if (value === Infinity || value === -Infinity) {
          const defaultError = this.errorDefaults.infinityValueError(i);
          return this._handleErrors({
            errorConfig: this._data.config.invalidError,
            errorDefault: defaultError,
            argumentSet: {
              error: defaultError,
              index: i,
              list: this._data.values,
              callback: this._data.callback || undefined
            }
          });
        }

        if (Number.isNaN(value)) {
          const defaultError = this.errorDefaults.nanValueError(i);
          return this._handleErrors({
            errorConfig: this._data.config.invalidError,
            errorDefault: defaultError,
            argumentSet: {
              error: defaultError,
              index: i,
              list: this._data.values,
              callback: this._data.callback || undefined
            }
          });
        }
      } else {
        const defaultError = this.errorDefaults.invalidValueTypeError(i);
        return this._handleErrors({
          errorConfig: this._data.config.invalidError,
          errorDefault: defaultError,
          argumentSet: {
            error: defaultError,
            index: i,
            list: this._data.values,
            callback: this._data.callback || undefined
          }
        });
      }
      findZero.call(this, value, i);
      const digit = new Digit(value);
      this._data.digits.push(digit);
    }

    function findZero(value, index) {
      if (this._data.zeroValue >= 0) return;
      if (Number(value) == 0) this._data.zeroValue = index;
    }

    return true;
  }

  _algebra() {
    if (this._data.values.length < 2) {
      const defaultError = this.errorDefaults.algebraTwoValuesError();
      this._handleErrors({
        errorConfig: this._data.config.invalidError,
        errorDefault: defaultError,
        argumentSet: {
          error: defaultError,
          index: undefined,
          list: this._data.values,
          callback: this._data.callback || undefined
        }
      });
      return this._data.invalidReturn;
    }

    if (!this._validateValues(this._data.values)) return this._data.invalidReturn;

    switch (this._data.mode) {
      case 'add':
        this._data.result = new Add({
          digits: this._data.digits
        });
        break;
      case 'sub':
        this._data.result = new Sub({
          digits: this._data.digits
        });
        break;
      case 'mul':
        this._data.result = new Mul({
          digits: this._data.digits,
          zeroValue: this._data.zeroValue
        });
        break;
      case 'div':
        var divisionError = false;
        this._data.result = new Div({
          digits: this._data.digits,
          maxDecimal: this._data.config.maxDecimal,
          divideByZeroError: this.errorDefaults.divideByZeroError,
          divisionError: (error, index) => {
            divisionError = true;
            const defaultError = error(index);
            this._handleErrors({
              errorConfig: this._data.config.divideByZeroError,
              errorDefault: defaultError,
              argumentSet: {
                error: defaultError,
                index: index,
                list: this._data.values,
                callback: this._data.callback || undefined
              }
            });
          }
        });
        if (divisionError) return this._data.invalidReturn;
        break;
    }
    return this._handleResult();
  }

  _formula() {
    if (this._data.values.length !== 1 || !type(this._data.values[0], String)) {
      const defaultError = this.errorDefaults.formulaOneParameterError();
      this._handleErrors({
        errorConfig: this._data.config.invalidError,
        errorDefault: defaultError,
        argumentSet: {
          error: defaultError,
          index: undefined,
          list: this._data.values,
          callback: this._data.callback || undefined
        }
      });
      return this._data.invalidReturn;
    }
    let invalidError = false, divisionError = false;
    this._data.result = new Formula({
      formula: this._data.values[0],
      chars: this._data.chars,
      maxDecimal: this._data.config.maxDecimal,
      zeroArgumentError: this.errorDefaults.divideByZero,
      divisionError: (error) => {
        divisionError = true;
        this._handleErrors({
          errorConfig: this._data.config.divideByZeroError,
          errorDefault: error,
          argumentSet: {
            error: error,
            index: undefined,
            list: this._data.values,
            callback: this._data.callback || undefined
          }
        });
      },
      invalidError: (error) => {
        invalidError = true;
        this._handleErrors({
          errorConfig: this._data.config.invalidError,
          errorDefault: error,
          argumentSet: {
            error: error,
            index: 0,
            list: this._data.values,
            callback: this._data.callback || undefined
          }
        });
      }
    });
    if (divisionError || invalidError) return this._data.invalidReturn;
    return this._handleResult();
  }

  _rounding() {
    const valuesLength = this._data.values.length;
    if (valuesLength === 0 || valuesLength > 2) {
      const defaultError = this.errorDefaults.roundingTwoArgumentsError();
      this._handleErrors({
        errorConfig: this._data.config.invalidError,
        errorDefault: defaultError,
        argumentSet: {
          error: defaultError,
          index: undefined,
          list: this._data.values,
          callback: this._data.callback || undefined
        }
      });
      return this._data.invalidReturn;
    }

    if (!this._validateValues([this._data.values[0]])) return this._data.invalidReturn;

    if (valuesLength === 1) {
      this._data.values.push(1);
    } else if (!(type(this._data.values[1], Number) && isInteger(this._data.values[1]))) {
      const defaultError = this.errorDefaults.roundingInvalidIntegerError();
      this._handleErrors({
        errorConfig: this._data.config.invalidError,
        errorDefault: defaultError,
        argumentSet: {
          error: defaultError,
          index: 1,
          list: this._data.values,
          callback: this._data.callback || undefined
        }
      });
      return this._data.invalidReturn;
    }

    const instanceData = {
      digit: this._data.digits[0],
      places: this._data.values[1]
    };

    switch (this._data.mode) {
      case 'round':
        this._data.result = new Round(instanceData);
        break;
      case 'ceil':
        this._data.result = new Ceil(instanceData);
        break;
      case 'floor':
        this._data.result = new Floor(instanceData);
        break;
    }
    return this._handleResult();
  }

  _power() {
    const valuesLength = this._data.values.length;
    if (valuesLength === 0 || valuesLength > 2) {
      const defaultError = this.errorDefaults.powerTwoArgumentsError();
      this._handleErrors({
        errorConfig: this._data.config.invalidError,
        errorDefault: defaultError,
        argumentSet: {
          error: defaultError,
          index: undefined,
          list: this._data.values,
          callback: this._data.callback || undefined
        }
      });
      return this._data.invalidReturn;
    }

    if (!this._validateValues([this._data.values[0]])) return this._data.invalidReturn;

    if (valuesLength === 1) {
      this._data.values.push(2);
    } else if (!(type(this._data.values[1], Number) && isInteger(this._data.values[1]) && this._data.values[1] >= 0)) {
      const defaultError = this.errorDefaults.powerInvalidPositiveIntegerError();
      this._handleErrors({
        errorConfig: this._data.config.invalidError,
        errorDefault: defaultError,
        argumentSet: {
          error: defaultError,
          index: 1,
          list: this._data.values,
          callback: this._data.callback || undefined
        }
      });
      return this._data.invalidReturn;
    }

    const instanceData = {
      digit: this._data.digits[0],
      power: this._data.values[1]
    };

    switch (this._data.mode) {
      case 'pow':
        this._data.result = new Power(instanceData);
        break;
    }
    return this._handleResult();
  }

  _handleErrors({ errorConfig, errorDefault, argumentSet = {} }) {
    const invalid = errorConfig;
    const globalCallback = this._data.callback;
    switch (true) {
      case type(invalid, Boolean):
        if (invalid === true && !globalCallback) throw errorDefault;
        if (globalCallback) globalCallback(this.invalidCallbackObject(invalid ? errorDefault : null));
        return false;
      case type(invalid, /.*Error/):
        if (!globalCallback) throw invalid;
        globalCallback(this.invalidCallbackObject(invalid));
        return false;
      case type(invalid, Function):
        this._data.invalidReturn = invalid(argumentSet);
        return false;
    }
  }

  _handleResult() {
    const config = this._data.config;
    if (config.returnString || this._data.callback) {
      this._data.result.setExponential(config.eMinus, config.ePlus);
    }

    const stringResult = this._data.result.toString();
    const callbackObject = {
      error: null,
      string: stringResult,
      number: Number(stringResult)
    };

    if (this._data.callback) this._data.callback(callbackObject);
    return callbackObject[config.returnString ? 'string' : 'number'];
  }
}