/* global beforeAll, expect */

beforeAll(function(){
  this.incorrectArgument = (index)=> `Incorrect argument [${index}]. The [String] argument is not a valid numerical value.`;
  this.incorrectFormula = (char)=>`The [String] formula contains illegal character ${char}`;

  this.periodAllowed = (config)=> {
    expect(this.exactMath.add('2.2', '3.3', ...config)).toEqual(5.5);
    expect(this.exactMath.sub('132.55', '12.22', '.33', ...config)).toEqual(120);
    expect(this.exactMath.mul('5.4', '1.25', '.5', ...config)).toEqual(3.375);
    expect(this.exactMath.div('7.77', '1.11', '.1', ...config)).toEqual(70);
    expect(this.exactMath.formula('2.22(3.13-.25)-.3936+15', ...config)).toEqual(21);
  };

  this.commaAllowed = (config)=> {
    expect(this.exactMath.add('2,2', '3,3', ...config)).toEqual(5.5);
    expect(this.exactMath.sub('132,55', '12,22', ',33', ...config)).toEqual(120);
    expect(this.exactMath.mul('5,4', '1,25', ',5', ...config)).toEqual(3.375);
    expect(this.exactMath.div('7,77', '1,11', ',1', ...config)).toEqual(70);
    expect(this.exactMath.formula('2,22(3,13-,25)-,3936+15', ...config)).toEqual(21);
  };

  this.periodForbidden = (config)=> {
    expect(() => this.exactMath.add('2.2', '3.3', ...config)).toThrowError(this.incorrectArgument(0));
    expect(() => this.exactMath.add('2,2', '3.3', ...config)).toThrowError(this.incorrectArgument(1));
    expect(() => this.exactMath.sub('132.55', '12.22', '.33', ...config)).toThrowError(this.incorrectArgument(0));
    expect(() => this.exactMath.sub('132,55', '12,22', '.33', ...config)).toThrowError(this.incorrectArgument(2));
    expect(() => this.exactMath.mul('5.4', '1.25', '.5', ...config)).toThrowError(this.incorrectArgument(0));
    expect(() => this.exactMath.mul('5,4', '1.25', '.5', ...config)).toThrowError(this.incorrectArgument(1));
    expect(() => this.exactMath.div('7.77', '1.11', '.1', ...config)).toThrowError(this.incorrectArgument(0));
    expect(() => this.exactMath.div('7,77', '1,11', '.1', ...config)).toThrowError(this.incorrectArgument(2));
    expect(() => this.exactMath.formula('2.22(3.13-.25)-.3936+15', ...config)).toThrowError(this.incorrectFormula('.'));
    expect(() => this.exactMath.formula('2,22(3,13-.25)-,3936+15', ...config)).toThrowError(this.incorrectFormula('.'));
  };

  this.commaForbidden = (config)=> {
    expect(() => this.exactMath.add('2,2', '3,3', ...config)).toThrowError(this.incorrectArgument(0));
    expect(() => this.exactMath.add('2.2', '3,3', ...config)).toThrowError(this.incorrectArgument(1));
    expect(() => this.exactMath.sub('132,55', '12,22', ',33', ...config)).toThrowError(this.incorrectArgument(0));
    expect(() => this.exactMath.sub('132.55', '12,22', ',33', ...config)).toThrowError(this.incorrectArgument(1));
    expect(() => this.exactMath.mul('5,4', '1,25', ',5', ...config)).toThrowError(this.incorrectArgument(0));
    expect(() => this.exactMath.mul('5.4', '1.25', ',5', ...config)).toThrowError(this.incorrectArgument(2));
    expect(() => this.exactMath.div('7,77', '1,11', ',1', ...config)).toThrowError(this.incorrectArgument(0));
    expect(() => this.exactMath.div('7.77', '1,11', '.1', ...config)).toThrowError(this.incorrectArgument(1));
    expect(() => this.exactMath.formula('2,22(3,13-,25)-,3936+15', ...config)).toThrowError(this.incorrectFormula(','));
    expect(() => this.exactMath.formula('2.22(3.13-,25)-.3936+15', ...config)).toThrowError(this.incorrectFormula(','));
  };

  this.slashAllowed = (config)=>{
    expect(this.exactMath.formula('10 / 2', ...config)).toEqual(5);
    expect(this.exactMath.formula('10(.5/.025)', ...config)).toEqual(200);
    expect(this.exactMath.formula('5+((10-2) / 2)/.5', ...config)).toEqual(13);
  };

  this.colonAllowed = (config)=>{
    expect(this.exactMath.formula('10 : 2', ...config)).toEqual(5);
    expect(this.exactMath.formula('10(.5:.025)', ...config)).toEqual(200);
    expect(this.exactMath.formula('5+((10-2) : 2):.5', ...config)).toEqual(13);
  };

  this.divisionAllowed = (config)=>{
    expect(this.exactMath.formula('10 ÷ 2', ...config)).toEqual(5);
    expect(this.exactMath.formula('10(.5÷.025)', ...config)).toEqual(200);
    expect(this.exactMath.formula('5+((10-2) ÷ 2)÷.5', ...config)).toEqual(13);
  };

  this.slashForbidden = (config)=>{
    expect(() => this.exactMath.formula('10 / 2', ...config)).toThrowError(this.incorrectFormula('/'));
    expect(() => this.exactMath.formula('10(.5/.025)', ...config)).toThrowError(this.incorrectFormula('/'));
    expect(() => this.exactMath.formula('5+((10-2) / 2)/.5', ...config)).toThrowError(this.incorrectFormula('/'));
  };

  this.colonForbidden = (config)=>{
    expect(() => this.exactMath.formula('10 : 2', ...config)).toThrowError(this.incorrectFormula(':'));
    expect(() => this.exactMath.formula('10(.5:.025)', ...config)).toThrowError(this.incorrectFormula(':'));
    expect(() => this.exactMath.formula('5+((10-2) : 2):.5', ...config)).toThrowError(this.incorrectFormula(':'));
  };

  this.divisionForbidden = (config)=>{
    expect(() => this.exactMath.formula('10 ÷ 2', ...config)).toThrowError(this.incorrectFormula('÷'));
    expect(() => this.exactMath.formula('10(.5÷.025)', ...config)).toThrowError(this.incorrectFormula('÷'));
    expect(() => this.exactMath.formula('5+((10-2) ÷ 2)÷.5', ...config)).toThrowError(this.incorrectFormula('÷'));
  };

  this.asteriskAllowed = (config)=>{
    expect(this.exactMath.formula('10 * 2', ...config)).toEqual(20);
    expect(this.exactMath.formula('10(.5*.025)', ...config)).toEqual(0.125);
    expect(this.exactMath.formula('5+((10-2) * 2)*.5', ...config)).toEqual(13);
  };

  this.xAllowed = (config)=>{
    expect(this.exactMath.formula('10 x 2', ...config)).toEqual(20);
    expect(this.exactMath.formula('10(.5x.025)', ...config)).toEqual(0.125);
    expect(this.exactMath.formula('5+((10-2) x 2)x.5', ...config)).toEqual(13);
  };

  this.dotAllowed = (config)=>{
    expect(this.exactMath.formula('10 ⋅ 2', ...config)).toEqual(20);
    expect(this.exactMath.formula('10(.5⋅.025)', ...config)).toEqual(0.125);
    expect(this.exactMath.formula('5+((10-2) ⋅ 2)⋅.5', ...config)).toEqual(13);
  };

  this.multiplySignAllowed = (config)=>{
    expect(this.exactMath.formula('10 × 2', ...config)).toEqual(20);
    expect(this.exactMath.formula('10(.5×.025)', ...config)).toEqual(0.125);
    expect(this.exactMath.formula('5+((10-2) × 2)×.5', ...config)).toEqual(13);
  };

  this.asteriskForbidden = (config)=>{
    expect(() => this.exactMath.formula('10 * 2', ...config)).toThrowError(this.incorrectFormula('*'));
    expect(() => this.exactMath.formula('10(.5*.025)', ...config)).toThrowError(this.incorrectFormula('*'));
    expect(() => this.exactMath.formula('5+((10-2) * 2)*.5', ...config)).toThrowError(this.incorrectFormula('*'));
  };

  this.xForbidden = (config)=>{
    expect(() => this.exactMath.formula('10 x 2', ...config)).toThrowError(this.incorrectFormula('x'));
    expect(() => this.exactMath.formula('10(.5x.025)', ...config)).toThrowError(this.incorrectFormula('x'));
    expect(() => this.exactMath.formula('5+((10-2) x 2)x.5', ...config)).toThrowError(this.incorrectFormula('x'));
  };

  this.dotForbidden = (config)=>{
    expect(() => this.exactMath.formula('10 ⋅ 2', ...config)).toThrowError(this.incorrectFormula('⋅'));
    expect(() => this.exactMath.formula('5+((10-2) ⋅ 2)⋅.5', ...config)).toThrowError(this.incorrectFormula('⋅'));
    expect(() => this.exactMath.formula('5+((10-2) ⋅ 2)⋅.5', ...config)).toThrowError(this.incorrectFormula('⋅'));
  };

  this.multiplySignForbidden = (config)=>{
    expect(() => this.exactMath.formula('10 × 2', ...config)).toThrowError(this.incorrectFormula('×'));
    expect(() => this.exactMath.formula('10(.5×.025)', ...config)).toThrowError(this.incorrectFormula('×'));
    expect(() => this.exactMath.formula('5+((10-2) × 2)×.5', ...config)).toThrowError(this.incorrectFormula('×'));
  };
  
});
