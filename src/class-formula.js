import type from 'of-type';
import move from 'move-on';
import Digit from './class-digit';
import Add from './class-add';
import Sub from './class-sub';
import Mul from './class-mul';
import Div from './class-div';
import { collectionVariables } from './utils';

class Scope {
  constructor(arr, openIndex = 0, closeIndex = arr.length - 1) {
    this.elements = arr.splice(openIndex, closeIndex - openIndex + 1);
    this.print = this.printScope(this.elements);
    if (this.elements[0] === '(') this.elements.shift();
    if (this.elements[this.elements.length - 1] === ')') this.elements.pop();
  }

  printScope(elements) {
    let message = '';
    for (let elem of elements) {
      if (type(elem, String)) message += elem;
      if (type(elem, Scope)) message += elem.print;
    }
    return message;
  }
}

class Char {
  constructor(char, type) {
    this.type = type;
    this.print = char;
    this.adjacent = !(/\s$/.test(char));
  }

  get digitChar() {
    return (this.add || this.sub) && /[+-]$/.test(this.print);
  }
  get add() {
    return this.type === 'add';
  }
  get sub() {
    return this.type === 'sub';
  }
  get mul() {
    return this.type === 'mul';
  }
  get div() {
    return this.type === 'div';
  }
}

class Formula {
  constructor({ formula, chars, maxDecimal, invalidError, divisionError, unsafeError }) {
    this.maxDecimal = maxDecimal;
    this.invalidError = invalidError;
    this.divisionError = divisionError;
    this.unsafeError = unsafeError;
    this.result = null;
    const list = [this, '_seekIllegalChars', '_cutParentheses', '_validateParentheses', '_createParenthesesScopes', '_resolveParenthesesScopes'];
    const digitTemplate = `\\d*[${chars.decimalChar}]?\\d+(?:e[+-]\\d+)?`;
    const context = {
      formula, chars, reg: {
        split: new RegExp(`\\s*((${digitTemplate})|([-+${chars.divChar}${chars.mulChar}])|(.))\\s*`, 'g'),
        digitRegExp: new RegExp(`^\\s*${digitTemplate}\\s*$`),
        charsRegExp: new RegExp(`^\\s*(?:([+])|([-])|([${chars.mulChar}])|([${chars.divChar}]))\\s*$`)
      }
    };
    move([list], { context, timeout: null }, (reject, ctx, result) => this.result = result, (ctx, { type, error, args = [] }) => type(error(...args)));
    if (this.result !== null) return this.result;
  }

  get signDescriptor() {
    return {
      div: 'division',
      mul: 'multiplication',
      add: 'addition',
      sub: 'subtraction'
    };
  }

  get errorDefaults() {
    return {
      emptyFormula: () => new Error('The [String] formula cannot be empty.'),
      missingParenthesis: (missing, num) => new Error(`The ${num} ${missing} parenthes${num > 1 ? 'es are' : 'is is'} missing in the [String] formula.`),
      invalidParenthesesOrder: () => new Error('The closing parenthesis has been placed before the opening parenthesis in the [String] formula.'),
      illegalCharacter: (char) => new Error(`The [String] formula contains illegal character ${char}`),
      illegalCombination: (scope, combination) => new Error(`Invalid '${scope}' expression. It contains illegal combination: '${combination}'.`),
      emptyParentheses: () => new Error('The [String] formula cannot contain empty parentheses scope.'),
      divideByZero: (scope) => new Error(`Invalid '${scope}' expression. The division by zero is not allowed.`)
    };
  }

  _seekIllegalChars(resolve, _, ctx) {
    if (/^\s*$/.test(ctx.formula)) return this.invalidError(this.errorDefaults.emptyFormula());
    const reg = new RegExp(`[^0-9e()\\s-+${ctx.chars.decimalChar}${ctx.chars.divChar}${ctx.chars.mulChar}]`);
    const illegal = ctx.formula.match(reg);
    if (illegal && illegal.length) return this.invalidError(this.errorDefaults.illegalCharacter(illegal[0]));
    resolve();
  }

  _cutParentheses(resolve, _, ctx) {
    const reg = /(\(|\))/g;
    ctx.allCollection = ctx.formula.split(reg);
    ctx.parenthesesCollection = ctx.formula.match(reg);
    resolve();
  }

  _validateParentheses(resolve, _, ctx) {
    let open = 0;
    let close = 0;
    let order = 0;
    let invalidOrder = false;
    if (!ctx.parenthesesCollection) return resolve();
    for (let p of ctx.parenthesesCollection) {
      if (p === '(') open++ , order++;
      if (p === ')') close++ , order--;
      if (order < 0) invalidOrder = true;
    }

    if (open !== close) {
      const missing = {
        side: open > close ? 'closing' : 'opening',
        num: Math.abs(open - close)
      };
      return this.invalidError(this.errorDefaults.missingParenthesis(missing.side, missing.num));
    }

    if (invalidOrder) return this.invalidError(this.errorDefaults.invalidParenthesesOrder());
    resolve();
  }

  _createParenthesesScopes(resolve, _, ctx) {
    ctx.scopeOrder = [];
    reducer(ctx.allCollection);
    ctx.scopeOrder.push(new Scope(ctx.allCollection));
    resolve();
    function reducer(arr) {
      let openIndex = null;
      let closeIndex = null;
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item === '(') openIndex = i;
        else if (item === ')') {
          closeIndex = i;
          let scope = new Scope(arr, openIndex, closeIndex);
          arr.splice(openIndex, 0, scope);
          ctx.scopeOrder.push(scope);
          reducer(arr);
        } else if ((/^\s*$/).test(item)) {
          arr.splice(i, 1);
          i--;
          continue;
        }
      }
    }
  }

  _resolveParenthesesScopes(resolve, reject, ctx) {
    const forkList = [], innerList = [this, '_splitEquation', '_parseDigitsChars', '_validateScopeElements', '_computeScope'];
    for (let scope of ctx.scopeOrder) {
      forkList.push((resolve, reject) => {
        let context = { root: ctx, scopeEquation: scope };
        move([innerList], { context, timeout: null }, resolve, (ctx, err) => reject(err));
      });
    }

    move.all(forkList, { context: ctx, timeout: null }, (reject, ctx) => {
      const result = ctx.scopeOrder[ctx.scopeOrder.length - 1].result;
      result.removeE();
      return resolve(result);
    }, (ctx, err) => reject(err));
  }

  _splitEquation(resolve, _, ctx) {
    const equationItems = [];
    for (let item of ctx.scopeEquation.elements) {
      if (type(item, String)) equationItems.push(...item.match(ctx.root.reg.split));
      else equationItems.push(item);
    }
    ctx.equationItems = equationItems;
    resolve();
  }

  _parseDigitsChars(resolve, reject, ctx) {
    const collection = [];
    for (let i = 0; i < ctx.equationItems.length; i++) {
      const { item } = collectionVariables(ctx.equationItems, i);
      if (type(item, Scope)) {
        collection.push(item);
        continue;
      }

      const digit = item.match(ctx.root.reg.digitRegExp);
      if (digit) {
        collection.push(new Digit(digit[0]));
        continue;
      }

      const char = item.match(ctx.root.reg.charsRegExp);
      if (char) {
        char.some((item, index) => {
          const found = index > 0 && item;
          if (found) collection.push(new Char(char[0], ['add', 'sub', 'mul', 'div'][index - 1]));
          return found;
        });
        continue;
      }
      return reject({
        type: this.invalidError,
        error: this.errorDefaults.illegalCombination,
        args: [ctx.scopeEquation.print, item]
      });
    }
    ctx.collection = collection;
    resolve();
  }

  _validateScopeElements(resolve, reject, ctx) {
    for (let i = 0; i < ctx.collection.length; i++) {
      const { item, previous, next, first, last } = collectionVariables(ctx.collection, i);
      if (type(item, Digit)) {
        if (type(next, Digit)) {
          return reject({
            type: this.invalidError,
            error: this.errorDefaults.illegalCombination,
            args: [ctx.scopeEquation.print, item.print + next.print]
          });
        }
        if (type(next, Scope)) {
          ctx.collection.splice(++i, 0, new Char('*', 'mul'));
        }
      } else if (type(item, Char)) {
        switch (true) {
          case (first && ((item.div || item.mul) || type(next, Char))) || (type(previous, Char) && type(next, Char)):
          case last:
          case first && !item.adjacent && type(next, Digit):
            return reject({
              type: this.invalidError,
              error: this.errorDefaults.illegalCombination,
              args: [ctx.scopeEquation.print, (first ? '' : previous.print) + item.print + (last ? '' : next.print)]
            });
          case type(next, Char) && (next.mul || next.div || !next.digitChar):
            return reject({
              type: this.invalidError,
              error: this.errorDefaults.illegalCombination,
              args: [ctx.scopeEquation.print, (first ? '' : previous.print) + item.print + (last ? '' : next.print)]
            });
          case first || type(previous, Char):
            if (item.sub && type(next, Digit)) next.negate();
            if (item.sub && type(next, Scope)) next.result.negate();
            ctx.collection.splice(i, 1);
            i--;
            break;
        }
      } else if (type(item, Scope)) {
        if (type(next, [Scope, Digit])) ctx.collection.splice(++i, 0, new Char('*', 'mul'));
      }
    }
    resolve();
  }

  _computeScope(resolve, reject, ctx) {
    for (let i = 0; i < ctx.collection.length; i++) {
      const { item, previous, next } = collectionVariables(ctx.collection, i);
      if (type(item, Char) && (item.mul || item.div)) {
        const left = type(previous, Digit) ? previous : previous.result;
        const right = type(next, Digit) ? next : next.result;
        if (item.mul) {
          ctx.collection.splice(i - 1, 3, new Mul({
            digits: [left, right],
            zeroValue: left.equalsZero ? 0 : right.equalsZero ? 1 : -1
          }));
        }
        if (item.div) {
          let divisionError = false;
          ctx.collection.splice(i - 1, 3, new Div({
            digits: [left, right],
            maxDecimal: this.maxDecimal,
            divideByZeroError: this.errorDefaults.divideByZero(ctx.scopeEquation.print),
            divisionError: (error) => {
              divisionError = true;
              return reject({
                type: this.divisionError,
                error: () => error
              });
            }
          }));
          if (divisionError) return;
        }
        i--;
      }
    }
    for (let i = 0; i < ctx.collection.length; i++) {
      const { item, previous, next } = collectionVariables(ctx.collection, i);
      if (type(item, Char) && (item.add || item.sub)) {
        const left = type(previous, Digit) ? previous : previous.result;
        const right = type(next, Digit) ? next : next.result;
        if (item.add) {
          ctx.collection.splice(i - 1, 3, new Add({
            digits: [left, right]
          }));
        }
        if (item.sub) {
          ctx.collection.splice(i - 1, 3, new Sub({
            digits: [left, right]
          }));
        }
        i--;
      }
    }
    if (!ctx.collection.length) {
      return reject({
        type: this.invalidError,
        error: this.errorDefaults.emptyParentheses,
      });
    }
    ctx.scopeEquation.result = type(ctx.collection[0], Digit) ? ctx.collection[0] : ctx.collection[0].result;
    resolve();
  }
}

export default Formula;