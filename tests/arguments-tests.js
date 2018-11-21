/* global jasmine, describe, beforeAll, beforeEach, it, expect */

describe('When the module is executed', function () {
  beforeEach(function () {
    this.spyCallback = jasmine.createSpy('spyCallback');
  });

  describe('with the "add", "sub", "mul" or "div" method and the following arguments configurations', function () {
    beforeAll(function () {
      this.methods = ['add', 'sub', 'mul', 'div'];
      this.loop = this.loopMethods.bind(this, this.methods);
    });
    describe('<without any arguments>', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop((e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[Object]', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop({}, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[Boolean]', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop(false, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
        this.loop(true, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop(this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop({}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop(true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[String]', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop('1', (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[Number]', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop(1, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[Array|RegExp|Date|null]', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop([], (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
        this.loop(/hello/, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
        this.loop(new Date(), (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
        this.loop(null, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[String], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop('1', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[Number], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop(1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[String], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop('1', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[Number], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop(1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[String], [Function], [Object]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Function], [Object]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Function], [Boolean]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Object]', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop('1', {}, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[Number], [Object]', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop(1, {}, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[String], [Boolean]', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop('1', true, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[Number], [Boolean]', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop(1, true, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[String], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop('1', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[Number], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop(1, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop([], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/\d/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop([], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/\d/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Object]', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop([], {}, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
        this.loop(/\d/, {}, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
        this.loop(new Date(), {}, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
        this.loop(null, {}, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Boolean]', function () {
      it('it should throw an error, that at least two arguments with numerical values are expected', function () {
        this.loop([], true, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
        this.loop(/\d/, false, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
        this.loop(new Date(), true, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
        this.loop(null, false, (e) => expect(e).toThrowError(Error, 'Set at least two [Number|String] values.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that at least two arguments with numerical values are expected', function () {
        this.loop([], this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/\d/, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Set at least two [Number|String] values.') }));
      });
    });
    describe('[String], [String]', function () {
      it('it should not throw an error, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', '1', (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [String], [String], [String], [String]', function () {
      it('it should not throw an error, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', '2', '3', '4', '5', (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Number]', function () {
      it('it should not throw an error, because at least two arguments with numerical values have been passed', function () {
        this.loop(1, 1, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Number], [Number], [Number], [Number]', function () {
      it('it should not throw an error, because at least two arguments with numerical values have been passed', function () {
        this.loop(1, 2, 3, 4, 5, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Number], [String], [Number]', function () {
      it('it should not throw an error, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', 1, '2', 2, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [String], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', '2', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [String], [String], [String], [String], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', '2', '3', '4', '5', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop(1, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Number], [Number], [Number], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop(1, 2, 3, 4, 5, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Number], [String], [Number], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', 1, '2', 2, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [String], [Function], [Object]', function () {
      it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
        this.loop('1', '2', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [String], [String], [String], [String], [Function], [Object]', function () {
      it('it should throw an error, that the sixth argument is incorrect - it expects a numerical value', function () {
        this.loop('1', '2', '3', '4', '5', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [5]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
        this.loop(1, 2, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Number], [Number], [Number], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the sixth argument is incorrect - it expects a numerical value', function () {
        this.loop(1, 2, 3, 4, 5, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [5]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Number], [String], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the fifth argument is incorrect - it expects a numerical value', function () {
        this.loop('1', 2, '3', 4, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [4]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [String], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', '2', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', '2', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [String], [String], [String], [String], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', '2', '3', '4', '5', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', '2', '3', '4', '5', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop(1, 2, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, 2, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Number], [Number], [Number], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop(1, 2, 3, 4, 5, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, 2, 3, 4, 5, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Number], [String], [Number], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', 2, '3', 4, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', 2, '3', 4, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [String], [Function], [Boolean]', function () {
      it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
        this.loop('1', '2', function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
        this.loop('1', '2', function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [String], [String], [String], [String], [Function], [Boolean]', function () {
      it('it should throw an error, that the sixth argument is incorrect - it expects a numerical value', function () {
        this.loop('1', '2', '3', '4', '5', function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [5]. The [Number|String] value is expected.'));
        this.loop('1', '2', '3', '4', '5', function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [5]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
        this.loop(1, 2, function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
        this.loop(1, 2, function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Number], [Number], [Number], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the sixth argument is incorrect - it expects a numerical value', function () {
        this.loop(1, 2, 3, 4, 5, function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [5]. The [Number|String] value is expected.'));
        this.loop(1, 2, 3, 4, 5, function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [5]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Number], [String], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the fifth argument is incorrect - it expects a numerical value', function () {
        this.loop('1', 2, '3', 4, function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [4]. The [Number|String] value is expected.'));
        this.loop('1', 2, '3', 4, function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [4]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [String], [Boolean]', function () {
      it('it should not throw an error, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', '2', true, (e) => expect(e).not.toThrowError());
        this.loop('1', '2', false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [String], [String], [String], [String], [Boolean]', function () {
      it('it should not throw an error, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', '2', '3', '4', '5', true, (e) => expect(e).not.toThrowError());
        this.loop('1', '2', '3', '4', '5', false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Number], [Boolean]', function () {
      it('it should not throw an error, because at least two arguments with numerical values have been passed', function () {
        this.loop(1, 2, true, (e) => expect(e).not.toThrowError());
        this.loop(1, 2, false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Number], [Number], [Number], [Number], [Boolean]', function () {
      it('it should not throw an error, because at least two arguments with numerical values have been passed', function () {
        this.loop(1, 2, 3, 4, 5, true, (e) => expect(e).not.toThrowError());
        this.loop(1, 2, 3, 4, 5, false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Number], [String], [Number], [Boolean]', function () {
      it('it should not throw an error, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', 2, '3', 4, true, (e) => expect(e).not.toThrowError());
        this.loop('1', 2, '3', 4, false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [String], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', '2', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [String], [String], [String], [String], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', '2', '3', '4', '5', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop(1, 2, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Number], [Number], [Number], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop(1, 2, 3, 4, 5, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Number], [String], [Number], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because at least two arguments with numerical values have been passed', function () {
        this.loop('1', 2, '3', 4, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Array|RegExp|Date|null]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [String], [String], [String]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], '2', '3', '4', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, '2', '3', '4', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), '2', '3', '4', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, '2', '3', '4', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, [], (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, /hello/, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, new Date(), (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, null, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Number], [Number], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, [], 2, 3, 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, /hello/, 2, 3, 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, new Date(), 2, 3, 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, null, 2, 3, 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [String], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [String], [String], [String], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], '2', '3', '4', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, '2', '3', '4', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), '2', '3', '4', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, '2', '3', '4', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, [], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Number], [Number], [Number], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, [], 2, 3, 4, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, 2, 3, 4, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), 2, 3, 4, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, 2, 3, 4, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [String], [Number], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], '2', 3, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, '2', 3, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), '2', 3, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, '2', 3, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [String], [String], [String], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], '2', '3', '4', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, '2', '3', '4', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), '2', '3', '4', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, '2', '3', '4', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, [], true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Number], [Number], [Number], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, [], 2, 3, 4, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, 2, 3, 4, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), 2, 3, 4, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, 2, 3, 4, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [String], [Number], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], '2', 3, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, '2', 3, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), '2', 3, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, '2', 3, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Boolean]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [String], [String], [String], [Boolean]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], '2', '3', '4', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, '2', '3', '4', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), '2', '3', '4', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, '2', '3', '4', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Boolean]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, [], true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, /hello/, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, new Date(), true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, null, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Number], [Number], [Number], [Boolean]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, [], 2, 3, 4, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, /hello/, 2, 3, 4, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, new Date(), 2, 3, 4, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, null, 2, 3, 4, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [String], [Number], [Boolean]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], '2', 3, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, '2', 3, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), '2', 3, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, '2', 3, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [String], [String], [String], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], '2', '3', '4', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, '2', '3', '4', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), '2', '3', '4', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, '2', '3', '4', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, [], this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Number], [Number], [Number], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, [], 2, 3, 4, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, 2, 3, 4, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), 2, 3, 4, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, 2, 3, 4, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [String], [Number], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], '2', 3, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, '2', 3, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), '2', 3, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, '2', 3, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number|String] value is expected.') }));
      });
    });
    describe('[String], [Object], [String]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', {}, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Boolean], [String]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', true, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', false, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Function], [String]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', function () { }, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Object], [Function], [String]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', {}, function () { }, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Function], [Object], [String]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', function () { }, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Boolean], [Function], [String]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', true, function () { }, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', false, function () { }, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Function], [Boolean], [String]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', function () { }, true, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', function () { }, false, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Object], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, {}, 2, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Boolean], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, true, 2, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, false, 2, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Function], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, function () { }, 2, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Object], [Function], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, {}, function () { }, 2, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Function], [Object], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, function () { }, {}, 2, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Boolean], [Function], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, true, function () { }, 2, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, false, function () { }, 2, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[Number], [Function], [Boolean], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop(1, function () { }, true, 2, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop(1, function () { }, false, 2, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Number], [Object], [String], [Number]', function () {
      it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
        this.loop('1', 2, {}, '3', 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Number], [Boolean], [String], [Number]', function () {
      it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
        this.loop('1', 2, true, '3', 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
        this.loop('1', 2, false, '3', 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Number], [Function], [String], [Number]', function () {
      it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
        this.loop('1', 2, function () { }, '3', 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Number], [Object], [Function], [String], [Number]', function () {
      it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
        this.loop('1', 2, {}, function () { }, '3', 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Number], [Function], [Object], [String], [Number]', function () {
      it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
        this.loop('1', 2, function () { }, {}, '3', 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Number], [Boolean], [Function], [String], [Number]', function () {
      it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
        this.loop('1', 2, true, function () { }, '3', 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
        this.loop('1', 2, false, function () { }, '3', 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Number], [Function], [Boolean], [String], [Number]', function () {
      it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
        this.loop('1', 2, function () { }, true, '3', 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
        this.loop('1', 2, function () { }, false, '3', 4, (e) => expect(e).toThrowError(Error, 'Incorrect argument [2]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Object], [String], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], {}, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, {}, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), {}, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, {}, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Boolean], [String], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], true, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, false, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), true, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, false, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Function], [String], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Object], [Function], [String], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], {}, function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, {}, function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), {}, function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, {}, function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Function], [Object], [String], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], function () { }, {}, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, function () { }, {}, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), function () { }, {}, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, function () { }, {}, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Boolean], [Function], [String], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], true, function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, false, function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), true, function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, false, function () { }, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Function], [Boolean], [String], [Number]', function () {
      it('it should throw an error, that the second argument is incorrect - it expects a numerical value', function () {
        this.loop('1', [], function () { }, true, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', /hello/, function () { }, false, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', new Date(), function () { }, true, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
        this.loop('1', null, function () { }, false, '2', 3, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [String], [Number], [Number], [Object]', function () {
      describe('where at least one of the numerical arguments', function () {
        describe('is [Number] NaN or [String] "NaN"', function () {
          it('it should throw an error, that the argument cannot be a NaN', function () {
            this.loop('1', '2', 3, NaN, {}, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [3]. The argument cannot be a NaN value.'));
          });
        });
        describe('is [Number] Infinity or [Number] -Infinity or [String] "Infinity" or [String] "-Infinity"', function () {
          it('it should throw an error, that the argument cannot be an Infinity', function () {
            this.loop('1', '2', Infinity, 4, {}, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [2]. The argument cannot be an Infinity or -Infinity value.'));
            this.loop('1', '2', 3, -Infinity, {}, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [3]. The argument cannot be an Infinity or -Infinity value.'));
            this.loop('Infinity', '2', 3, 4, {}, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
            this.loop('1', '-Infinity', 3, 4, {}, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [1]. The argument cannot be an Infinity or -Infinity value.'));
          });
        });
        describe('is [String] incorrect numerical value', function () {
          it('it should throw an error, that the [String] numerical value is invalid', function () {
            this.loop('1a', '2', 3, 4, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [String] argument is not a valid numerical value.'));
            this.loop('1', '2:3', 3, 4, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [String] argument is not a valid numerical value.'));
          });
        });
      });
    });
    describe('[String], [String], [Number], [Number], [Boolean]', function () {
      describe('where at least one of the numerical arguments', function () {
        describe('is [Number] NaN or [String] "NaN"', function () {
          it('it should throw an error, that the argument cannot be a NaN', function () {
            this.loop('1', '2', 3, NaN, true, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [3]. The argument cannot be a NaN value.'));
          });
        });
        describe('is [Number] Infinity or [Number] -Infinity or [String] "Infinity" or [String] "-Infinity"', function () {
          it('it should throw an error, that the argument cannot be an Infinity', function () {
            this.loop('1', '2', Infinity, 4, true, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [2]. The argument cannot be an Infinity or -Infinity value.'));
            this.loop('1', '2', 3, -Infinity, false, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [3]. The argument cannot be an Infinity or -Infinity value.'));
            this.loop('Infinity', '2', 3, 4, true, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
            this.loop('1', '-Infinity', 3, 4, false, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [1]. The argument cannot be an Infinity or -Infinity value.'));
          });
        });
        describe('is [String] incorrect numerical value', function () {
          it('it should throw an error, that the [String] numerical value is invalid', function () {
            this.loop('1a', '2', 3, 4, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [String] argument is not a valid numerical value.'));
            this.loop('1', '2 3', 3, 4, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [String] argument is not a valid numerical value.'));
          });
        });
      });
    });
    describe('[String], [String], [Number], [Number], [Function]', function () {
      describe('where at least one of the numerical arguments', function () {
        describe('is [Number] NaN or [String] "NaN"', function () {
          it('it should call the callback function rather than throwing an error, that the argument cannot be a NaN', function () {
            this.loop('1', '2', 3, NaN, this.spyCallback, (e) => expect(e).not.toThrowError());
            expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [3]. The argument cannot be a NaN value.') }));
          });
        });
        describe('is [Number] Infinity or [Number] -Infinity or [String] "Infinity" or [String] "-Infinity"', function () {
          it('it should call the callback function rather than throwing an error, that the argument cannot be an Infinity', function () {
            this.loop('1', '2', Infinity, 4, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('1', '2', 3, -Infinity, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('Infinity', '2', 3, 4, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('1', '-Infinity', 3, 4, this.spyCallback, (e) => expect(e).not.toThrowError());
            expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [1]. The argument cannot be an Infinity or -Infinity value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [2]. The argument cannot be an Infinity or -Infinity value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [3]. The argument cannot be an Infinity or -Infinity value.') }));
          });
        });
        describe('is [String] incorrect numerical value', function () {
          it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
            this.loop('1a', '2', 3, 4, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('1', '2@3', 3, 4, this.spyCallback, (e) => expect(e).not.toThrowError());
            expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [String] argument is not a valid numerical value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [String] argument is not a valid numerical value.') }));
          });
        });
      });
    });
    describe('[String], [String], [Number], [Number], [Object], [Function]', function () {
      describe('where at least one of the numerical arguments', function () {
        describe('is [Number] NaN or [String] "NaN"', function () {
          it('it should call the callback function rather than throwing an error, that the argument cannot be a NaN', function () {
            this.loop('1', '2', 3, NaN, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
            expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [3]. The argument cannot be a NaN value.') }));
          });
        });
        describe('is [Number] Infinity or [Number] -Infinity or [String] "Infinity" or [String] "-Infinity"', function () {
          it('it should call the callback function rather than throwing an error, that the argument cannot be an Infinity', function () {
            this.loop('1', '2', Infinity, 4, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('1', '2', 3, -Infinity, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('Infinity', '2', 3, 4, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('1', 'Infinity', 3, 4, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
            expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [1]. The argument cannot be an Infinity or -Infinity value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [2]. The argument cannot be an Infinity or -Infinity value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [3]. The argument cannot be an Infinity or -Infinity value.') }));
          });
        });
        describe('is [String] incorrect numerical value', function () {
          it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
            this.loop('1a', '2', 3, 4, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('1', '2&3', 3, 4, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
            expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [String] argument is not a valid numerical value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [String] argument is not a valid numerical value.') }));
          });
        });
      });
    });
    describe('[String], [String], [Number], [Number], [Boolean], [Function]', function () {
      describe('where at least one of the numerical arguments', function () {
        describe('is [Number] NaN or [String] "NaN"', function () {
          it('it should call the callback function rather than throwing an error, that the argument cannot be a NaN', function () {
            this.loop('1', '2', 3, NaN, true, this.spyCallback, (e) => expect(e).not.toThrowError());
            expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [3]. The argument cannot be a NaN value.') }));
          });
        });
        describe('is [Number] Infinity or [Number] -Infinity or [String] "Infinity" or [String] "-Infinity"', function () {
          it('it should call the callback function rather than throwing an error, that the argument cannot be an Infinity', function () {
            this.loop('1', '2', Infinity, 4, true, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('1', '2', 3, -Infinity, false, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('Infinity', '2', 3, 4, true, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('1', 'Infinity', 3, 4, false, this.spyCallback, (e) => expect(e).not.toThrowError());
            expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [1]. The argument cannot be an Infinity or -Infinity value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [2]. The argument cannot be an Infinity or -Infinity value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new TypeError('Incorrect argument [3]. The argument cannot be an Infinity or -Infinity value.') }));
          });
        });
        describe('is [String] incorrect numerical value', function () {
          it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
            this.loop('1a', '2', 3, 4, true, this.spyCallback, (e) => expect(e).not.toThrowError());
            this.loop('1', '2`3', 3, 4, false, this.spyCallback, (e) => expect(e).not.toThrowError());
            expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [String] argument is not a valid numerical value.') }));
            expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [String] argument is not a valid numerical value.') }));
          });
        });
      });
    });
    describe('[String], [String], [Array], [Number], [Object]', function () {
      describe('where at least one of the numerical arguments', function () {
        describe('is [Number] NaN or [String] "NaN"', function () {
          it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
            this.loop('1', '2', [], NaN, {}, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [2]. The [Number|String] value is expected.'));
          });
        });
        describe('is [Number] Infinity or [Number] -Infinity or [String] "Infinity" or [String] "-Infinity"', function () {
          it('it should throw an error, that the third argument is incorrect - it expects a numerical value', function () {
            this.loop('1', '2', [], Infinity, {}, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [2]. The [Number|String] value is expected.'));
            this.loop('1', '2', [], -Infinity, {}, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [2]. The [Number|String] value is expected.'));
          });
          it('it should throw an error, that the argument cannot be an Infinity', function () {
            this.loop('Infinity', '2', [], 3, {}, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
            this.loop('1', 'Infinity', [], 3, {}, (e) => expect(e).toThrowError(TypeError, 'Incorrect argument [1]. The argument cannot be an Infinity or -Infinity value.'));
          });
        });
        describe('is [String] incorrect numerical value', function () {
          it('it should throw an error, that the [String] numerical value is invalid', function () {
            this.loop('1a', '2', [], 3, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [String] argument is not a valid numerical value.'));
          });
          it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
            this.loop([], '2^3', 3, 4, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
          });
        });
      });
    });
  });
  describe('with the "formula" method and the following arguments configurations', function () {
    beforeAll(function () {
      this.methods = ['formula'];
      this.loop = this.loopMethods.bind(this, this.methods);
    });
    describe('<without any arguments>', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop((e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Object]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop({}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Boolean]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop(this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop({}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop(true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[Function], [Object]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(function () { }, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Function], [Boolean]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(function () { }, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(function () { }, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Number|Array|RegExp|Date|null]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(10, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [Object]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(10, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [Boolean]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(10, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(10, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop(10, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 5);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop(10, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 5);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop(10, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(10, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 10);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [Function], [Object]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(10, function () { }, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], function () { }, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, function () { }, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), function () { }, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, function () { }, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [Function], [Boolean]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(10, function () { }, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(10, function () { }, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], function () { }, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], function () { }, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, function () { }, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, function () { }, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), function () { }, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), function () { }, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, function () { }, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, function () { }, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [String]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(10, '5', (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], '5', (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, '5', (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), '5', (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, '5', (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [String], [Object]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(10, '5', {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], '5', {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, '5', {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), '5', {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, '5', {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [String], [Boolean]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(10, '5', true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(10, '5', false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], '5', true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], '5', false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, '5', true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, '5', false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), '5', true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), '5', false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, '5', true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, '5', false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [String], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop(10, '5', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], '5', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '5', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '5', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '5', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 5);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [String], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop(10, '5', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], '5', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '5', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '5', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '5', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 5);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [String], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop(10, '5', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(10, '5', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], '5', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], '5', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '5', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '5', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '5', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '5', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '5', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '5', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 10);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [String], [Function], [Object]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(10, '5', function () { }, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], '5', function () { }, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, '5', function () { }, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), '5', function () { }, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, '5', function () { }, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[Number|Array|RegExp|Date|null], [String], [Function], [Boolean]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop(10, '5', function () { }, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(10, '5', function () { }, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], '5', function () { }, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop([], '5', function () { }, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, '5', function () { }, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(/hello/, '5', function () { }, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), '5', function () { }, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(new Date(), '5', function () { }, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, '5', function () { }, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop(null, '5', function () { }, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[String], [String]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop('1', '2', (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[String], [String], [Object]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop('1', '2', {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[String], [String], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop('1', '2', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[String], [String], [Boolean]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop('1', '2', true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', '2', false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[String], [String], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop('1', '2', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', '2', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[String], [String], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop('1', '2', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[String], [Number|Array|RegExp|Date|null]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop('1', 10, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', [], (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', /hello/, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', new Date(), (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', null, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[String], [Number|Array|RegExp|Date|null], [Object]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop('1', 10, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', [], {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', /hello/, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', new Date(), {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', null, {}, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[String], [Number|Array|RegExp|Date|null], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop('1', 10, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', [], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 5);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[String], [Number|Array|RegExp|Date|null], [Boolean]', function () {
      it('it should throw an error, that the one [String] formula argument is expected', function () {
        this.loop('1', 10, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', 10, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', [], true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', [], false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', /hello/, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', /hello/, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', new Date(), true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', new Date(), false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', null, true, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
        this.loop('1', null, false, (e) => expect(e).toThrowError(Error, 'The one [String] formula argument is expected.'));
      });
    });
    describe('[String], [Number|Array|RegExp|Date|null], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop('1', 10, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', 10, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', [], true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', [], false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 10);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
    describe('[String], [Number|Array|RegExp|Date|null], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the one [String] formula argument is expected', function () {
        this.loop('1', 10, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', [], this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 5);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('The one [String] formula argument is expected.') }));
      });
    });
  });
  describe('with the "round", "ceil" or "floor" method and the following arguments configurations', function () {
    beforeAll(function () {
      this.methods = ['round', 'ceil', 'floor'];
      this.loop = this.loopMethods.bind(this, this.methods);
    });
    describe('<without any arguments>', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop((e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop({}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop(true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop(this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.') }));
      });
    });
    describe('[Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop({}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.') }));
      });
    });
    describe('[Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop(true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.') }));
      });
    });
    describe('[Function], [Object]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop(function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Function], [Boolean]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop(function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[String]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default places integer is used', function () {
        this.loop('1', (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Object]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default places integer is used', function () {
        this.loop('1', {}, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Boolean]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default places integer is used', function () {
        this.loop('1', true, (e) => expect(e).not.toThrowError());
        this.loop('1', false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default places integer is used', function () {
        this.loop('1', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default places integer is used', function () {
        this.loop('1', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default places integer is used', function () {
        this.loop('1', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Function], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[String], [Function], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[Number]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default places integer is used', function () {
        this.loop(1, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Object]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default places integer is used', function () {
        this.loop(1, {}, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Boolean]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default places integer is used', function () {
        this.loop(1, true, (e) => expect(e).not.toThrowError());
        this.loop(1, false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default places integer is used', function () {
        this.loop(1, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default places integer is used', function () {
        this.loop(1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default places integer is used', function () {
        this.loop(1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Function], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Object]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Boolean]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop([], false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Function], [Object]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Function], [Boolean]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop([], function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [String], [Number]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', '2', 3, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [String], [Number], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', '2', 3, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [String], [Number], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', '2', 3, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', '2', 3, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [String], [Number], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', '2', 3, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.') }));
      });
    });
    describe('[String], [String], [Number], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', '2', 3, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.') }));
      });
    });
    describe('[String], [String], [Number], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', '2', 3, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', '2', 3, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.') }));
      });
    });
    describe('[String], [String], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', '2', 3, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [String], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', '2', 3, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', '2', 3, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', [], 1, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', /hello/, 1, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', new Date(), 1, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', null, 1, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', [], 1, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', /hello/, 1, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', new Date(), 1, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', null, 1, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', [], 1, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', [], 1, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', /hello/, 1, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', /hello/, 1, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', new Date(), 1, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', new Date(), 1, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', null, 1, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', null, 1, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', [], 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', [], 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', [], 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', [], 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', [], 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', /hello/, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', new Date(), 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', null, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', [], 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', [], 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', /hello/, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', /hello/, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', new Date(), 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', new Date(), 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', null, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', null, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Number], [String]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[Number], [String], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[Number], [String], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, '2', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[Number], [String], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[Number], [String], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[Number], [String], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, '2', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[Number], [String], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop(1, '2', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Number], [String], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop(1, '2', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, '2', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Array|RegExp|Date|null], [String]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], '1', (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, '1', (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), '1', (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, '1', (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Object]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], '1', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, '1', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), '1', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, '1', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Boolean]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], '1', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop([], '1', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, '1', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, '1', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), '1', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), '1', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, '1', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, '1', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], '1', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '1', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '1', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '1', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], '1', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '1', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '1', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '1', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], '1', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], '1', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '1', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '1', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '1', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '1', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '1', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '1', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop([], '1', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(/hello/, '1', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(new Date(), '1', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(null, '1', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop([], '1', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop([], '1', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(/hello/, '1', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(/hello/, '1', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(new Date(), '1', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(new Date(), '1', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(null, '1', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(null, '1', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [String]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[String], [String], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[String], [String], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', '2', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[String], [String], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[String], [String], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[String], [String], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', '2', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[String], [String], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', '2', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [String], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', '2', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', '2', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', /hello/, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', new Date(), (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', null, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', /hello/, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', new Date(), {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', null, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', [], false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', /hello/, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', /hello/, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', new Date(), true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', new Date(), false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', null, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop('1', null, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', [], false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', [], function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', /hello/, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', new Date(), function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', null, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', [], function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', [], function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', /hello/, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', /hello/, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', new Date(), function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', new Date(), function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', null, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', null, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, /hello/, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, new Date(), (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, null, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, /hello/, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, new Date(), {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, null, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, [], false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, /hello/, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, /hello/, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, new Date(), true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, new Date(), false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, null, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        this.loop(1, null, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, [], false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop(1, [], function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, /hello/, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, new Date(), function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, null, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop(1, [], function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, [], function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, /hello/, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, /hello/, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, new Date(), function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, new Date(), function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, null, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, null, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Number]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Object]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Boolean]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop([], 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop([], 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(/hello/, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(new Date(), 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(null, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop([], 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop([], 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(/hello/, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(/hello/, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(new Date(), 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(new Date(), 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(null, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(null, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Number], [Number]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Number], [Object]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, {}, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Number], [Boolean]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, true, (e) => expect(e).not.toThrowError());
        this.loop(1, 1, false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Number], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop(1, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Number], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop(1, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop(1, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [Number]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Number], [Object]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, {}, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Number], [Boolean]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, true, (e) => expect(e).not.toThrowError());
        this.loop('1', 1, false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Number], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Number], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Number], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[String], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
        this.loop('1', 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        this.loop('1', 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
      });
    });
    describe('[Number], [Number]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop(-Infinity, 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
    });
    describe('[Number], [Number], [Object]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop(-Infinity, 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
    });
    describe('[Number], [Number], [Boolean]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
          this.loop(NaN, 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop(Infinity, 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop(-Infinity, 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop(-Infinity, 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
    });
    describe('[Number], [Number], [Function]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(-Infinity, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
    });
    describe('[Number], [Number], [Object], [Function]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(-Infinity, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
    });
    describe('[Number], [Number], [Boolean], [Function]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(NaN, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(Infinity, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(-Infinity, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(-Infinity, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
    });
    describe('[Number], [Number], [Function], [Object]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop(NaN, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop(Infinity, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop(-Infinity, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
    });
    describe('[Number], [Number], [Function], [Boolean]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop(NaN, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop(NaN, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop(Infinity, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop(Infinity, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop(-Infinity, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop(-Infinity, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
    });
    describe('[String], [Number]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop('-Infinity', 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should throw an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [String] argument is not a valid numerical value.'));
        });
      });
    });
    describe('[String], [Number], [Object]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop('-Infinity', 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should throw an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [String] argument is not a valid numerical value.'));
        });
      });
    });
    describe('[String], [Number], [Boolean]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
          this.loop('NaN', 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop('Infinity', 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop('-Infinity', 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop('-Infinity', 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should throw an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [String] argument is not a valid numerical value.'));
          this.loop('abc', 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [String] argument is not a valid numerical value.'));
        });
      });
    });
    describe('[String], [Number], [Function]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('-Infinity', 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should call the callback function rather than throwing an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [String] argument is not a valid numerical value.') }));
        });
      });
    });
    describe('[String], [Number], [Object], [Function]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('-Infinity', 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should call the callback function rather than throwing an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [String] argument is not a valid numerical value.') }));
        });
      });
    });
    describe('[String], [Number], [Boolean], [Function]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('NaN', 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('Infinity', 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('-Infinity', 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('-Infinity', 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should call the callback function rather than throwing an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('abc', 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [String] argument is not a valid numerical value.') }));
        });
      });
    });
    describe('[String], [Number], [Function], [Object]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('NaN', 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('Infinity', 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('-Infinity', 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('abc', 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
    });
    describe('[String], [Number], [Function], [Boolean]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('NaN', 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('NaN', 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('Infinity', 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('Infinity', 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('-Infinity', 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('-Infinity', 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('abc', 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('abc', 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
    });
    describe('[String], [Number]', function () {
      describe('where the [Number] places argument equals 0', function () {
        it('it should not throw an error', function () {
          this.loop('1', 0, (e) => expect(e).not.toThrowError());
        });
      });
      describe('where the [Number] places argument is not an integer', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        });
      });
      describe('where the [Number] places argument is NaN', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        });
      });
      describe('where the [Number] places argument is Infinity or -Infinity', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
          this.loop('1', -Infinity, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        });
      });
    });
    describe('[String], [Number], [Object]', function () {
      describe('where the [Number] places argument equals 0', function () {
        it('it should not throw an error', function () {
          this.loop('1', 0, {}, (e) => expect(e).not.toThrowError());
        });
      });
      describe('where the [Number] places argument is not an integer', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        });
      });
      describe('where the [Number] places argument is NaN', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        });
      });
      describe('where the [Number] places argument is Infinity or -Infinity', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
          this.loop('1', -Infinity, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        });
      });
    });
    describe('[String], [Number], [Boolean]', function () {
      describe('where the [Number] places argument equals 0', function () {
        it('it should not throw an error', function () {
          this.loop('1', 0, true, (e) => expect(e).not.toThrowError());
          this.loop('1', 0, false, (e) => expect(e).not.toThrowError());
        });
      });
      describe('where the [Number] places argument is not an integer', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
          this.loop('1', 1.5, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        });
      });
      describe('where the [Number] places argument is NaN', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
          this.loop('1', NaN, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        });
      });
      describe('where the [Number] places argument is Infinity or -Infinity', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
          this.loop('1', Infinity, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
          this.loop('1', -Infinity, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
          this.loop('1', -Infinity, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] decimal places integer is expected.'));
        });
      });
    });
    describe('[String], [Number], [Function]', function () {
      describe('where the [Number] places argument equals 0', function () {
        it('it should neither throw an error nor pass the error in the callback function', function () {
          this.loop('1', 0, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
        });
      });
      describe('where the [Number] places argument is not an integer', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
        });
      });
      describe('where the [Number] places argument is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
        });
      });
      describe('where the [Number] places argument is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', -Infinity, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
        });
      });
    });
    describe('[String], [Number], [Object], [Function]', function () {
      describe('where the [Number] places argument equals 0', function () {
        it('it should neither throw an error nor pass the error in the callback function', function () {
          this.loop('1', 0, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
        });
      });
      describe('where the [Number] places argument is not an integer', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
        });
      });
      describe('where the [Number] places argument is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
        });
      });
      describe('where the [Number] places argument is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', -Infinity, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
        });
      });
    });
    describe('[String], [Number], [Boolean], [Function]', function () {
      describe('where the [Number] places argument equals 0', function () {
        it('it should neither throw an error nor pass the error in the callback function', function () {
          this.loop('1', 0, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', 0, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
        });
      });
      describe('where the [Number] places argument is not an integer', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', 1.5, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
        });
      });
      describe('where the [Number] places argument is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', NaN, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
        });
      });
      describe('where the [Number] places argument is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', -Infinity, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', Infinity, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', -Infinity, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] decimal places integer is expected.') }));
        });
      });
    });
    describe('[String], [Number], [Function], [Object]', function () {
      describe('where the [Number] places argument equals 0', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('1', 0, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [Number] places argument is not an integer', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('1', 1.5, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [Number] places argument is NaN', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('1', NaN, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [Number] places argument is Infinity or -Infinity', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('1', Infinity, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('1', -Infinity, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
    });
    describe('[String], [Number], [Function], [Boolean]', function () {
      describe('where the [Number] places argument equals 0', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('1', 0, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('1', 0, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [Number] places argument is not an integer', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('1', 1.5, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('1', 1.5, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [Number] places argument is NaN', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('1', NaN, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('1', PerformanceNavigation, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
      describe('where the [Number] places argument is Infinity or -Infinity', function () {
        it('it should throw an error, that the numerical value and [Number] places integer arguments are expected', function () {
          this.loop('1', Infinity, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('1', Infinity, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('1', -Infinity, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
          this.loop('1', -Infinity, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] decimal places integer.'));
        });
      });
    });
  });
  describe('with the "pow" method and the following arguments configurations', function () {
    beforeAll(function () {
      this.methods = ['pow'];
      this.loop = this.loopMethods.bind(this, this.methods);
    });
    describe('<without any arguments>', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop((e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop({}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop(true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop(this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.') }));
      });
    });
    describe('[Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop({}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.') }));
      });
    });
    describe('[Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop(true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.') }));
      });
    });
    describe('[Function], [Object]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop(function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Function], [Boolean]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop(function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[String]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop('1', (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Object]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop('1', {}, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Boolean]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop('1', true, (e) => expect(e).not.toThrowError());
        this.loop('1', false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop('1', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop('1', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop('1', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Function], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[String], [Function], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[Number]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop(1, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Object]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop(1, {}, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Boolean]', function () {
      it('it should not throw an error, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop(1, true, (e) => expect(e).not.toThrowError());
        this.loop(1, false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop(1, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop(1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value have been passed and the default power exponent integer is used', function () {
        this.loop(1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Function], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Object]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Boolean]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop([], false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Function], [Object]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Function], [Boolean]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop([], function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, function () { }, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, function () { }, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[String], [String], [Number]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', '2', 3, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [String], [Number], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', '2', 3, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [String], [Number], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', '2', 3, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', '2', 3, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [String], [Number], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', '2', 3, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.') }));
      });
    });
    describe('[String], [String], [Number], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', '2', 3, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.') }));
      });
    });
    describe('[String], [String], [Number], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', '2', 3, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', '2', 3, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.') }));
      });
    });
    describe('[String], [String], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', '2', 3, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [String], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', '2', 3, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', '2', 3, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', [], 1, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', /hello/, 1, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', new Date(), 1, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', null, 1, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', [], 1, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', /hello/, 1, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', new Date(), 1, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', null, 1, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', [], 1, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', [], 1, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', /hello/, 1, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', /hello/, 1, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', new Date(), 1, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', new Date(), 1, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', null, 1, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', null, 1, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', [], 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', [], 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', [], 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', [], 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', [], 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', /hello/, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', new Date(), 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', null, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', [], 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', [], 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', /hello/, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', /hello/, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', new Date(), 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', new Date(), 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', null, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', null, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Number], [String]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[Number], [String], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[Number], [String], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, '2', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[Number], [String], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[Number], [String], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[Number], [String], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, '2', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, '2', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[Number], [String], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop(1, '2', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Number], [String], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop(1, '2', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, '2', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Array|RegExp|Date|null], [String]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], '1', (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, '1', (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), '1', (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, '1', (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Object]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], '1', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, '1', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), '1', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, '1', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Boolean]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], '1', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop([], '1', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, '1', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, '1', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), '1', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), '1', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, '1', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, '1', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], '1', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '1', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '1', this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '1', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], '1', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '1', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '1', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '1', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], '1', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], '1', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '1', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, '1', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '1', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), '1', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '1', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, '1', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop([], '1', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(/hello/, '1', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(new Date(), '1', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(null, '1', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Array|RegExp|Date|null], [String], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop([], '1', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop([], '1', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(/hello/, '1', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(/hello/, '1', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(new Date(), '1', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(new Date(), '1', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(null, '1', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(null, '1', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [String]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[String], [String], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[String], [String], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', '2', false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[String], [String], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[String], [String], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[String], [String], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', '2', true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', '2', false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[String], [String], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', '2', function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [String], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', '2', function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', '2', function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', /hello/, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', new Date(), (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', null, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', /hello/, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', new Date(), {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', null, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', [], false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', /hello/, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', /hello/, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', new Date(), true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', new Date(), false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', null, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop('1', null, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop('1', [], true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', [], false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', /hello/, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', new Date(), false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', null, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', [], function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', /hello/, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', new Date(), function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', null, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [Array|RegExp|Date|null], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', [], function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', [], function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', /hello/, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', /hello/, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', new Date(), function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', new Date(), function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', null, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', null, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, /hello/, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, new Date(), (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, null, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Object]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, /hello/, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, new Date(), {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, null, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Boolean]', function () {
      it('it should throw an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, [], false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, /hello/, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, /hello/, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, new Date(), true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, new Date(), false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, null, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        this.loop(1, null, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
        this.loop(1, [], true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, [], false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, /hello/, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, new Date(), false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, null, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop(1, [], function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, /hello/, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, new Date(), function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, null, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Number], [Array|RegExp|Date|null], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop(1, [], function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, [], function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, /hello/, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, /hello/, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, new Date(), function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, new Date(), function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, null, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, null, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Number]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Object]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Boolean]', function () {
      it('it should throw an error, that the first argument is incorrect - it expects a numerical value', function () {
        this.loop([], 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop([], 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(/hello/, 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(new Date(), 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
        this.loop(null, 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [Number|String] value is expected.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Object], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Boolean], [Function]', function () {
      it('it should call the callback function rather than throwing an error, that the [String] numerical value is invalid', function () {
        this.loop([], 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop([], 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(/hello/, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(new Date(), 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(null, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 8);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [Number|String] value is expected.') }));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop([], 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(/hello/, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(new Date(), 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(null, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Array|RegExp|Date|null], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop([], 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop([], 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(/hello/, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(/hello/, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(new Date(), 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(new Date(), 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(null, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(null, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Number], [Number]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Number], [Object]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, {}, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Number], [Boolean]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, true, (e) => expect(e).not.toThrowError());
        this.loop(1, 1, false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[Number], [Number], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop(1, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop(1, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[Number], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop(1, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Number], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop(1, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop(1, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [Number]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Number], [Object]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, {}, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Number], [Boolean]', function () {
      it('it should not throw an error, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, true, (e) => expect(e).not.toThrowError());
        this.loop('1', 1, false, (e) => expect(e).not.toThrowError());
      });
    });
    describe('[String], [Number], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Number], [Object], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Number], [Boolean], [Function]', function () {
      it('it should neither throw an error nor pass the error in the callback function, because the numerical value and [Number] places integer arguments have been passed', function () {
        this.loop('1', 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
        this.loop('1', 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
        expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
        expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
      });
    });
    describe('[String], [Number], [Function], [Object]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[String], [Number], [Function], [Boolean]', function () {
      it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
        this.loop('1', 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        this.loop('1', 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
      });
    });
    describe('[Number], [Number]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop(-Infinity, 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
    });
    describe('[Number], [Number], [Object]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop(-Infinity, 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
    });
    describe('[Number], [Number], [Boolean]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
          this.loop(NaN, 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop(Infinity, 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop(-Infinity, 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop(-Infinity, 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
    });
    describe('[Number], [Number], [Function]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(-Infinity, 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
    });
    describe('[Number], [Number], [Object], [Function]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(-Infinity, 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
    });
    describe('[Number], [Number], [Boolean], [Function]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop(NaN, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(NaN, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop(Infinity, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(Infinity, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(-Infinity, 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop(-Infinity, 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
    });
    describe('[Number], [Number], [Function], [Object]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop(NaN, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop(Infinity, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop(-Infinity, 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
    });
    describe('[Number], [Number], [Function], [Boolean]', function () {
      describe('where the [Number] value is NaN', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop(NaN, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop(NaN, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] value is Infinity or -Infinity', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop(Infinity, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop(Infinity, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop(-Infinity, 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop(-Infinity, 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
    });
    describe('[String], [Number]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop('-Infinity', 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should throw an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [String] argument is not a valid numerical value.'));
        });
      });
    });
    describe('[String], [Number], [Object]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop('-Infinity', 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should throw an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [String] argument is not a valid numerical value.'));
        });
      });
    });
    describe('[String], [Number], [Boolean]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should throw an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
          this.loop('NaN', 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be a NaN value.'));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should throw an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop('Infinity', 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop('-Infinity', 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
          this.loop('-Infinity', 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.'));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should throw an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [String] argument is not a valid numerical value.'));
          this.loop('abc', 1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [0]. The [String] argument is not a valid numerical value.'));
        });
      });
    });
    describe('[String], [Number], [Function]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('-Infinity', 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should call the callback function rather than throwing an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [String] argument is not a valid numerical value.') }));
        });
      });
    });
    describe('[String], [Number], [Object], [Function]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('-Infinity', 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should call the callback function rather than throwing an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [String] argument is not a valid numerical value.') }));
        });
      });
    });
    describe('[String], [Number], [Boolean], [Function]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be a NaN', function () {
          this.loop('NaN', 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('NaN', 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be a NaN value.') }));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should call the callback function rather than throwing an error, that the first argument cannot be an Infinity or -Infinity', function () {
          this.loop('Infinity', 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('Infinity', 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('-Infinity', 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('-Infinity', 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.') }));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should call the callback function rather than throwing an error, that the first argument is not a valid numerical value', function () {
          this.loop('abc', 1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('abc', 1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [0]. The [String] argument is not a valid numerical value.') }));
        });
      });
    });
    describe('[String], [Number], [Function], [Object]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('NaN', 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('Infinity', 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('-Infinity', 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('abc', 1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
    });
    describe('[String], [Number], [Function], [Boolean]', function () {
      describe('where the [String] value is "NaN"', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('NaN', 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('NaN', 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [String] value is "Infinity" or "-Infinity"', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('Infinity', 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('Infinity', 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('-Infinity', 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('-Infinity', 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [String] value is incorrect numerical value', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('abc', 1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('abc', 1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
    });
    describe('[String], [Number]', function () {
      describe('where the [Number] power exponent argument equals 0', function () {
        it('it should not throw an error', function () {
          this.loop('1', 0, (e) => expect(e).not.toThrowError());
        });
      });
      describe('where the [Number] power exponent argument is not an integer', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is a negative value', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', -1, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is a non-integer negative value', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', -1.5, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is NaN', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is Infinity or -Infinity', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
          this.loop('1', -Infinity, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
    });
    describe('[String], [Number], [Object]', function () {
      describe('where the [Number] power exponent argument equals 0', function () {
        it('it should not throw an error', function () {
          this.loop('1', 0, {}, (e) => expect(e).not.toThrowError());
        });
      });
      describe('where the [Number] power exponent argument is not an integer', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is a negative value', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', -1, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is a non-integer negative value', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', -1.5, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is NaN', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is Infinity or -Infinity', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
          this.loop('1', -Infinity, {}, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
    });
    describe('[String], [Number], [Boolean]', function () {
      describe('where the [Number] power exponent argument equals 0', function () {
        it('it should not throw an error', function () {
          this.loop('1', 0, true, (e) => expect(e).not.toThrowError());
          this.loop('1', 0, false, (e) => expect(e).not.toThrowError());
        });
      });
      describe('where the [Number] power exponent argument is not an integer', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
          this.loop('1', 1.5, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is a negative value', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', -1, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
          this.loop('1', -1, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is a non-integer negative value', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', -1.5, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
          this.loop('1', -1.5, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is NaN', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
          this.loop('1', NaN, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
      describe('where the [Number] power exponent argument is Infinity or -Infinity', function () {
        it('it should throw an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
          this.loop('1', Infinity, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
          this.loop('1', -Infinity, true, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
          this.loop('1', -Infinity, false, (e) => expect(e).toThrowError(Error, 'Incorrect argument [1]. The [Number] power exponent positive integer is expected.'));
        });
      });
    });
    describe('[String], [Number], [Function]', function () {
      describe('where the [Number] power exponent argument equals 0', function () {
        it('it should neither throw an error nor pass the error in the callback function', function () {
          this.loop('1', 0, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
        });
      });
      describe('where the [Number] power exponent argument is not an integer', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is a negative value', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', -1, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is a non-integer negative value', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] intege', function () {
          this.loop('1', -1.5, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', -Infinity, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
    });
    describe('[String], [Number], [Object], [Function]', function () {
      describe('where the [Number] power exponent argument equals 0', function () {
        it('it should neither throw an error nor pass the error in the callback function', function () {
          this.loop('1', 0, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
        });
      });
      describe('where the [Number] power exponent argument is not an integer', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is a negative value', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', -1, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is a non-integer negative value', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', -1.5, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', -Infinity, {}, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
    });
    describe('[String], [Number], [Boolean], [Function]', function () {
      describe('where the [Number] power exponent argument equals 0', function () {
        it('it should neither throw an error nor pass the error in the callback function', function () {
          this.loop('1', 0, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', 0, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: null }));
        });
      });
      describe('where the [Number] power exponent argument is not an integer', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', 1.5, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', 1.5, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is a negative value', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', -1, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', -1, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is a non-integer negative value', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', -1.5, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', -1.5, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is NaN', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', NaN, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', NaN, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 2);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
      describe('where the [Number] power exponent argument is Infinity or -Infinity', function () {
        it('it should call the callback function rather than throwing an error, that the second argument should be a [Number] integer', function () {
          this.loop('1', Infinity, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', -Infinity, true, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', Infinity, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          this.loop('1', -Infinity, false, this.spyCallback, (e) => expect(e).not.toThrowError());
          expect(this.spyCallback).toHaveBeenCalledTimes(this.methods.length * 4);
          expect(this.spyCallback).toHaveBeenCalledWith(jasmine.objectContaining({ error: new Error('Incorrect argument [1]. The [Number] power exponent positive integer is expected.') }));
        });
      });
    });
    describe('[String], [Number], [Function], [Object]', function () {
      describe('where the [Number] power exponent argument equals 0', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', 0, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] power exponent argument is not an integer', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', 1.5, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] power exponent argument is a negative value', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', -1, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] power exponent argument is a non-integer negative value', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', -1.5, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] power exponent argument is NaN', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', NaN, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] power exponent argument is Infinity or -Infinity', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', Infinity, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('1', -Infinity, function () { }, {}, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
    });
    describe('[String], [Number], [Function], [Boolean]', function () {
      describe('where the [Number] power exponent argument equals 0', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', 0, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('1', 0, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] power exponent argument is not an integer', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', 1.5, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('1', 1.5, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] power exponent argument is a negative value', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', -1, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('1', -1, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] power exponent argument is a non-integer negative value', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', -1.5, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('1', -1.5, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] power exponent argument is NaN', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', NaN, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('1', PerformanceNavigation, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
      describe('where the [Number] power exponent argument is Infinity or -Infinity', function () {
        it('it should throw an error, that the numerical value and [Number] power exponent arguments are expected', function () {
          this.loop('1', Infinity, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('1', Infinity, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('1', -Infinity, function () { }, true, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
          this.loop('1', -Infinity, function () { }, false, (e) => expect(e).toThrowError(Error, 'Two arguments are expected: [0]: [String|Number] value; [1]: [Number] power exponent positive integer.'));
        });
      });
    });
  });
});