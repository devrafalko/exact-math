/* global smMath */

window.onload = function(){
	formValid.initialization();
};

formValid = {
	cont: null,
	inputNum: 0,
	resBut: null,
	rubBut: null,
	butVals: ["Run","Stop"],
	textArea: null,
	output1: null,
	output2: null,
	errorStyle: "color:#ef5350;",
	unblockStyle: "color: #1de9b6;cursor:pointer;",
	current: null,
	outMessage: "",
	buttonState: "false",
	isValid: [],
	myInterval: null,
	intervalStep: 10,
	
	initialization: function(){
		
		formValid.cont = document.getElementById("calcTest");
		formValid.rubBut = document.getElementById("validRun");
		formValid.rubBut.value = formValid.butVals[0];
		formValid.resBut = document.getElementById("validReset");
		formValid.textArea = document.getElementById("outputCont");
		formValid.inputLog = formValid.textArea.children[0];
		formValid.output1 = document.getElementById("validEquation1");
		formValid.output2 = document.getElementById("validEquation2");
		formValid.output1.addEventListener("scroll",formValid.scrolluj);
		formValid.output2.addEventListener("scroll",formValid.scrolluj);
		
		var input = formValid.cont.children;
	
		for(var i =0;i<formValid.cont.children.length;i++){
				if(input[i].getAttribute("type")==="text"){
					input[i].addEventListener("focus", formValid.walidacja);
					input[i].addEventListener("input", formValid.walidacja);
					input[i].addEventListener("input", formValid.stylowanie);
					input[i].addEventListener("input", formValid.blokada);
					input[i].addEventListener("blur", formValid.stylowanie);
					input[i].addEventListener("blur", formValid.blokada);
					input[i].setAttribute("data-valid",i);
					
					formValid.inputNum++;
					formValid.isValid.push(false);
				}
			}
	},
	walidacja:function(event){
		var setElement = Number(this.getAttribute("data-valid"));
		formValid.outMessage = "";
		formValid.current = this;
		
		switch(setElement){
			case 0:
				formValid.defMet.isNumber("Wprowadź liczbową wartość początkową.");
				break;
			case 1:
				formValid.defMet.isNumber("Wprowadź liczbową wartość końcową.");
				break;
			case 2:
				formValid.defMet.isNumber("Wprowadź liczbową wartość przeskoku.");
				break;
			case 3:
				formValid.defMet.isNumber("Wprowadź liczbę kombinacji.");
				formValid.defMet.minMax(2,10,"Wprowadź wartość pomiędzy 2 a 10.");
				break;
		}
		
		if(formValid.outMessage!==""){
			formValid.inputLog.innerHTML = formValid.outMessage;
			formValid.isValid[setElement] = false;
			
			
			
		} else {
			formValid.isValid[setElement] = true;
			formValid.inputLog.innerHTML = "";
			

		}
			formValid.textArea.style.height = formValid.inputLog.scrollHeight + "px";
		
	},
	stylowanie: function(event){
		if(formValid.outMessage!==""){
			this.style = formValid.errorStyle;
			this.style.color = "#ef5350";
		} else {
			this.style = null;
			this.style.color = "#1de9b6";
		}
		
	},
	blokada: function(event){
		var checkBoxes = 0;
		for(var i =0;i<formValid.inputNum;i++){
			if(formValid.isValid[i]){
				checkBoxes++;
			}
		}
		if(checkBoxes===formValid.inputNum){
			formValid.rubBut.addEventListener("click", formValid.uruchom);
			formValid.resBut.addEventListener("click", formValid.resetuj);
			formValid.rubBut.style = formValid.unblockStyle;
			formValid.resBut.style = formValid.unblockStyle;
		} else {
			formValid.rubBut.removeEventListener("click", formValid.uruchom);
			formValid.resBut.removeEventListener("click", formValid.resetuj);
			formValid.rubBut.style = null;
			formValid.resBut.style = null;
		}
	},
	uruchom: function(event){
		if(formValid.buttonState){
			formValid.buttonState = false;
			formValid.rubBut.value = formValid.butVals[1];
			formValid.myInterval = setInterval(licz.obliczaj,formValid.intervalStep);
				for(var i =0;i<formValid.inputNum;i++){
					formValid.cont.children[i].setAttribute("readonly","readonly");
				}
				if(!licz.countingState){
					var arg = formValid.cont.children;
					licz.countingState = true;
					licz.inicjuj(arg[0],arg[1],arg[2],arg[3],arg[4]);
				}
		} else {
			formValid.buttonState = true;
			formValid.rubBut.value = formValid.butVals[0];
			clearInterval(formValid.myInterval);
				for(var i =0;i<formValid.inputNum;i++){
					formValid.cont.children[i].removeAttribute("readonly");
				}
		}		
	},
	resetuj: function(event){
		clearInterval(formValid.myInterval);
		formValid.inputLog.innerHTML = "";
		formValid.textArea.style.height = formValid.inputLog.scrollHeight + "px";
		formValid.output1.innerHTML = "";
		formValid.output2.innerHTML = "";
		formValid.buttonState = false;
		formValid.uruchom();
		
			for(var i =0;i<formValid.inputNum;i++){
				formValid.cont.children[i].value=null;
				formValid.isValid[i] = false;
			}		
		
		formValid.blokada();
		licz.countingState = false;


	},
	scrolluj: function(event){
		if(this===formValid.output1){
			formValid.output2.scrollTop = formValid.output1.scrollTop;
		}
		if(this===formValid.output2){
			formValid.output1.scrollTop = formValid.output2.scrollTop;
		}
		
		
	},
	defMet: {
		isNumber: function(returnVal){
			if(formValid.current.value===""||isNaN(formValid.current.value)||formValid.current.value.match(/\s/g)){
				
						formValid.outMessage += returnVal + "<br/>";
					}	
		},
		minMax: function(min,max,returnVal){
			var min = min===null? -Infinity:min;
			var max = max===null? Infinity:max;
			if((formValid.current.value<min||formValid.current.value>max)||(isNaN(Number(formValid.current.value)))){
						formValid.outMessage += returnVal + "<br/>";
					}				
		}

		
	}
};



var licz = {
	countingState: false,
	min: null,
	max: null,
	step: null,
	number: null,
	operation: null,
	mainCounter:0,
	errors:0,
	combinations:[],
	operator: [" / "," * "," + ", " - "],
	operatorId: ["div","mul","add","sub"],
	combinationNumber: null,
	counter: 0,
	proc: 0,
	
	inicjuj:function(min,max,step,num,op){
		licz.min = Number(min.value);
		licz.max = Number(max.value);
		licz.step = Number(step.value);
		licz.number = Number(num.value);
		licz.operation = op.value;
		licz.mainCounter = 0;
		licz.combinations = [];
		licz.errors = 0;
		licz.counter = 0;
		licz.proc = 0;
		
		for(var i=0;i<licz.number;i++){
			licz.combinations.push(licz.min);
		}
		
		var valueRange = Math.abs(licz.max-licz.min);
		var stepCounter = Math.floor(smMath.div(valueRange,licz.step))+1;
		var combinCount = stepCounter;
		
			for(var i=0;i<licz.number-1;i++){
				combinCount *= stepCounter;
			};
		
		licz.combinationNumber = combinCount;
		
		formValid.inputLog.innerHTML = "";
		formValid.output1.innerHTML = "";
		formValid.output2.innerHTML = "";
		formValid.textArea.style.height = formValid.inputLog.scrollHeight + "px";
		
	},
	obliczaj:function(){

		for(var i=0;i<licz.combinations.length;i++){
			if(licz.combinations[i]>licz.max){
				licz.combinations[i] = licz.min;
				if(i+1<licz.combinations.length){
					licz.combinations[i+1] = smMath.add(licz.combinations[i+1],licz.step);
				} else {
					licz.zakoncz();
					return;
				}
			}
		}

		var argsExecution = licz.combinations.toString();
		var argsEquation = licz.combinations.join(licz.operator[licz.operation]);
		var execution = "smMath."+licz.operatorId[licz.operation]+"("+argsExecution+");";
		var equation = argsEquation + " = ";
		var regularResult = eval(argsEquation);
		var smMathResult = eval(execution);
		
		var output1 = equation + regularResult;
		var output2 = equation + smMathResult;
		if(output1!==output2){
			licz.errors++;
		}
		var inner1 = formValid.output1.innerHTML;
		var inner2 = formValid.output2.innerHTML;

		formValid.output1.innerHTML = output1+"<br/>"+inner1;
		formValid.output2.innerHTML = output2+"<br/>"+inner2;
		
		licz.combinations[0] = smMath.add(licz.combinations[0],licz.step);
		licz.counter++;
		licz.proc = Number(((smMath.div(licz.counter,licz.combinationNumber))*100).toFixed()) + "%";
		
		
		formValid.inputLog.innerHTML = "Wykonałem: "+licz.proc+"<br/>";
		formValid.inputLog.innerHTML += "Wykonałem operacji: "+licz.counter+"<br/>";
		formValid.inputLog.innerHTML += "Wykryłem błędów: "+licz.errors+"<br/>";
		formValid.textArea.style.height = formValid.inputLog.scrollHeight + "px";
		
	},
	zakoncz: function(){
		clearInterval(formValid.myInterval);
		formValid.buttonState = false;
		formValid.uruchom();
		formValid.blokada();
		licz.countingState = false;
	}
};



