/* global describe, beforeAll, it */

describe('When the module is executed with formula method', function () {
  beforeAll(function () {
    this.incorrectTypes = this.incorrects({ exclude: ['string'] });
  });
  describe('without the [Object] config object', function () {
    it("the '*', 'x' and '⋅' characters should be allowed by default in formula", function () {
      this.asteriskAllowed([]);
      this.xAllowed([]);
      this.dotAllowed([]);
    });
  });
  describe('with the [Object] config object', function () {
    describe("that has not 'mulChar' property defined", function () {
      it("the '*', 'x' and '⋅' characters should be allowed by default in formula", function () {
        this.asteriskAllowed([{}]);
        this.xAllowed([{}]);
        this.dotAllowed([{}]);
      });
    });
    describe("that has 'mulChar' property defined", function () {
      describe('but of incorrect type', function () {
        it("the '*', 'x' and '⋅' characters should be allowed by default in formula", function () {
          for (let type of this.incorrectTypes) {
            const config = { mulChar: type };
            this.asteriskAllowed([config]);
            this.xAllowed([config]);
            this.dotAllowed([config]);
          }
        });
      });
    });
    describe('of correct [String] type', function () {
      describe('that contains illegal character', function () {
        it("the '*', 'x' and '⋅' characters should be allowed by default in formula", function () {
          for (let value of ['a', '&', '!', '.,', 'x*', '$', '%', '^', '[]']) {
            const config = { mulChar: value };
            this.asteriskAllowed([config]);
            this.xAllowed([config]);
            this.dotAllowed([config]);
          }
        });
      });
      describe("that contains '*' character", function () {
        const config = { mulChar: '*' };
        it("the '*' character should be allowed in formula", function () {
          this.asteriskAllowed([config]);
        });
        it("the '⋅' character should not be allowed in formula", function () {
          this.dotForbidden([config]);
        });
        it("the 'x' character should not be allowed in formula", function () {
          this.xForbidden([config]);
        });
      });
      describe("that contains 'x' character", function () {
        const config = { mulChar: 'x' };
        it("the 'x' character should be allowed in formula", function () {
          this.xAllowed([config]);
        });
        it("the '⋅' character should not be allowed in formula", function () {
          this.dotForbidden([config]);
        });
        it("the '*' character should not be allowed in formula", function () {
          this.asteriskForbidden([config]);
        });
      });
      describe("that contains '⋅' character", function () {
        const config = { mulChar: '⋅' };
        it("the '⋅' character should be allowed in formula", function () {
          this.dotAllowed([config]);
        });
        it("the '*' character should not be allowed in formula", function () {
          this.asteriskForbidden([config]);
        });
        it("the 'x' character should not be allowed in formula", function () {
          this.xForbidden([config]);
        });
      });
    });
    describe('of correct [Array] type', function () {
      describe('that is empty', function () {
        it("the '*', 'x' and '⋅' characters should be allowed by default in formula", function () {
          const config = { mulChar: [] };
          this.asteriskAllowed([config]);
          this.xAllowed([config]);
          this.dotAllowed([config]);
        });
      });
      describe('that contains only illegal character', function () {
        it("the '*', 'x' and '⋅' characters should be allowed by default in formula", function () {
          const config = { mulChar: [1, true, 'hello', '10', '^', '$', '[', ')'] };
          this.asteriskAllowed([config]);
          this.xAllowed([config]);
          this.dotAllowed([config]);
        });
      });
      describe("that contains some illegal character but also '*' character", function () {
        const config = { mulChar: [1, true, 'hello', '10', '^', '*', '$', '[', ')'] };
        it("the '*' character should be allowed in formula", function () {
          this.asteriskAllowed([config]);
        });
        it("the '⋅' character should not be allowed in formula", function () {
          this.dotForbidden([config]);
        });
        it("the 'x' character should not be allowed in formula", function () {
          this.xForbidden([config]);
        });
      });
      describe("that contains only '*' character", function () {
        const config = { mulChar: ['*'] };
        it("the '*' character should be allowed in formula", function () {
          this.asteriskAllowed([config]);
        });
        it("the '⋅' character should not be allowed in formula", function () {
          this.dotForbidden([config]);
        });
        it("the 'x' character should not be allowed in formula", function () {
          this.xForbidden([config]);
        });
      });
      describe("that contains some illegal character but also 'x' character", function () {
        const config = { mulChar: [1, true, 'hello', '10', '^', '$', '[', ')', 'x'] };
        it("the 'x' character should be allowed in formula", function () {
          this.xAllowed([config]);
        });
        it("the '⋅' character should not be allowed in formula", function () {
          this.dotForbidden([config]);
        });
        it("the '*' character should not be allowed in formula", function () {
          this.asteriskForbidden([config]);
        });
      });
      describe("that contains only 'x' character", function () {
        const config = { mulChar: ['x'] };
        it("the 'x' character should be allowed in formula", function () {
          this.xAllowed([config]);
        });
        it("the '⋅' character should not be allowed in formula", function () {
          this.dotForbidden([config]);
        });
        it("the '*' character should not be allowed in formula", function () {
          this.asteriskForbidden([config]);
        });
      });
      describe("that contains some illegal character but also '⋅' character", function () {
        const config = { mulChar: [1, true, '⋅', 'hello', '10', '^', '$', '[', ')'] };
        it("the '⋅' character should be allowed in formula", function () {
          this.dotAllowed([config]);
        });
        it("the '*' character should not be allowed in formula", function () {
          this.asteriskForbidden([config]);
        });
        it("the 'x' character should not be allowed in formula", function () {
          this.xForbidden([config]);
        });
      });
      describe("that contains only '⋅' character", function () {
        const config = { mulChar: ['⋅'] };
        it("the '⋅' character should be allowed in formula", function () {
          this.dotAllowed([config]);
        });
        it("the '*' character should not be allowed in formula", function () {
          this.asteriskForbidden([config]);
        });
        it("the 'x' character should not be allowed in formula", function () {
          this.xForbidden([config]);
        });
      });
      describe("that contains some illegal character but also '*', 'x' and '⋅' characters", function () {
        const config = { mulChar: [1, true, '⋅', 'hello', '10', '^', 'x', '$', '[', '*', ')'] };
        it("the '*' character should be allowed in formula", function () {
          this.asteriskAllowed([config]);
        });
        it("the '⋅' character should be allowed in formula", function () {
          this.dotAllowed([config]);
        });
        it("the 'x' character should be allowed in formula", function () {
          this.xAllowed([config]);
        });
      });
      describe("that contains '*', 'x' and '⋅' characters", function () {
        const config = { mulChar: ['*', 'x', '⋅'] };
        it("the '*' character should be allowed in formula", function () {
          this.asteriskAllowed([config]);
        });
        it("the '⋅' character should be allowed in formula", function () {
          this.dotAllowed([config]);
        });
        it("the 'x' character should be allowed in formula", function () {
          this.xAllowed([config]);
        });
      });
      describe("that contains '*' and 'x' characters", function () {
        const config = { mulChar: ['*', 'x'] };
        it("the '*' character should be allowed in formula", function () {
          this.asteriskAllowed([config]);
        });
        it("the 'x' character should be allowed in formula", function () {
          this.xAllowed([config]);
        });
        it("the '⋅' character should not be allowed in formula", function () {
          this.dotForbidden([config]);
        });
      });
      describe("that contains 'x' and '⋅' characters", function () {
        const config = { mulChar: ['x', '⋅'] };
        it("the '⋅' character should be allowed in formula", function () {
          this.dotAllowed([config]);
        });
        it("the 'x' character should be allowed in formula", function () {
          this.xAllowed([config]);
        });
        it("the '*' character should not be allowed in formula", function () {
          this.asteriskForbidden([config]);
        });
      });
      describe("that contains '*' and '⋅' characters", function () {
        const config = { mulChar: ['*', '⋅'] };
        it("the '*' character should be allowed in formula", function () {
          this.asteriskAllowed([config]);
        });
        it("the '⋅' character should be allowed in formula", function () {
          this.dotAllowed([config]);
        });
        it("the 'x' character should not be allowed in formula", function () {
          this.xForbidden([config]);
        });
      });
    });
  });
});