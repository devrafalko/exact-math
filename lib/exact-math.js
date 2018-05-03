var exactMath = {
	add: function(){
		return mathFunctions.addSubDiv(arguments,0);
	},
	sub: function(){
		return mathFunctions.addSubDiv(arguments,1);
	},
	mul: function(){
		return mathFunctions.mul(arguments);
	},
	div: function(){
		return mathFunctions.addSubDiv(arguments,3);
	}
};

var mathFunctions = {
	addSubDiv: function(argArray,oper){
		if(argArray.length === 1) {
			return argArray[0];
		}
		var args = this.countDecimals(this.validMe(argArray));
		var hComma = this.biggestComma(args);
		var shifted = oper !== 3 ? hComma:0;
		var res = this.shiftComma(this.countResult(this.toExponent(args,hComma),oper),shifted);
		this.isSafeInteger(res);
		return res;
	},
	mul: function(argArray){
		if(argArray.length === 1) {
			return argArray[0];
		}
		var args = this.countDecimals(this.validMe(argArray));
		var intArr = [];
		var commaSum = 0;
		for (var i in args){
			commaSum += args[i].comma;
			intArr.push(args[i].integer);
		}
		return this.shiftComma(this.countResult(intArr,2),commaSum);
	},
	isSafeInteger: function(result){
		if(result<=-(Math.pow(2,53)-1)||result>=(Math.pow(2,53)-1)) throw "The result is not a safe integer.";
	},
	shiftComma: function(result,commaPos){
		return this.toExponent(this.countDecimals([result]),-commaPos)[0];
	},
	countResult: function(nums,operation){
		var result = nums[0];
		for(var i=1;i<nums.length;i++){
			switch(operation){
				case 0:
					result += nums[i];
					break;
				case 1:
					result -= nums[i];
					break;
				case 2:
					result *= nums[i];
					break;
				case 3:
					result /= nums[i];
					break;
			}
		}
		return result;
	},
	toExponent: function(args,commaPos){
		var returned = [];
		for(var i in args){
			args[i].comma -= commaPos;
			var sign = args[i].comma>=0 ? "+":"";
			returned.push(Number(args[i].integer.toString()+"e"+sign+args[i].comma));
		}
		return returned;
	},
	biggestComma: function(args){
		var commaAr = [];
		for(var i in args){
			commaAr.push(args[i].comma);
		}
		return Math.min.apply(null,commaAr);
	},
	validMe: function(args){
		if(args.length<2) throw "Set at least one numerical value.";
		for(var i in args){
			args[i] = parseFloat(args[i]);
			if(typeof args[i] !== "number" || isNaN(args[i])) throw "Every smMath argument must be of type number.";
			if(args[i] === Number.POSITIVE_INFINITY || args[i] === Number.NEGATIVE_INFINITY) throw "Every smMath argument must be a numerical value between positive and negative Infinity.";
		}
		return args;
	},
	countDecimals: function(args){
		var decimals = [];
		for(var i in args){
			var partDec = 0;
			var splitted = args[i].toString().split("e");
			var commaPos = splitted[0].indexOf(".");
			partDec -= commaPos !== -1 ? splitted[0].length - 1 - commaPos:0;
			partDec += isNaN(Number(splitted[1])) ? 0:Number(splitted[1]);
			splitted[0] = Number(splitted[0].replace(".",""));
			decimals.push({integer:splitted[0],comma:partDec});
		}
		return decimals;
	}
};

if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports) {
  module.exports = exactMath;
}
