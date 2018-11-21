/* global describe, beforeAll, it */

describe('When the module is executed with formula method', function () {
  beforeAll(function () {
    this.incorrectTypes = this.incorrects({ exclude: ['string'] });
  });
  describe('without the [Object] config object', function () {
    it("the '/', ':' and '÷' characters should be allowed by default in formula", function () {
      this.slashAllowed([]);
      this.colonAllowed([]);
      this.divisionAllowed([]);
    });
  });
  describe('with the [Object] config object', function () {
    describe("that has not 'divChar' property defined", function () {
      it("the '/', ':' and '÷' characters should be allowed by default in formula", function () {
        this.slashAllowed([{}]);
        this.colonAllowed([{}]);
        this.divisionAllowed([{}]);
      });
    });
    describe("that has 'divChar' property defined", function () {
      describe('but of incorrect type', function () {
        it("the '/', ':' and '÷' characters should be allowed by default in formula", function () {
          for (let type of this.incorrectTypes) {
            const config = { divChar: type };
            this.slashAllowed([config]);
            this.colonAllowed([config]);
            this.divisionAllowed([config]);
          }
        });
      });
      describe('of correct [String] type', function () {
        describe('that contains illegal character', function () {
          it("the '/', ':' and '÷' characters should be allowed by default in formula", function () {
            for (let value of ['a', '*', '!', '.,', '/:', '$', '%', '^', '[]']) {
              const config = { divChar: value };
              this.slashAllowed([config]);
              this.colonAllowed([config]);
              this.divisionAllowed([config]);
            }
          });
        });
        describe("that contains '/' character", function () {
          const config = { divChar: '/' };
          it("the '/' character should be allowed in formula", function () {
            this.slashAllowed([config]);
          });
          it("the ':' character should not be allowed in formula", function () {
            this.colonForbidden([config]);
          });
          it("the '÷' character should not be allowed in formula", function () {
            this.divisionForbidden([config]);
          });
        });
        describe("that contains ':' character", function () {
          const config = { divChar: ':' };
          it("the ':' character should be allowed in formula", function () {
            this.colonAllowed([config]);
          });
          it("the '/' character should not be allowed in formula", function () {
            this.slashForbidden([config]);
          });
          it("the '÷' character should not be allowed in formula", function () {
            this.divisionForbidden([config]);
          });
        });
        describe("that contains '÷' character", function () {
          const config = { divChar: '÷' };
          it("the '÷' character should be allowed in formula", function () {
            this.divisionAllowed([config]);
          });
          it("the '/' character should not be allowed in formula", function () {
            this.slashForbidden([config]);
          });
          it("the ':' character should not be allowed in formula", function () {
            this.colonForbidden([config]);
          });
        });
      });
      describe('of correct [Array] type', function () {
        describe('that is empty', function () {
          it("the '/', ':' and '÷' characters should be allowed by default in formula", function () {
            const config = { divChar: [] };
            this.slashAllowed([config]);
            this.colonAllowed([config]);
            this.divisionAllowed([config]);
          });
        });
        describe('that contains only illegal character', function () {
          it("the '/', ':' and '÷' characters should be allowed by default in formula", function () {
            const config = { divChar: [1, true, 'hello', '10', '^', '$', '[', ')'] };
            this.slashAllowed([config]);
            this.colonAllowed([config]);
            this.divisionAllowed([config]);
          });
        });
        describe("that contains some illegal character but also '/' character", function () {
          const config = { divChar: [1, true, 'hello', '10', '^', '/', '$', '[', ')'] };
          it("the '/' character should be allowed in formula", function () {
            this.slashAllowed([config]);
          });
          it("the ':' character should not be allowed in formula", function () {
            this.colonForbidden([config]);
          });
          it("the '÷' character should not be allowed in formula", function () {
            this.divisionForbidden([config]);
          });
        });
        describe("that contains only '/' character", function () {
          const config = { divChar: ['/'] };
          it("the '/' character should be allowed in formula", function () {
            this.slashAllowed([config]);
          });
          it("the ':' character should not be allowed in formula", function () {
            this.colonForbidden([config]);
          });
          it("the '÷' character should not be allowed in formula", function () {
            this.divisionForbidden([config]);
          });
        });
        describe("that contains some illegal character but also ':' character", function () {
          const config = { divChar: [1, true, 'hello', ':', '^', '.', '$', '[', ')'] };
          it("the ':' character should be allowed in formula", function () {
            this.colonAllowed([config]);
          });
          it("the '/' character should not be allowed in formula", function () {
            this.slashForbidden([config]);
          });
          it("the '÷' character should not be allowed in formula", function () {
            this.divisionForbidden([config]);
          });
        });
        describe("that contains only ':' character", function () {
          const config = { divChar: [':'] };
          it("the ':' character should be allowed in formula", function () {
            this.colonAllowed([config]);
          });
          it("the '/' character should not be allowed in formula", function () {
            this.slashForbidden([config]);
          });
          it("the '÷' character should not be allowed in formula", function () {
            this.divisionForbidden([config]);
          });
        });
        describe("that contains some illegal character but also '÷' character", function () {
          const config = { divChar: [1, true, 'hello', '10', '^', '.', '$', '÷', ')'] };
          it("the '÷' character should be allowed in formula", function () {
            this.divisionAllowed([config]);
          });
          it("the '/' character should not be allowed in formula", function () {
            this.slashForbidden([config]);
          });
          it("the ':' character should not be allowed in formula", function () {
            this.colonForbidden([config]);
          });
        });
        describe("that contains only '÷' character", function () {
          const config = { divChar: ['÷'] };
          it("the '÷' character should be allowed in formula", function () {
            this.divisionAllowed([config]);
          });
          it("the '/' character should not be allowed in formula", function () {
            this.slashForbidden([config]);
          });
          it("the ':' character should not be allowed in formula", function () {
            this.colonForbidden([config]);
          });
        });
        describe("that contains some illegal character but also '/', ':' and '÷' character", function () {
          const config = { divChar: [1, true, 'hello', '10', '^', '.', '/', '$', '÷', ')', ':'] };
          it("the '÷' character should be allowed in formula", function () {
            this.divisionAllowed([config]);
          });
          it("the '/' character should be allowed in formula", function () {
            this.slashAllowed([config]);
          });
          it("the ':' character should be allowed in formula", function () {
            this.colonAllowed([config]);
          });
        });
        describe("that contains '/', ':' and '÷' characters", function () {
          const config = { divChar: ['/', ':', '÷'] };
          it("the '÷' character should be allowed in formula", function () {
            this.divisionAllowed([config]);
          });
          it("the '/' character should be allowed in formula", function () {
            this.slashAllowed([config]);
          });
          it("the ':' character should be allowed in formula", function () {
            this.colonAllowed([config]);
          });
        });
        describe("that contains '/' and '÷' character", function () {
          const config = { divChar: ['/', '÷'] };
          it("the '÷' character should be allowed in formula", function () {
            this.divisionAllowed([config]);
          });
          it("the '/' character should be allowed in formula", function () {
            this.slashAllowed([config]);
          });
          it("the ':' character should not be allowed in formula", function () {
            this.colonForbidden([config]);
          });
        });
        describe("that contains ':' and '÷' character", function () {
          const config = { divChar: [':', '÷'] };
          it("the '÷' character should be allowed in formula", function () {
            this.divisionAllowed([config]);
          });
          it("the ':' character should be allowed in formula", function () {
            this.colonAllowed([config]);
          });
          it("the '/' character should not be allowed in formula", function () {
            this.slashForbidden([config]);
          });
        });
        describe("that contains '/' and ':' character", function () {
          const config = { divChar: ['/', ':'] };
          it("the '/' character should be allowed in formula", function () {
            this.slashAllowed([config]);
          });
          it("the ':' character should be allowed in formula", function () {
            this.colonAllowed([config]);
          });
          it("the '÷' character should not be allowed in formula", function () {
            this.divisionForbidden([config]);
          });
        });
      });
    });
  });
});