### In This Documentation
1. [Description](#description)
2. [Implementation](#implementation)
3. [Tests](#tests)
4. [Features](#features)
5. [Methods](#methods)  
a. [add, sub, mul, div](#add-sub-mul-div)  
b. [formula](#formula)  
c. [round, ceil, floor](#round-ceil-floor)  
d. [pow](#pow)
6. [config parameter](#config-parameter)  
a. [returnString](#returnstring)  
b. [decimalChar](#decimalchar)  
c. [divChar](#divchar)  
d. [mulChar](#mulchar)  
e. [eMinus](#eminus)  
f. [ePlus](#eplus)  
g. [maxDecimal](#maxdecimal)  
h. [divideByZeroError](#dividebyzeroerror)  
i. [invalidError](#invalidError)  
j. [trim](#trim)  
7. [callback parameter](#callback-parameter)
8. [Return](#return)
9. [Samples](#samples)

# Description
The `exact-math` library is a set of methods for math calculations like: adding, subtracting, multiplying, dividing, rounding, flooring, ceiling and powering.  
It also allows to use [String] math formulas, eg. `5.55*(7/.33)-2`  
It works with big numbers and small decimals and gives a precise result.  
It allows to use [String|Number] values and it gives the [String|Number] result.

# Implementation

#### with NodeJS
`npm install exact-math --save`

```javascript
const exactMath = require('exact-math');
exactMath.add(5, 5); //10
exactMath.sub('25.5','.5'); //25
exactMath.mul(2, '2', 5, .1); //2
exactMath.div('55', 2); //27,5
exactMath.formula('4*(12/3)-7.77'); //8.23
exactMath.round(123456, 5) //120000
exactMath.ceil(0.123456789, -3) //0.124
exactMath.floor(9.999, 1) //9
exactMath.pow(2, 5); //32
```

#### with Browser

#### Add `exact-math.js` library to the HTML file.
The library is located in `./dist/exact-math.js` directory.  
It is a webpack&babel bundled cross-browser library version.  
The library is accessible as `exactMath` variable in the global *(window)* scope.
```html
<head>
  <script src='exact-math.js'></script>
  <script>
     var result = exactMath.mul(.5, .3);
  </script>
</head>
```

# Tests
```
> git clone https://github.com/devrafalko/exact-math.git
> cd exact-math
> npm install
> npm test
```

# Features 

#### How it works:
* check out the [calculation simulator](https://devrafalko.github.io/exact-math/simulator) that shows how the `exact-math` works compared with the JS regular arithmetic operations
* the program computes all possible combinations of calculations between minimal and maximal value entered
* put eg. `min: 1` `max: 5` `step: 0.1` `number: 2` `select: multiplication`


#### Floating point problem:
* all numbers in JavaScript are stored as [IEEE-754 64-bits floating point numbers](http://floating-point-gui.de/)
* the `exact-math` resolves the **floating point problem** and returns the precise result

|Code|JavaScript result|`exact-math` result|
|:---:|:---:|:---:|
| `0.1 + 0.2` |0.30000000000000004|0.3|
| `0.4 * 0.2` |0.08000000000000002|0.08|
| `0.45 - 0.15` |0.30000000000000004|0.3|
| `.82 / 10` |0.08199999999999999|0.082|
| `1.4 - 0.6 - 0.4 - 0.4` |-1.1102230246251565e-16|0|

#### Big integers and small decimals
* If the value is **not a safe integer** *(is bigger than `2⁵³-1` or lower than `-2⁵³-1`)* [\[read more\]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) the result of calculation is **not precise**
* the `exact-math` does the calculations on **big integers** and **small decimals** and gives a precise result

```javascript
const config = { returnString: true };
let result = exactMath.sub('92179342550763210809069221175572', '11779955999989769291989599', config);
//'92179330770807210819299929185973'

let result = exactMath.add('3.00000000000000000015', '12.00000000000000020020', config);
//'15.00000000000000020035'
```


#### Arithmetic formulas
* in order to calculate the mathematical formulas, eg. `2*(5+.3)/13*(2.2*4)`, it must be the part of the code or the `eval()` method must be used
* the `exact-math` allows to calculate the [String] arithmetic formulas, using regular expressions to parse the given formula rather than `eval()` [\[see below\]](#formula)

#### Rounding integers and decimals
* the JavaScript `Math.round` method allows to round the value only to the nearest **integers**. In order to round the value to the chosen decimal place or to the tens, hundreds, thousands, etc., you need some workarounds
* the `exact-math` allows to **round**, **floor** and **ceil** the values both to the whole integers *(ones, tens, hundreds, thousands, etc.)* and decimals *(tenths, hundredths, thousandths, ten-thousandths, etc.)* [\[see below\]](#round-ceil-floor)

# Methods

### `add`, `sub`, `mul`, `div`
#### exactMath.add(x, y[, z[, ...]][, [config](#config-parameter)][, [callback](#callback-parameter)])
> `add`, `sub`, `mul` and `div` methods take the same arguments

#### `x, y`
**Type:** [Number|String]
* **two or more** [Number|String] numerical values **must** be passed as the arguments
* the **third** `z` argument and the **next ones** numerical values are **optional**
* the **subtraction** and **division** calculations are performed **from left to right**
* it accepts all legal [Number] values, eg: `1.5`, `2e+3`, `-.4`
* if the [String] argument is passed, it must be parse-able to the [Number] value, eg: `'1.5'`, `'2e+3'`, `'-.4'`
* it does not accept `NaN`, `Infinity` and `-Infinity`
* see the [\[samples\]](#the-addition-subtraction-division-and-multiplication-methods-usage)

### `formula`
#### exactMath.formula(formula[, [config](#config-parameter)][, [callback](#callback-parameter)])
* the [String] `formula` is an arithmetical formula
* the `exact-math` uses regular expressions to parse [String] formula into the regular JavaScript formula
* **mind** that it does not use `eval()`
* see the [\[samples\]](#the-formula-method-usage)
* The `formula` can contain:
  * `[0-9]` digits
  * `1.5`, `0.5` or `.5` decimal fractions
  * `-5`, `-.4`, `-5.55` negative values
  * `2e-2`, `.25e+12`, `-3e-10` exponential notation values
  * `*` multiplication sign *(also `x`, `×` and `⋅` [see [config.mulChar](#mulchar)])*
  * `/` division sign *(also `:` and `÷` [see [config.divChar](#divchar)])*
  * `+` plus sign
  * `-` subtraction sign
  * `(` and `)` parentheses
* the arithmetic **order of operations** is respected:
  * *parentheses first*
  * *then division and multiplication (from left to right)*
  * *then addition and subtraction (from left to right)*
* the multiplication sign can be omitted before parentheses; *`4(2+1)` is equal to `4*(2+1)`*
* the following signs combinations are allowed:
  * `2 * -2` *equals to `2 * (-2)`*
  * `2 / -2` *equals to `2 / (-2)`*
  * `+2 + 2` *equals to `2 + 2`*
  * `2 + +2` *equals to 2 + 2*
  * `-2 - -2` *equals to `-2 + 2`*
  * `-2 - +2` *equals to `-2 - 2`*
  * `-2 + -2` *equals to `-2 - 2`*
* the (multi)spaces between values, signs and parentheses are allowed:
  * `2 + 2`
  * `2 +  ( -2 - -2)`
  * ` 2  +  (+2  +   +4   /   -1)`
  * `  -.1   -   -5`
  * `2 + 3e-5`
  * `.25e+5 * -.25e-5`
* the spaces are **not allowed** between:
  * negative sign and value: `-2 - - 2`
  * period and digit in decimal fraction: `5 + . 3`
  * exponential notation formula: `.2 e-5`, `2e - 5`, `3e +10`

### `round`, `ceil`, `floor`
#### exactMath.round(value[, places][, [config](#config-parameter)][, [callback](#callback-parameter)])
> `round`, `ceil` and `floor` methods take the same arguments  

#### `value`
**Type:** [Number|String]
* **one** [Number|String] numerical value must be passed as the argument
* it accepts all legal [Number] values, eg: `1.5`, `2e+3`, `-.4`
* if the [String] argument is passed, it must be parse-able to the [Number] value, eg: `'1.5'`, `'2e+3'`, `'-.4'`
* it does not accept `NaN`, `Infinity` and `-Infinity`

#### `places`
**Type:** [Number] *(optional)*  
**Default:** `1`
  * the given `value` will be rounded *(or rounded up when `ceil` or rounded down when `floor`)* to the `places` digit
  * the `places` must be a positive or negative [Number] **integer**
  * the negative `places` value rounds the `value` to the **decimals**. The positive `places` value rounds the `value` to the **integers**.
  * the `0` returns the given `value` without rounding it.
  * when the `places` argument is omitted, the **default** `1` value is used
  * study the table below and see the [\[samples\]](#the-round-ceil-and-floor-methods-usage)

|`places`|exactMath.round|exactMath.floor|exactMath.ceil|
|:---:|:---:|:---:|:---:|
|`0`|`14993.00159`|`14993.00159`|`14993.00159`|
|`1`|`14993`|`14993`|`14994`|
|`2`|`14990`|`14990`|`15000`|
|`3`|`15000`|`14900`|`15000`|
|`4`|`15000`|`14000`|`15000`|
|`5`|`10000`|`10000`|`20000`|
|`6`|`0`|`0`|`100000`|
|`-1`|`14993`|`14993`|`14993.1`|
|`-2`|`14993`|`14993`|`14993.01`|
|`-3`|`14993.002`|`14993.001`|`14993.002`|
|`-4`|`14993.0016`|`14993.0015`|`14993.0016`|
|`-5`|`14993.00159`|`14993.00159`|`14993.00159`|

### `pow`
#### exactMath.pow(value[, power][, [config](#config-parameter)][, [callback](#callback-parameter)])

#### `value`
**Type:** [Number|String]

* **one** [Number|String] numerical value must be passed as the argument
* it accepts all legal [Number] values, eg: `1.5`, `2e+3`, `-.4`
* if the [String] argument is passed, it must be parse-able to the [Number] value, eg: `'1.5'`, `'2e+3'`, `'-.4'`
* it does not accept `NaN`, `Infinity` and `-Infinity`

#### `power`
**Type:** [Number] *(optional)*  
**Default:** `2`
  * the given `value` will be raised to the `power` exponent
  * the `power` must be a positive [Number] **integer**
  * the `value` raised to the **`0`** `power` returns the **`1`** as a result, according to the approved mathematical convention
  * when the `power` argument is omitted, the **default** `2` value is used
  * see the [\[samples\]](#the-pow-method-usage)

# `config` parameter
#### `config`
**Type:** [Object|Boolean] *optional*  
**Default:** `false`
* **each** `exact-math` method may take the `config` argument. It allows to configure the additional settings.
* the `config` argument can be passed as `[Object]` object with config properties or as `[Boolean]` value
* if the `config` argument is passed as `true`, it is the shortcut of the [`config.returnString`](#returnstring) property set to `true` [\[samples\]](#the-config-returnstring-property-set-as-boolean-argument)
* if the `config` argument is passed as `false` or if it is not defined *(it is set to `false` by default then)*, it is the shortcut of the [`config.returnString`](#returnstring) property set to `false` [\[samples\]](#the-config-returnstring-property-set-as-boolean-argument)
* if the `config` argument is passed as [Object] object, it may take the config properties [\[described below\]](#object-config-properties)
* if the `config` argument is not passed or if some [Object] config properties are not defined or defined with the incorrect type or value, the **default** values are used instead for these properties


### [Object] `config` properties:

#### `returnString`
**Type:** [Boolean]  
**Default:** `false`  
* by default, the **[Number]** value is **returned** as the result of the calculation
* if the result value is bigger *(or lower)* than a safe integer `2⁵³-1` or `-2⁵³-1`, the [Number] value  may be inaccurate; `Number('1111222233334444567')` ==> `1111222233334444500`
* if the `returnString` property is set to `true`, the **accuare** [String] value is returned; `'1111222233334444567'`.
* the [String] result can be used to the further `exact-math` calculations as it takes the [String] numerical value arguments [\[see above\]](#x-y)
* see the [\[samples\]](#the-config-returnstring-property-usage)

> If you use [Number] **[unsafe values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)** for the computation, the **imprecise result is returned**;  
eg. `exactMath.add(100000000000000000055,5.00000000000000022)`.  
If you use [Number] **[safe values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)** for the computation it may still return the **imprecise unsafe result value**;  
eg. `exactMath.mul(101101000110,10010110010001) => 1.0120321332222232e+24`.  
In order to avoid the imprecise results always use [String] numerical values for the calculations and set the [`config.returnString`](#returnstring) parameter to `true`.  
The **[String]** numerical values passed as the arguments and the **[String]** result returned by the `exact-math` **are always safe**.

#### `decimalChar`
**Type:** [String|Array:string]  
**Default:** `['.', ',']`
* it applies only for **[String] values**
* in javaScript, the [Number] decimal fraction's notation requires the `.` period character, while out-of-coding notations sometimes also allows `,` comma character
* this setting lets to choose which characters are allowed for decimal fraction values *(the characters other than `.` and `,` will be ignored)*. The default value will be used, if the illegal value has been passed
* the legal `decimalChar` settings samples: `','`, `'.'`, `['.']`, `[',']`, `['.', ',']`, etc. 
* by **default**, the [String] value may contain the decimal fractions with both `.` and `,` character, eg: `'4,5'`, `'3.5 + 2,2'`, `'0,55 / 6.22'`. 
* in order to allow **only** `.` character (and thereby forbid `,` character), set `decimalChar` property to [String] `.` or [Array] `['.']`
* it may turn out handy especially for the end-users that will fill the inputs with some numbers or math formulas, that will be further passed through the `exact-math` module to calculate some result. The `,` usage would not throw an error then
* see the [\[samples\]](#the-config-decimalchar-property-usage)

#### `divChar`
**Type:** [String|Array:string]  
**Default:** `['/', ':', '÷']`
* it applies only for [String] **formulas** in the [`formula`](#formula) method
* in javaScript, the division operation requires the `/` character, while out-of-coding notations sometimes also allows `:` colon or `÷` division sign *(unicode: `'\u00F7'`)* character
* this setting lets to choose which characters are allowed for [`formula`](#formula) division operations *(the characters other than `/`, `:` and `÷` will be ignored)*. The default value will be used, if the illegal value has been passed
* the legal `divChar` settings samples: `'/'`, `':'`, `'÷'` `['/', ':']`, `[':', '÷']`, `['÷', ':', '/']`, `['/']`, etc. 
* by **default**, the [String] formula may contain `/`, `:` and `÷` for division operations, eg: `'22 / 4'`, `100:2`, `'4.5 * (5÷.1)/3'`
* in order to allow **only** `/` character (and thereby forbid `:` and `÷` character), set `divChar` property to [String] `/` or [Array] `['/']`
* it may turn out handy especially for the end-users that will fill the inputs with some division math formulas, that will be further passed through the `exact-math`.`formula` method to calculate some result. The `:` or `÷` usage would not throw an error then
* see the [\[samples\]](#the-config-divchar-property-usage)

#### `mulChar`
**Type:** [String|Array:string]  
**Default:** `['*', 'x', '×', '⋅']`
* it applies only for [String] **formulas** in the [`formula`](#formula) method
* in javaScript, the multiplication operation requires the `*` character, while out-of-coding notations sometimes also allows `x` letter, `⋅` dot operator *(unicode: `'\u22C5'`)* or `×` multiplication sign *(unicode: `'\u00D7'`)* characters
* this setting lets to choose which characters are allowed for [`formula`](#formula) multiplication operations *(the characters other than `*`, `x`, `×` and `⋅` will be ignored)*. The default value will be used, if the illegal value has been passed
* the legal `mulChar` settings samples: `'*'`, `'x'`, `'×'`, `'⋅'`, `['*', 'x', '×', '⋅']`, `['*']`, `['x']`, `['*', '⋅']` etc.
* by **default**, the [String] formula may contain `*`, `x`, `×` and `⋅` for multiplication operations, eg: `'5 * 4'`, `4x2`, `3×6`, `'4.5 * (3x.2)*3'`, `'3 ⋅ 3 \ 2'`
* in order to allow **only** `*` character (and thereby forbid `x`, `×` and `⋅` character), set `mulChar` property to [String] `*` or [Array] `['*']`
* it may turn out handy especially for the end-users that will fill the inputs with some multiplication math formulas, that will be further passed through the `exact-math`.`formula` method to calculate some result. The `x`, `×` or `⋅` usage would not throw an error then
* see the [\[samples\]](#the-config-mulchar-property-usage)

#### `eMinus`
**Type:** [Number]  
**Default:** `7` 
* it applies **for the [String] results only** *(when the [`config.returnString`](#returnstring) property is set to `true` or when the [`callback`](#callback-parameter) is passed)*
* by default, the [String] result for **decimal** values is parsed and written with **exponential notation**, if it has got `7` or more decimal places and it begins with zeros, eg. `'0.01'`, `'0.00001'`, but `'0.1e-7'` rather than `'0.00000001'`.
* set `eMinus` property to the other than default [Number] positive **integer** to decide when the decimal result should be written with exponential notation
* set `Infinity` if the decimal value should never be presented with exponential notation, regardless of how long the [String] decimal value is
* **mind** that `eMinus` **does not round** the value *(like `Number.prototype.toExponential`)* - it only shorten the long-zero values when possible, eg. the `0.123123123123123` will never be shorthened
* this setting may matter for example when the result value is directly printed for the user and you want to avoid displaying the exponential notation in the printed numbers
* it makes no difference for the `exact-math`, whether the [String] value with exponential notation, or without, is passed as the argument for the calculation: `exactMath.add('0.00005','5e-5')`
* see the [\[samples\]](#the-config-eplus-and-eminus-properties-usage)

#### `ePlus`
**Type:** [Number]  
**Default:** `21` 
* it applies **for the [String] results only** *(when the [`config.returnString`](#returnstring) property is set to `true` or when the [`callback`](#callback-parameter) is passed)*
* by default, the [String] result for **integers** is parsed and written with **exponential notation** if it has got `21` or more digits and it ends with zeros, eg. `'10000'`, `'10000000000'`, but `'1e+21'` rather than `'1000000000000000000000'` and `1000000000005e+8` rather than `100000000000500000000`
* set `ePlus` property to the other than default [Number] positive **integer** to decide when the integer result should be written with exponential notation
* set `Infinity` if the integer value should never be presented with exponential notation, regardless of how long the [String] integer value is
* **mind** that `ePlus` **does not round** the value *(like `Number.prototype.toExponential`)* - it only shorten the long-zero values when possible, eg. the `123123123123` will never be shorthened
* this setting may matter for example when the result value is directly printed for the user and you want to avoid displaying the exponential notation in the printed numbers
* it makes no difference for the `exact-math`, whether the [String] value with exponential notation, or without, is passed as the argument for the calculation: `exactMath.add('1e+21','1000000000000000000000')`
* see the [\[samples\]](#the-config-eplus-and-eminus-properties-usage)

#### `maxDecimal`
**Type:** [Number]  
**Default:** `17` 
* it applies **only to division** calculations *(also to division calculations in the `formula` method)*
* if the result of **division** calculation is a **decimal fraction** with a huge or infinite number of decimal places, the `maxDecimal` property indicates the **maximal number of decimal places** of the [String] result value, to avoid stack overflow
* if the result value is a decimal fraction with the number of decimal places higher than the default `17`, it is **rounded** to 17 decimal places
* in order to get more *(or less)* precise result, define `maxDecimal` property with a desirable integer value
* the `maxDecimal` [Number] value must be an **integer**, bigger or equal to `0` and cannot be an `Infinity`
* it **does not round** the results of addition, multiplication or subtraction calculations
* see the [\[samples\]](#the-config-maxdecimal-property-usage)

#### `divideByZeroError`
**Type:** [Boolean|Error|Function]  
**Default:** `false`  
* by default `false`, when the value is **divided by** `0` or if the `0` is **divided by** `0` - the `NaN` is returned as the result
* set `true` in order to **throw** the default error; *This `error` will be thrown only if the [`callback`](#callback-parameter) is not defined. Otherwise it is accessible via the `error` property in the [`callback`](#callback-parameter) function.*
* set [Error] object and it will be thrown **rather than** the default error; *This error will be thrown only if the [`callback`](#callback-parameter) is not defined. Otherwise it is accessible via the `error` property in the [`callback`](#callback-parameter) function.*
* set [Function] and:
  * This function is called **rather than** throwing error
  * This function is called **instead** of `callback` function *(if defined)*
  * If you **return** some value in this function, this value will be returned by the `exact-math` as the **result** of the calculation rather than the default `NaN`
  * The function will be called with the one [Object] argument passed with the following properties:
    * `error`: the default error
    * `index`: the [Number] index of `0`-value argument *(for `div` method, otherwise it is `undefined`)*
    * `list`: the [Array] list of all passed values
    * `callback`: the reference to the [Function] callback *(if defined, otherwise it is `undefined`)*
* see the [\[samples\]](#the-config-dividebyzeroerror-property-usage)

#### `invalidError`
**Type:** [Boolean|Error|Function]  
**Default:** `true`  
* by default `true`, if the argument of incorrect type has been passed, or if it hasn't been passed when required, or if any of the passed numerical value arguments is [String] **incorrect** value, is `NaN`, `Infinity` or `-Infinity` *(that is forbidden)* - the default error is **thrown**; *This error will be thrown only if the [`callback`](#callback-parameter) is not defined. Otherwise it is accessible via the `error` property in the [`callback`](#callback-parameter) function.*
* set `false` and the `NaN` will be returned as the result without throwing an error
* set [Error] object and it will be thrown **rather than** the default error; *This error will be thrown only if the [`callback`](#callback-parameter) is not defined. Otherwise it is accessible via the `error` property in the [`callback`](#callback-parameter) function.*
* set [Function] and:
  * This function is called **rather than** throwing error
  * This function is called **instead** of `callback` function *(if defined)*
  * If you **return** some value in this function, this value will be returned by the `exact-math` as the **result** of the calculation rather than the default `NaN`
  * The function will be called with the one [Object] argument passed with the following properties:
    * `error`: the default error
    * `index`: the [Number] index of the incorrect argument, *(otherwise, if the error does not concern the argument, it is `undefined`)*
    * `list`: the [Array] list of all passed values
    * `callback`: the reference to the [Function] callback *(if defined, otherwise it is `undefined`)*
* see the [\[samples\]](#the-config-invaliderror-property-usage)

#### `trim`
**Type:** [Boolean]  
**Default:** `true`  
* it applies to **round**, **ceil** and **floor** calculations
* by default `true`, when the value is rounded to the decimals, and there are some **zero** decimals at the end of the value *(2.23000)*, they are **trimmed** *(2.23)*
* in order to keep the **fixed** number of decimal integers, set the `trim` config property to `false`
* **have in mind** to set the `returnString` config value to `true`, as the returned `[Number]` result value will have the last decimal zeros trimmed due to the default JavaScript behaviour
* see the [\[samples\]](#the-config-trim-property-usage)


|`places`|value| exactMath.round {trim: true}|exactMath.round {trim: false}|
|:---:|:---:|:---:|:---:|
|`-1`|`15.0006`|`15`|`15.0`|
|`-2`|`15.0006`|`15`|`15.00`|
|`-3`|`15.0006`|`15.001`|`15.001`|
|`-4`|`15.0006`|`15.0006`|`15.0006`|

# `callback` parameter
#### `callback`
**Type:** [Function] *optional*  
**Default:** `undefined`
* if the [Function] `callback` argument is defined, the [`config.divideByZeroError`](#dividebyzeroerror) or [`config.invalidError`](#invalidError) error is not thrown automatically
* the `callback` is called with the one [Object] argument passed with the following properties:
  * `error`  
    If the [`config.divideByZeroError`](#dividebyzeroerror) or [`config.invalidError`](#invalidError) is set to `true`, it refers to the default error.  
    If the [`config.divideByZeroError`](#dividebyzeroerror) or [`config.invalidError`](#invalidError) is set to [Error], it refers to this error.  
    Otherwise it is `null`.
  * `number`  
    If `error` is `null`, it is the [Number] result value of the calculation.  
    Otherwise it is `NaN`
  * `string`  
    If `error` is `null`, it is the [String] result value of the calculation.  
    It is defined regardless of the [`config.returnString`](#returnstring) property.  
    Otherwise it is `NaN`.  
    This value is always accurate for the unsafe numbers `>2⁵³-1 || <-2⁵³-1`.  
    This value can be used for the further `exact-math` calculations.
* see the [\[samples\]](#the-callback-property-usage)


# Return
* by default, the **[Number]** value is returned as the **result** of the calculation
* the **[String]** value is returned as the **result** of the calculation, if the [`config.returnString`](#returnstring) property is set to `true`
* the **`NaN`** is returned if the [`config.invalidError`](#invalidError) property is set to `false` and one of the passed arguments is invalid
* the **`NaN`** is returned if the [`config.divideByZeroError`](#dividebyzeroerror) property is set to `false` and the value is divided by `0` or if `0` is divided by `0`
* the object|value **returned** in the [Function] [`config.divideByZeroError`](#dividebyzeroerror) or [`config.invalidError`](#invalidError) is returned if this function has been called as the sequence of an error occurance

# Samples
##### The `addition`, `subtraction`, `division` and `multiplication` methods usage
```javascript
const exactMath = require('exact-math');
exactMath.add(7, -7, '223', -223); //0
exactMath.add('234.4564395832045903', '-645.266756645345334545345', true); //'-410.810317062140744245345'
exactMath.sub('3.0000000000000005', '2.0000000000000001', '1.0000000000000003'); //1e-16
exactMath.sub('292855679192089e-24', '79958000101700102e-24', true); //'-7.9665144422508013e-8'
exactMath.mul('0.000000001020050888', '0.000000100777030252', true); //'1.02797699198555463776e-16'
exactMath.mul('2345205680246529456', '34957892456802348602346', true); //'81983447959140172789843887025738719703776'
exactMath.div(10, 2, 2, 2, 2); //0.625
exactMath.div(432.5, .11, '2.000000000044', true); //'1965.90909086584090909'
```

##### The `formula` method usage

```javascript
const exactMath = require('exact-math');
exactMath.formula('2 + 2'); //4
exactMath.formula('3*(5-2)'); //9
exactMath.formula(' 2.5  *   2.5  /   .1'); //62.5
exactMath.formula('3.5+5*(-4-(3/(3+1)-12*3-.2*22)-16/4*12-5/(2)+3.5+2.5*(1.5-2*7))-16'); //-225.5
exactMath.formula('.25e+2*10'); //250
```

##### The `round`, `ceil` and `floor` methods usage
```javascript
const exactMath = require('exact-math');
exactMath.round(880225, 4); //880000
exactMath.ceil(99999995, 4); //100000000
exactMath.floor(99999995, 3); //99999900
exactMath.ceil(0.123, 3); //100
exactMath.ceil(0.000028, -1); //0.1
exactMath.round(0.000028, -5); //0.00003
exactMath.floor(0.000028, -5); //0.00002
exactMath.floor('99999.0000009910009', -5); //99999
exactMath.ceil('99999.0000009910009', -5); //99999.00001
```

##### The `pow` method usage
```javascript
const exactMath = require('exact-math');
exactMath.pow(2, 0); //1
exactMath.pow(155.55, 0); //1
exactMath.pow(2, 1); //2
exactMath.pow(2, 2); //4
exactMath.pow(2, 100, { returnString: true }); //'1267650600228229401496703205376'
exactMath.pow(-2, 6); //64
exactMath.pow(5.55, 5); //948.79400625
exactMath.pow(.1, 150); //1e-150
```

##### The config `returnString` property set as [Boolean] argument
```javascript
const exactMath = require('exact-math');
exactMath.add(22, 55); //77 [Number]
exactMath.add(22, 55, false); //77 [Number]
exactMath.add(22, 55, true); //'77' [String]
exactMath.mul('0.20', '0.3000000'); //0.06 [Number]
exactMath.div('9947619', 25, false); //397904.76 [Number]
exactMath.round('99999.0000009910009', -7, true); //'99999.000001' [String]
exactMath.sub(0.000008, 0.000003); //0.000005 [Number]
exactMath.floor('9081726354.4536271809', -2, false); //9081726354.45 [Number]
exactMath.pow(10, 19, true); //'10000000000000000000' [String]
```

##### The config `returnString` property usage
```javascript
const exactMath = require('exact-math');
exactMath.add(2, 2, { returnString: false }); //4
exactMath.sub('100', '5', { returnString: false }); //95
exactMath.round(2.22, -1, { returnString: true }); //'2.2'
exactMath.pow(3, 3, { returnString: true }) //'27'
```

##### The config `decimalChar` property usage
```javascript
const exactMath = require('exact-math');
exactMath.add('5.55', '3,33'); //8.88
exactMath.sub('5.55', '3,33', { decimalChar: ['.', ','] }); //2.22

exactMath.mul('5.55', '3,33', { decimalChar: '.' }); //[Error]: Incorrect argument [1]. The [String] argument is not a valid numerical value.
exactMath.formula('5.55 + 3,33', { decimalChar: ',' }) //[Error]: The [String] formula contains illegal character .
```

##### The config `divChar` property usage
```javascript
const exactMath = require('exact-math');
exactMath.formula('(6÷2)*(4/2)*(9:.5)'); //108
exactMath.formula('(6÷2)*(4/2)*(9:.5)', { divChar: ['÷', ':', '/'] }); //108
exactMath.formula('(6÷2)*(4/2)*(9:.5)', { divChar: [':', '÷'] }); //[Error]: The [String] formula contains illegal character /
exactMath.formula('10/2', { divChar: ['/'] }); //5
exactMath.formula('10÷2', { divChar: ['÷'] }); //5
```

##### The config `mulChar` property usage
```javascript
const exactMath = require('exact-math');
exactMath.formula('5*5 + 5x5 + 5⋅5 + 5×5'); //100
exactMath.formula('5*5 + 5x5 + 5⋅5 + 5×5', { mulChar: ['*', 'x', '⋅', '×'] }); //100
exactMath.formula('5*5 + 5x5 + 5⋅5 + 5×5', { mulChar: ['x'] }); //[Error]: The [String] formula contains illegal character *
exactMath.formula('5*5', { mulChar: '*' }); //25
exactMath.formula('5*5 + 5⋅5', { mulChar: ['*', '⋅'] }); //50
```

##### The config `ePlus` and `eMinus` properties usage
```javascript
const exactMath = require('exact-math');

exactMath.add('1005000000000','4400000000000000000000000', { returnString: true }); //'4400000000001005e+9'
exactMath.add('0.0000000000000001','0.000000000000000000001', { returnString: true }); //'1.00001e-16'
exactMath.sub('0.0000012',0.000023, { returnString: true }); //'-2.18e-5'
exactMath.mul(0.000005,0.000005, { returnString: true }); //'2.5e-11'
exactMath.formula('1e+5*1e+5*1e+5*1e+5', { returnString: true }); //'1e+20'
exactMath.formula('1/10000000', { returnString: true }); //'1e-7'

exactMath.add('5000', 5000, { returnString: true, ePlus: 0 }); //'1e+4'
exactMath.mul(200,400,600,800,1000,1200,1400,1600, { returnString: true, ePlus: 25 }); //'103219200000000000000000'

exactMath.div(1, 10e+10, { returnString: true, eMinus: 0 }); //'1e-11'
exactMath.formula('6(.2*.15)/1000+2/2000*.00000022', { returnString: true, eMinus: 12 }); //'0.00018000022'
exactMath.pow(0.3, 20, { returnString: true, eMinus: 0 }); //'3.486784401e-11'
exactMath.pow(0.3, 20, { returnString: true, eMinus: 21 }); //'0.00000000003486784401'

exactMath.add('200000','500000000000','10000000000000000','62000000000000000000000000000000', { returnString: true, ePlus: Infinity }); //'62000000000000010000500000200000'
exactMath.pow(0.037, 17, { returnString: true, eMinus: Infinity }); //'0.000000000000000000000000456487940826035155404146917'
```

##### The config `maxDecimal` property usage
```javascript
const exactMath = require('exact-math');
exactMath.div(16.22, 7.77, { returnString: true }); //'2.08751608751608752'
exactMath.div(16.22, 7.77, { returnString: true, maxDecimal: 5 }); //'2.08752'
exactMath.div(16.22, 7.77, { returnString: true, maxDecimal: 25 }); //'2.0875160875160875160875161'
exactMath.formula('2/3.33+2/3.33', { returnString: true}); //'1.2012012012012012'
exactMath.formula('2/3.33+2/3.33', { returnString: true, maxDecimal: 1 }); //'1.2'
exactMath.formula('2/3.33+2/3.33', { returnString: true, naxDecimal: 30}); //'1.201201201201201201201201201202'
```

##### The config `divideByZeroError` property usage
```javascript
const exactMath = require('exact-math');
const config = { divideByZeroError: false };

exactMath.div(0, 0); //NaN
exactMath.formula('2/0'); //NaN
exactMath.div(55, 0, 2.5, config); //NaN
exactMath.formula('2*(9/(2-2))', config); //NaN
```

```javascript
const exactMath = require('exact-math');
const config = { divideByZeroError: true };

exactMath.div(55, 0, 2.5, config); //[Error]: Incorrect argument [1]. The division by zero is not allowed.
exactMath.formula('2*(9/(2-2))', config); //[Error]: Invalid '(9/(2-2))' expression. The division by zero is not allowed.
exactMath.div(55, 0, 2.5, config, (o)=>{
  console.log(o.number); //NaN
  console.error(o.error); //[Error]: Incorrect argument [1]. The division by zero is not allowed.
}); 
```

```javascript
const exactMath = require('exact-math');
const customError = new Error('Division by zero.');
const config = { divideByZeroError: customError };

exactMath.div(55, 0, 2.5, config); //[Error]: Division by zero.
exactMath.formula('2*(9/(2-2))', config); //[Error]: Division by zero.
exactMath.div(55, 0, 2.5, config, (o)=>{
  console.log(o.number); //NaN
  console.error(o.error); //[Error]: Division by zero.
}); 
```

```javascript
const exactMath = require('exact-math');
const config = {
  divideByZeroError: ({ list }) => {
    if(list[0] != 0) return Infinity;
    else return NaN;
  }
};

console.log(exactMath.div(0, 0, config)); //NaN
console.log(exactMath.div(0, 1, config)); //0
console.log(exactMath.div(1, 0, config)); //Infinity
```

##### The config `invalidError` property usage

```javascript
const exactMath = require('exact-math');
exactMath.add(Infinity, 5); //[TypeError]: Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.
exactMath.add(Infinity, 5, { invalidError: true}); //[TypeError]: Incorrect argument [0]. The argument cannot be an Infinity or -Infinity value.
exactMath.div(10, NaN); //[TypeError]: Incorrect argument [1]. The argument cannot be a NaN value.
exactMath.div(10, NaN, { invalidError: true}); //[TypeError]: Incorrect argument [1]. The argument cannot be a NaN value.
exactMath.sub(); //[Error]: Set at least two [Number|String] values.
exactMath.pow(2, 2.5); //[Error]: Incorrect argument [1]. The [Number] power exponent positive integer is expected.
```

```javascript
const exactMath = require('exact-math');
const config = { invalidError: false };
exactMath.add(Infinity, 5, config); //NaN
exactMath.div(10, NaN, config); //NaN
exactMath.formula('hello world', config); //NaN
```

```javascript
const exactMath = require('exact-math');
const customError = new Error('Some error message.');
const config = { invalidError: customError };

exactMath.add(Infinity, 5, config); //[Error]: Some error message.
exactMath.div(10, NaN, config); //[Error]: Some error message.
exactMath.formula('hello world', config); //[Error]: Some error message.
```

```javascript
const exactMath = require('exact-math');
const config = {
  invalidError: ({ error, index, list, callback }) => {
    throw error; //the default error
  }
};

exactMath.formula('2 * (4/12', config);
exactMath.div('6.66', '5..3', config);
```

##### The config `trim` property usage
```javascript
const exactMath = require('exact-math');
const config = {
  returnString: true,
  trim: false
};

exactMath.round(44, -3, config); //44.000
exactMath.round(.00015, -3, config); //0.000
exactMath.round(.22, -5, config); //0.22000
exactMath.round(.222, -1, config); //0.2
```


##### The `callback` property usage
```javascript
const exactMath = require('exact-math');

exactMath.add(NaN, 10, '3', ({ error, number, string }) => {
  if(error) throw error; //[TypeError]: Incorrect argument [0]. The argument cannot be a NaN value.
})

exactMath.mul('236452e3', '2.22', ({ error, number, string }) => {
  const result = exactMath.div(string, 10);
})

exactMath.formula('17/4.44', { maxDecimal: 30 }, ({error, number, string})=>{
  console.log(error); //null
  console.log(number); //3.828828828828829
  console.log(string); //'3.828828828828828828828828828829'
});
```
