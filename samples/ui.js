/* global exactMath */

window.onload = function(){
  formValid.initMe();
};

formValid = {
  cont: null,
  inputNum: 0,
  resBut: null,
  runBut: null,
  butVals: ["Run","Stop"],
  textArea: null,
  output1: null,
  output2: null,
  okStyle: "#6CBCF4",
  errorStyle: "#ef5350",
  current: null,
  outMessage: "",
  buttonState: "false",
  isValid: [],
  myInterval: null,
  intervalStep: 10,
  initMe: function(){
    var bValidMe = this.validMe.bind(this);
    var bStyleMe = this.styleMe.bind(this);
    var bBlockMe = this.blockMe.bind(this);
    var bScrollMe = this.scrollMe.bind(this);
    var bRunMe = this.runMe.bind(this);
    var bResetMe = this.resetMe.bind(this);
    this.cont = document.getElementById("panel");
    this.runBut = document.getElementById("validRun");
    this.runBut.value = this.butVals[0];
    this.resBut = document.getElementById("validReset");
    this.textArea = document.getElementById("outputCont");
    this.logMessage = document.getElementById("logMessage");
    this.output1 = document.getElementById("validEquation1");
    this.output2 = document.getElementById("validEquation2");
    this.output1.addEventListener("scroll",bScrollMe);
    this.output2.addEventListener("scroll",bScrollMe);
    this.runBut.addEventListener("click", bRunMe);
    this.resBut.addEventListener("click", bResetMe);

    var input = this.cont.children;
    for(var i =0;i<this.cont.children.length;i++){
      if(input[i].getAttribute("type")==="text"){
        input[i].addEventListener("focus", bValidMe);
        input[i].addEventListener("input", bValidMe);
        input[i].addEventListener("input", bStyleMe);
        input[i].addEventListener("input", bBlockMe);
        input[i].addEventListener("blur", bStyleMe);
        input[i].addEventListener("blur", bBlockMe);
        input[i].setAttribute("data-valid",i);
        this.inputNum++;
        this.isValid.push(false);
      }
    }
  },
  validMe:function(event){
    var bIsNumber = this.defMet.isNumber.bind(this);
    var bMinMax = this.defMet.minMax.bind(this);
    var bBiggerThan = this.defMet.biggerThan.bind(this);
    var bLowerThan = this.defMet.lowerThan.bind(this);
    var elem = Number(event.target.getAttribute("data-valid"));
    this.outMessage = "";
    this.current = event.target;
    switch(elem){
      case 0:
        bIsNumber("&#129170;Enter the initial numerical value.",elem);
        bLowerThan("&#129170;Enter the value lower than max value.",elem);
        break;
      case 1:
        bIsNumber("&#129170;Enter the final numerical value.",elem);
        bBiggerThan("&#129170;Enter the value higher than min value.",elem);
        break;
      case 2:
        bIsNumber("&#129170;Enter the step numerical value.",elem);
        break;
      case 3:
        bIsNumber("&#129170;Enter the number of counting combinations.",elem);
        bMinMax(2,10,"&#129170;Enter the value between 2 and 10.",elem);
        break;
    }
    if(this.outMessage!==""){
      this.logMessage.innerHTML = this.outMessage;
      } else {
        this.logMessage.innerHTML = "";
        }
    this.textArea.style.height = this.logMessage.scrollHeight + "px";
  },
  styleMe: function(event){
    if(this.outMessage!==""){
      event.target.style.color = this.errorStyle;
    } else {
      event.target.style = null;
      event.target.style.color = this.okStyle;
    }
  },
  blockMe: function(event){
    var checkBoxes = 0;
    for(var i =0;i<this.inputNum;i++){
      if(this.isValid[i]){
        checkBoxes++;
      }
    }
    if(checkBoxes===this.inputNum){
      this.runBut.removeAttribute("disabled");
      this.resBut.removeAttribute("disabled");
      this.runBut.style.color = this.okStyle;
      this.runBut.style.cursor = "pointer";

      this.resBut.style.color = this.okStyle;
      this.resBut.style.cursor = "pointer";

      } else {
        this.runBut.setAttribute("disabled","disabled");
        this.resBut.setAttribute("disabled","disabled");
        this.runBut.style = null;
        this.resBut.style = null;
        }
  },
  runMe: function(event){
    var bComputeMe = countMe.computeMe.bind(countMe,this);
    if(this.buttonState){
      this.buttonState = false;
      this.runBut.value = this.butVals[1];
      this.myInterval = window.setInterval(bComputeMe,this.intervalStep);
        for(var i =0;i<this.inputNum;i++){
          this.cont.children[i].setAttribute("readonly","readonly");
        }
        if(!countMe.countingState){
          var arg = this.cont.children;
          countMe.countingState = true;
          countMe.initMe([arg[0],arg[1],arg[2],arg[3],arg[4]],this);
        }
    } else {
      this.buttonState = true;
      this.runBut.value = this.butVals[0];
      clearInterval(this.myInterval);
        for(var i =0;i<this.inputNum;i++){
          this.cont.children[i].removeAttribute("readonly");
        }
    }		
  },
  resetMe: function(event){
    clearInterval(this.myInterval);
    this.logMessage.innerHTML = "";
    this.textArea.style.height = this.logMessage.scrollHeight + "px";
    this.output1.innerHTML = "";
    this.output2.innerHTML = "";
    this.buttonState = false;
    this.runMe();
      for(var i =0;i<this.inputNum;i++){
        this.cont.children[i].value=null;
        this.isValid[i] = false;
      }		
    this.blockMe();
    countMe.countingState = false;
  },
  scrollMe: function(event){
    if(event.target===formValid.output1){
      this.output2.scrollTop = this.output1.scrollTop;
    }
    if(event.target===formValid.output2){
      this.output1.scrollTop = this.output2.scrollTop;
    }
  },
  defMet: {
    isNumber: function(returnVal,elem){
      if(this.current.value===""||isNaN(this.current.value)||this.current.value.match(/\s/g)){
        this.outMessage += returnVal + "<br/>";
        this.isValid[elem] = false;
        } else {
          this.isValid[elem] = true;
          }
    },
    minMax: function(min,max,returnVal,elem){
      var mn = min===null? Number.NEGATIVE_INFINITY:min;
      var mx = max===null? Number.POSITIVE_INFINITY:max;
      if((this.current.value<mn||this.current.value>mx)||(isNaN(Number(this.current.value)))){
        this.outMessage += returnVal + "<br/>";
        this.isValid[elem] = false;
        } else {
          this.isValid[elem] = true;
          }			
    },
    biggerThan: function(returnVal,elem){
      if(Number(this.current.value)<=Number(this.cont.children[0].value)){
        this.outMessage += returnVal + "<br/>";
        this.cont.children[0].style.color = this.errorStyle;
        this.isValid[elem] = false;
        this.isValid[0] = false;
        } else {
          this.cont.children[0].style = null;
          this.cont.children[0].style.color = this.okStyle;
          this.isValid[elem] = true;
          this.isValid[0] = true;
          }
    },
    lowerThan: function(returnVal,elem){
      if(Number(this.current.value)>=Number(this.cont.children[1].value)){
        this.outMessage += returnVal + "<br/>";
        this.cont.children[1].style.color = this.errorStyle;
        this.isValid[elem] = false;
        this.isValid[1] = false;
        } else {
          this.cont.children[1].style = null;
          this.cont.children[1].style.color = this.okStyle;
          this.isValid[elem] = true;
          this.isValid[1] = true;
          }
    }
  }
};

var countMe = {
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

  initMe:function(vals,obj){
    this.min = Number(vals[0].value);
    this.max = Number(vals[1].value);
    this.step = Number(vals[2].value);
    this.number = Number(vals[3].value);
    this.operation = vals[4].value;
    this.mainCounter = 0;
    this.combinations = [];
    this.errors = 0;
    this.counter = 0;
    this.proc = 0;

    for(var i=0;i<this.number;i++){
      this.combinations.push(this.min);
    }

    var valueRange = Math.abs(this.max-this.min);
    var stepCounter = Math.floor(exactMath.div(valueRange,this.step))+1;
    var combinCount = stepCounter;

    for(var i=0;i<this.number-1;i++){
      combinCount *= stepCounter;
    };

    this.combinationNumber = combinCount;

    obj.logMessage.innerHTML = "";
    obj.output1.innerHTML = "";
    obj.output2.innerHTML = "";
    obj.textArea.style.height = obj.logMessage.scrollHeight + "px";
  },
  computeMe:function(obj){
    for(var i=0;i<this.combinations.length;i++){
      if(this.combinations[i]>this.max){
        this.combinations[i] = this.min;
        if(i+1<this.combinations.length){
          this.combinations[i+1] = exactMath.add(this.combinations[i+1],this.step);
        } else {
          this.finishMe(obj);
          return;
        }
      }
    }
    var argsExecution = this.combinations.toString();
    var argsEquation = this.combinations.join(this.operator[this.operation]);
    var execution = "exactMath."+this.operatorId[this.operation]+"("+argsExecution+");";
    var output1 = argsEquation + " = " + eval(argsEquation);
    var output2 = argsEquation + " = " + eval(execution);
    if(output1!==output2){
      this.errors++;
    }
    var inner1 = obj.output1.innerHTML;
    var inner2 = obj.output2.innerHTML;

    obj.output1.innerHTML = output1+"<br/>"+inner1;
    obj.output2.innerHTML = output2+"<br/>"+inner2;

    this.combinations[0] = exactMath.add(this.combinations[0],this.step);
    this.counter++;
    this.proc = Number(((exactMath.div(this.counter,this.combinationNumber))*100).toFixed()) + "%";

    obj.logMessage.innerHTML = "Total: "+this.proc+"<br/>";
    obj.logMessage.innerHTML += "Operations done: "+this.counter+"<br/>";
    obj.logMessage.innerHTML += "Errors detected: "+this.errors+"<br/>";
    obj.textArea.style.height = obj.logMessage.scrollHeight + "px";
  },
  finishMe: function(obj){
    clearInterval(obj.myInterval);
    obj.buttonState = false;
    obj.runMe();
    obj.blockMe();
    this.countingState = false;
  }
};