### In This Documentation
1. [Description](#description)
2. [Browser Support](#browser-support)
3. [Methods](#methods)
4. [Syntax](#syntax)
5. [Implementation](#implementation)
6. [License](#License)


# Description

##### How does **smMath** work?
All numbers in JavaScript are stored as 64-bits Floating point numbers. JavaScript has difficulties with precise floating point values.

|Code|Result|
|:---:|:---:|
|var result = 0.1 + 0.2;|0.30000000000000004|
|var result = 0.4 * 0.2|0.08000000000000002|
|var result = 0.45 - 0.15;|0.30000000000000004|
|var result = .82 / 10;|0.08199999999999999|

##### What can I use **smMath** for?
 * you can do simple multipication, division, subtraction and addition arithmetic calculations and get precise results.
 * you can use smMath to compare two results in `if()` condition.
 * you can use smMath results as output values displayed for the users. (prevent `0.30000000000000004$`)

##### Where can I check how does **smMath** work?
###### The calculation simulator with smMath implementation:
* https://devrafalko.github.io/smMath
* The program computes all possible combinations of calculations between minimal and maximal value entered.
* Put `min:1` `max:5` `step:0.1` `number:2` `select:multiplication` as example
* You can check the difference in computing between js regular arithmetic operations and smMath arithmetic operations *(the errors will be shown)*.

# Browser Support
|Chrome|Firefox|IE|Safari|Opera|
:---:|:---:|:---:|:---:|:---:|
|yes|yes|yes|yes|yes|

# Methods
|name|description|syntax|parameters description|return value|
|:---:|:---|:---:|:---:|:---:|
|add|`smMath.add()` adds numerical values put as arguments.|`smMath.add(arg1,arg2,...)`|You can set any number, but at least two, numerical values. You can set `variables` or `array`'s items or `functions` witch represent/return `number` data-type values. Set each next argument preceded by comma. Don't use arithmetic signs between arguments.|The result of addition operation.|
|sub|`smMath.sub()` subtracts numerical values put as arguments (from left to righ).|`smMath.sub(arg1,arg2,...)`|You can set any number, but at least two, numerical values. You can set `variables` or `array`'s items or `functions` witch represent/return `number` data-type values. Set each next argument preceded by comma. Don't use arithmetic signs between arguments.|The result of subtraction operation.|
|mul|`smMath.mul()` multiplies numerical values put as arguments.|`smMath.mul(arg1,arg2,...)`|You can set any number, but at least two, numerical values. You can set `variables` or `array`'s items or `functions` witch represent/return `number` data-type values. Set each next argument preceded by comma. Don't use arithmetic signs between arguments.|The result of multiplication operation.|
|div|`smMath.div()` divides numerical values put as arguments (from left to righ).|`smMath.div(arg1,arg2,...)`|You can set any number, but at least two, numerical values. You can set `variables` or `array`'s items or `functions` witch represent/return `number` data-type values. Set each next argument preceded by comma. Don't use arithmetic signs between arguments.|The result of division operation.|
# Syntax
```javascript
var mul = smMath.mul(.1,.2,.5,.7);  //0.007
var sub = smMath.sub(10,0.5,2,3);    //4.5

var arr = [.1,.2,.4,.05,7];
var fun = function(i){return arr[i]};
var add = smMath.add(arr[1],fun(2),5.3);    //5.9

var a = smMath.add(5,3);
var b = smMath.sub(9,1);
var c = smMath.mul(a,b,smMath.div(10,2));   //320

var d = 34e-5;
var e = .1254e+3;
var f = smMath.mul(d,e);    //0.042636

```

# Implementation

#### 1. Include smMath.js on your site.
```html
<script src="smMath.js"></script>
```
> Any outer libraries needed. It is a fully JavaScript project.

#### 2. Use smMath the way you want.
```javascript
var a = smMath.mul(.5,.3);
```

# License
Released under the MIT license.
>Copyright (c) 2016 Paweł Rafałko dev.rafalko@gmail.com

>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

>The above copyright notice and this permission notice **shall be included** in all
copies or substantial portions of the Software.

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
