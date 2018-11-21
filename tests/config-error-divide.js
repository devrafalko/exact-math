/* global jasmine, describe, beforeAll, it, expect */

const scenarios = require('./data/zero-division-samples.json');
describe("When the module is executed with 'div' or 'formula' method and when the value is divided by 0 or 0 is divided by 0", function () {
  beforeAll(function () {
    this.incorrectTypes = this.incorrects({ exclude: ['boolean', 'error', 'function'] });
    this.expect = this.defaultExpect(scenarios);
  });

  describe('and when the [Object] config object is not defined', function () {
    it('the NaN should be returned as the result', function () {
      this.expect((method, values) => {
        expect(this.exactMath[method](...values)).toBeNaN();
      });
    });
    it('any error should be thrown', function () {
      this.expect((method, values) => {
        expect(() => this.exactMath[method](...values)).not.toThrowError();
      });
    });
    describe('and when the callback is defined', function () {
      it('the NaN should be returned as the result', function () {
        this.expect((method, values) => {
          expect(this.exactMath[method](...values, () => { })).toBeNaN();
        });
      });
      it('any error should be thrown', function () {
        this.expect((method, values) => {
          expect(() => this.exactMath[method](...values, () => { })).not.toThrowError();
        });
      });
      it("the null should be passed as the 'error' property in the [Object] parameter", function () {
        this.expect((method, values) => {
          const callback = jasmine.createSpy('callback');
          this.exactMath[method](...values, callback);
          expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
            error: null
          }));
        });
      });
      it("the NaN should be passed as the 'number' property in the [Object] parameter", function () {
        this.expect((method, values) => {
          const callback = jasmine.createSpy('callback');
          this.exactMath[method](...values, callback);
          expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
            number: NaN
          }));
        });
      });
      it("the NaN should be passed as the 'string' property in the [Object] parameter regardless of the 'returnString' setting", function () {
        this.expect((method, values) => {
          const callback = jasmine.createSpy('callback');
          this.exactMath[method](...values, true, callback);
          expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
            string: NaN
          }));
          this.exactMath[method](...values, false, callback);
          expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
            string: NaN
          }));
        });
      });
    });
  });
  describe('and when the [Object] config object is defined', function () {
    describe("and when the 'divideByZeroError' property is", function () {
      describe('not defined', function () {
        it('the NaN should be returned as the result', function () {
          this.expect((method, values) => {
            expect(this.exactMath[method](...values, {})).toBeNaN();
          });
        });
        it('any error should be thrown', function () {
          this.expect((method, values) => {
            expect(() => this.exactMath[method](...values, {})).not.toThrowError();
          });
        });
        describe('and when the callback is defined', function () {
          it('the NaN should be returned as the result', function () {
            this.expect((method, values) => {
              expect(this.exactMath[method](...values, {}, () => { })).toBeNaN();
            });
          });
          it('any error should be thrown', function () {
            this.expect((method, values) => {
              expect(() => this.exactMath[method](...values, {}, () => { })).not.toThrowError();
            });
          });
          it("the null should be passed as the 'error' property in the [Object] parameter", function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, {}, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                error: null
              }));
            });
          });
          it("the NaN should be passed as the 'number' property in the [Object] parameter", function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, {}, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                number: NaN
              }));
            });
          });
          it("the NaN should be passed as the 'string' property in the [Object] parameter regardless of the 'returnString' setting", function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, { returnString: true }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                string: NaN
              }));
              this.exactMath[method](...values, { returnString: false }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                string: NaN
              }));
            });
          });
        });
      });
      describe('defined, but with incorrect type', function () {
        it('the NaN should be returned as the result', function () {
          this.expect((method, values) => {
            for (let type of this.incorrectTypes) {
              const config = { divideByZeroError: type };
              expect(this.exactMath[method](...values, config)).toBeNaN();
            }
          });
        });
        it('any error should be thrown', function () {
          this.expect((method, values) => {
            for (let type of this.incorrectTypes) {
              const config = { divideByZeroError: type };
              expect(() => this.exactMath[method](...values, config)).not.toThrowError();
            }
          });
        });
        describe('and when the callback is defined', function () {
          it('the NaN should be returned as the result', function () {
            this.expect((method, values) => {
              for (let type of this.incorrectTypes) {
                const config = { divideByZeroError: type };
                expect(this.exactMath[method](...values, config, () => { })).toBeNaN();
              }
            });
          });
          it('any error should be thrown', function () {
            this.expect((method, values) => {
              for (let type of this.incorrectTypes) {
                const config = { divideByZeroError: type };
                expect(() => this.exactMath[method](...values, config, () => { })).not.toThrowError();
              }
            });
          });
          it("the null should be passed as the 'error' property in the [Object] parameter", function () {
            this.expect((method, values) => {
              for (let type of this.incorrectTypes) {
                const config = { divideByZeroError: type };
                const callback = jasmine.createSpy('callback');
                this.exactMath[method](...values, config, callback);
                expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                  error: null
                }));
              }
            });
          });
          it("the NaN should be passed as the 'number' property in the [Object] parameter", function () {
            this.expect((method, values) => {
              for (let type of this.incorrectTypes) {
                const config = { divideByZeroError: type };
                const callback = jasmine.createSpy('callback');
                this.exactMath[method](...values, config, callback);
                expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                  number: NaN
                }));
              }
            });
          });
          it("the NaN should be passed as the 'string' property in the [Object] parameter regardless of the 'returnString' setting", function () {
            this.expect((method, values) => {
              for (let type of this.incorrectTypes) {
                const callback = jasmine.createSpy('callback');
                this.exactMath[method](...values, { divideByZeroError: type, returnString: true }, callback);
                expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                  string: NaN
                }));
                this.exactMath[method](...values, { divideByZeroError: type, returnString: false }, callback);
                expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                  string: NaN
                }));
              }
            });
          });
        });
      });
      describe('defined as the [Boolean] false', function () {
        it('the NaN should be returned as the result', function () {
          this.expect((method, values) => {
            expect(this.exactMath[method](...values, { divideByZeroError: false })).toBeNaN();
          });
        });
        it('any error should be thrown', function () {
          this.expect((method, values) => {
            expect(() => this.exactMath[method](...values, { divideByZeroError: false })).not.toThrowError();
          });
        });
        describe('and when the callback is defined', function () {
          it('the NaN should be returned as the result', function () {
            this.expect((method, values) => {
              expect(this.exactMath[method](...values, { divideByZeroError: false }, () => { })).toBeNaN();
            });
          });
          it('any error should be thrown', function () {
            this.expect((method, values) => {
              expect(() => this.exactMath[method](...values, { divideByZeroError: false }, () => { })).not.toThrowError();
            });
          });
          it("the null should be passed as the 'error' property in the [Object] parameter", function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, { divideByZeroError: false }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                error: null
              }));
            });
          });
          it("the NaN should be passed as the 'number' property in the [Object] parameter", function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, { divideByZeroError: false }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                number: NaN
              }));
            });
          });
          it("the NaN should be passed as the 'string' property in the [Object] parameter regardless of the 'returnString' setting", function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, { divideByZeroError: false, returnString: true }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                string: NaN
              }));
              this.exactMath[method](...values, { divideByZeroError: false, returnString: false }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                string: NaN
              }));
            });
          });
        });
      });
      describe('defined as the [Boolean] true', function () {
        it('the default error should be thown', function () {
          this.expect((method, values, error) => {
            expect(() => this.exactMath[method](...values, { divideByZeroError: true })).toThrowError(error.constructor, error.message);
          });
        });
        describe('and when the callback is defined', function () {
          it('the NaN should be returned as the result', function () {
            this.expect((method, values) => {
              expect(this.exactMath[method](...values, { divideByZeroError: true }, () => { })).toBeNaN();
            });
          });
          it('any error should be thrown', function () {
            this.expect((method, values) => {
              expect(() => this.exactMath[method](...values, { divideByZeroError: true }, () => { })).not.toThrowError();
            });
          });
          it("the default error should be passed as the 'error' property in the [Object] parameter", function () {
            this.expect((method, values, error) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, { divideByZeroError: true }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                error: error
              }));
            });
          });
          it("the NaN should be passed as the 'number' property in the [Object] parameter", function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, { divideByZeroError: true }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                number: NaN
              }));
            });
          });
          it("the NaN should be passed as the 'string' property in the [Object] parameter regardless of the 'returnString' setting", function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, { divideByZeroError: true, returnString: true }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                string: NaN
              }));
              this.exactMath[method](...values, { divideByZeroError: true, returnString: false }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                string: NaN
              }));
            });
          });
        });
      });
      describe('defined as the [Error] error', function () {
        beforeAll(function () {
          this.userError = new Error('The user error sample.');
        });
        it('this error should be thrown rather than the default error', function () {
          this.expect((method, values) => {
            expect(() => this.exactMath[method](...values, { divideByZeroError: this.userError })).toThrowError(this.userError.constructor, this.userError.message);
          });
        });
        describe('and when the callback is defined', function () {
          it('the NaN should be returned as the result', function () {
            this.expect((method, values) => {
              expect(this.exactMath[method](...values, { divideByZeroError: this.userError }, () => { })).toBeNaN();
            });
          });
          it('any error should be thrown', function () {
            this.expect((method, values) => {
              expect(() => this.exactMath[method](...values, { divideByZeroError: this.userError }, () => { })).not.toThrowError();
            });
          });
          it("this error should be passed as the 'error' property in the [Object] parameter", function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, { divideByZeroError: this.userError }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                error: this.userError
              }));
            });
          });
          it("the NaN should be passed as the 'number' property in the [Object] parameter", function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, { divideByZeroError: this.userError }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                number: NaN
              }));
            });
          });
          it("the NaN should be passed as the 'string' property in the [Object] parameter regardless of the 'returnString' setting", function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, { divideByZeroError: this.userError, returnString: true }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                string: NaN
              }));
              this.exactMath[method](...values, { divideByZeroError: this.userError, returnString: false }, callback);
              expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                string: NaN
              }));
            });
          });
        });
      });
      describe('defined as the [Function] function', function () {
        beforeAll(function () {
          this.returnValue = 'return value';
          this.errorCallback = jasmine.createSpy('callback');
        });
        it('any error should be thrown', function () {
          this.expect((method, values) => {
            expect(() => this.exactMath[method](...values, { divideByZeroError: () => { } })).not.toThrowError();
          });
        });
        it('this function should be called', function () {
          this.expect((method, values) => {
            this.exactMath[method](...values, { divideByZeroError: this.errorCallback });
            expect(this.errorCallback).toHaveBeenCalledTimes(1);
            this.errorCallback.calls.reset();
          });
        });
        it('the function\'s returned value should be returned by the module', function () {
          this.errorCallback.and.returnValue(this.returnValue);
          this.expect((method, values) => {
            this.exactMath[method](...values, { divideByZeroError: this.errorCallback });
            expect(this.errorCallback.calls.mostRecent()).toEqual(jasmine.objectContaining({
              returnValue: this.returnValue
            }));
            this.errorCallback.calls.reset();
          });
        });
        it('the undefined value should be returned by the module if the function does not return any value', function () {
          this.errorCallback.and.stub();
          this.expect((method, values) => {
            this.exactMath[method](...values, { divideByZeroError: this.errorCallback });
            expect(this.errorCallback.calls.mostRecent()).toEqual(jasmine.objectContaining({
              returnValue: undefined
            }));
            this.errorCallback.calls.reset();
          });
        });
        it("the default error should be passed as the 'error' property in the [Object] parameter", function () {
          this.expect((method, values, error) => {
            this.exactMath[method](...values, { divideByZeroError: this.errorCallback });
            expect(this.errorCallback.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({
              error: error
            }));
            this.errorCallback.calls.reset();
          });
        });
        it("the [Number] index of the '0' value argument should be passed as the 'index' property in the [Object] parameter for the 'div' method and the undefined for the 'formula' method", function () {
          this.expect((method, values, error, index) => {
            this.exactMath[method](...values, { divideByZeroError: this.errorCallback });
            expect(this.errorCallback.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({
              index: index
            }));
            this.errorCallback.calls.reset();
          });
        });
        it("the [Array] list of all passed values should be passed as the 'list' property in the [Object] parameter for the 'div' method and the [Array] list with one [String] formula for the 'formula' method", function () {
          this.expect((method, values) => {
            this.exactMath[method](...values, { divideByZeroError: this.errorCallback });
            expect(this.errorCallback.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({
              list: values
            }));
            this.errorCallback.calls.reset();
          });
        });
        it("the undefined value should be passed as the 'callback' property in the [Object] parameter", function () {
          this.expect((method, values) => {
            this.exactMath[method](...values, { divideByZeroError: this.errorCallback });
            expect(this.errorCallback.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({
              callback: undefined
            }));
            this.errorCallback.calls.reset();
          });
        });
        describe('and when the callback is defined', function () {
          it('any error should be thrown', function () {
            this.expect((method, values) => {
              expect(() => this.exactMath[method](...values, { divideByZeroError: () => { } }, () => { })).not.toThrowError();
            });
          });
          it('the callback function should not be called', function () {
            this.expect((method, values) => {
              const callback = jasmine.createSpy('callback');
              this.exactMath[method](...values, { divideByZeroError: () => { } }, callback);
              expect(callback).not.toHaveBeenCalled();
            });
          });
          it('the function\'s returned value should be returned by the module', function () {
            this.errorCallback.and.returnValue(this.returnValue);
            this.expect((method, values) => {
              this.exactMath[method](...values, { divideByZeroError: this.errorCallback }, () => { });
              expect(this.errorCallback.calls.mostRecent()).toEqual(jasmine.objectContaining({
                returnValue: this.returnValue
              }));
              this.errorCallback.calls.reset();
            });
          });
          it('the undefined value should be returned by the module if the function does not return any value', function () {
            this.errorCallback.and.stub();
            this.expect((method, values) => {
              this.exactMath[method](...values, { divideByZeroError: this.errorCallback }, () => { });
              expect(this.errorCallback.calls.mostRecent()).toEqual(jasmine.objectContaining({
                returnValue: undefined
              }));
              this.errorCallback.calls.reset();
            });
          });
          it("the default error should be passed as the 'error' property in the [Object] parameter", function () {
            this.expect((method, values, error) => {
              this.exactMath[method](...values, { divideByZeroError: this.errorCallback }, () => { });
              expect(this.errorCallback.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({
                error: error
              }));
              this.errorCallback.calls.reset();
            });
          });
          it("the [Number] index of the '0' value argument should be passed as the 'index' property in the [Object] parameter for the 'div' method and the undefined for the 'formula' method", function () {
            this.expect((method, values, error, index) => {
              this.exactMath[method](...values, { divideByZeroError: this.errorCallback }, () => { });
              expect(this.errorCallback.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({
                index: index
              }));
              this.errorCallback.calls.reset();
            });
          });
          it("the [Array] list of all passed values should be passed as the 'list' property in the [Object] parameter for the 'div' method and the [Array] list with one [String] formula for the 'formula' method", function () {
            this.expect((method, values) => {
              this.exactMath[method](...values, { divideByZeroError: this.errorCallback }, () => { });
              expect(this.errorCallback.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({
                list: values
              }));
              this.errorCallback.calls.reset();
            });
          });
          it("the [Function] callback should be passed as the 'callback' property in the [Object] parameter", function () {
            this.expect((method, values) => {
              this.exactMath[method](...values, { divideByZeroError: this.errorCallback }, this.errorCallback);
              expect(this.errorCallback.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({
                callback: this.errorCallback
              }));
              this.errorCallback.calls.reset();
            });
          });
        });
      });
    });
  });
});