/* global describe, beforeAll, it */

describe('When the module is executed', function () {
  beforeAll(function () {
    this.incorrectTypes = this.incorrects({ exclude: ['string'] });
  });
  describe('without the [Object] config object', function () {
    it('the comma and period should be allowed by default in all [String] values', function () {
      this.commaAllowed([]);
      this.periodAllowed([]);
    });
  });
  describe('with the [Object] config object', function () {
    describe("that has not 'decimalChar' property defined", function () {
      it('the comma and period should be allowed by default in all [String] values', function () {
        this.commaAllowed([{}]);
        this.periodAllowed([{}]);
      });
    });
    describe("that has 'decimalChar' property defined", function () {
      describe('but of incorrect type', function () {
        it('the comma and period should be allowed by default in all [String] values', function () {
          for (let type of this.incorrectTypes) {
            const config = { decimalChar: type };
            this.commaAllowed([config]);
            this.periodAllowed([config]);
          }
        });
      });
      describe('of correct [String] type', function () {
        describe('that contains illegal character', function () {
          it('the comma and period should be allowed by default in all [String] values', function () {
            for (let value of ['a', ':', '!', '.,', ',.', '$', '%', '^', '[]']) {
              const config = { decimalChar: value };
              this.commaAllowed([config]);
              this.periodAllowed([config]);
            }
          });
        });
        describe('that contains period character', function () {
          const config = { decimalChar: '.' };
          it('the comma character should not be allowed in the [String] values', function () {
            this.commaForbidden([config]);
          });
          it('the period character should be allowed in the [String] values', function () {
            this.periodAllowed([config]);
          });
        });
        describe('that contains comma character', function () {
          const config = { decimalChar: ',' };
          it('the comma character should be allowed in the [String] values', function () {
            this.commaAllowed([config]);
          });
          it('the period character should not be allowed in the [String] values', function () {
            this.periodForbidden([config]);
          });
        });
      });
      describe('of correct [Array] type', function () {
        describe('that is empty', function () {
          it('the comma and period should be allowed by default in all [String] values', function () {
            const config = { decimalChar: [] };
            this.commaAllowed([config]);
            this.periodAllowed([config]);
          });
        });
        describe('that contains only illegal character', function () {
          it('the comma and period should be allowed by default in all [String] values', function () {
            const config = { decimalChar: [1, true, 'hello', '10', '^', '$', '[', ')'] };
            this.commaAllowed([config]);
            this.periodAllowed([config]);
          });
        });
        describe('that contains some illegal character but also period character', function () {
          const config = { decimalChar: [1, true, 'hello', '10', '^', '.', '$', '[', ')'] };
          it('the comma character should not be allowed in the [String] values', function () {
            this.commaForbidden([config]);
          });
          it('the period character should be allowed in the [String] values', function () {
            this.periodAllowed([config]);
          });
        });
        describe('that contains some illegal character but also comma character', function () {
          const config = { decimalChar: [1, true, 'hello', '10', '^', ',', '$', '[', ')'] };
          it('the comma character should be allowed in the [String] values', function () {
            this.commaAllowed([config]);
          });
          it('the period character should not be allowed in the [String] values', function () {
            this.periodForbidden([config]);
          });
        });
        describe('that contains some illegal character but also comma and period character', function () {
          const config = { decimalChar: [1, true, 'hello', '10', '^', ',', '$', '[', ')', '.'] };
          it('the comma character should be allowed in the [String] values', function () {
            this.commaAllowed([config]);
          });
          it('the period character should be allowed in the [String] values', function () {
            this.periodAllowed([config]);
          });
        });
        describe('that contains only period character', function () {
          const config = { decimalChar: ['.'] };
          it('the comma character should not be allowed in the [String] values', function () {
            this.commaForbidden([config]);
          });
          it('the period character should be allowed in the [String] values', function () {
            this.periodAllowed([config]);
          });
        });
        describe('that contains only comma character', function () {
          const config = { decimalChar: [','] };
          it('the comma character should be allowed in the [String] values', function () {
            this.commaAllowed([config]);
          });
          it('the period character should not be allowed in the [String] values', function () {
            this.periodForbidden([config]);
          });
        });
        describe('that contains comma and period character', function () {
          const config = { decimalChar: [',', '.'] };
          it('the comma character should be allowed in the [String] values', function () {
            this.commaAllowed([config]);
          });
          it('the period character should be allowed in the [String] values', function () {
            this.periodAllowed([config]);
          });
        });
      });
    });
  });
});