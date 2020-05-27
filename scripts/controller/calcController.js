class CalcController {

    constructor() {
        this._firstTime = true;
        this._resultLast = 0;
        this._valueLast = 0;
        this._operationLast = 0;
        this._operation = [];
        this._locale = "pt-Br";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initKeyboard();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
        this.setLastNumberToDisplay();
    }

    initButtonsEvents() {
        let operator = "";
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        buttons.forEach(btn => {
            this.addEventListenerAll(btn, "click drag", e => {
                let answer = btn.className.baseVal.replace("btn-", "");
                this.execBtn(answer);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
    }

    initKeyboard() {
        document.addEventListener('keyup', e=>{
            switch (e.key) {
                case '+': 
                case '-': 
                case '*': 
                case '/': 
                case '%': 
                    this.addOperation(e.key); break;
                case 'Enter':
                case '=': 
                    this.calc(); break;
                case '.':
                case ',': 
                    this.addDot(); break;
                case 'Escape': 
                    this.clearAll(); break;
                case 'Backspace': 
                    this.clearEntry(); break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6': 
                case '7': 
                case '8': 
                case '9':
                    this.addOperation(parseFloat(e.key)); 
                    break;
            }
        });
    }

    execBtn(value) {
        switch (value) {
            case 'soma': this.addOperation('+'); break;
            case 'subtracao': this.addOperation('-'); break;
            case 'multiplicacao': this.addOperation('*'); break;
            case 'divisao': this.addOperation('/'); break;
            case 'porcento': this.addOperation('%'); break;
            case 'igual': this.calc(); break;
            case 'ponto': this.addDot(); break;
            case 'ac': this.clearAll(); break;
            case 'ce': this.clearEntry(); break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6': 
            case '7': 
            case '8': 
            case '9':
                this.addOperation(parseFloat(value)); 
                break;
            default: this.setError();
        }
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    addOperation(value) {
        if (isNaN(this.getLastOperation())){
            if(this.isOperator(value)) {
                this.setLastOperation(value);
            } else {
                this.pushOperation(value);
            }
        } else if(isNaN(value)) {
            this.pushOperation(value);
        } else {
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(newValue);
            
        }
        this.setLastNumberToDisplay();
    }

    clearAll() {
        this._operation = [];
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    addDot() {
        let lastOperation = this.getLastOperation();
        
        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1)
            return;

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }

    isOperator(value){
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    setDisplayDateTime() {
        this._dateEl.innerHTML = this.displayDate;
        this._timeEl.innerHTML = this.displayTime;
    }

    setError() {
        this.displayCalc = "Error";
    }

    setLastNumberToDisplay() {
        let lastNumber =  "";
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if(!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            } 
        }
        if (lastNumber == '') lastNumber = 0;
        this.displayCalc = lastNumber;
    }

    pushOperation(value){
        this._operation.push(value);
        if(this._operation.length > 3) {
            this.calc();
        }
    }

    calc() {

        let last = '';
        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._firstTime = true;
        } else if (this._operation.length == 2) {
            if(this._firstTime == true) {
                this._valueLast = this._resultLast;
            }
            last = this._operationLast; 
            this._operation = [this._resultLast, this._operationLast, this._valueLast];
            this._firstTime = false;
        } else {
            last = this._operation[1];
            this._firstTime = true;
        }

        let result = '';

        if (last == '%') {
            let value = this._operation[0];
            let operation = this._operation[1];
            let percent = this._operation[2];
            if (operation == '+' || operation == '-') { 
                result = (value * (percent/100));
                this._operation = [value, operation, result];
            } else {
                result = (percent/100);
                this._operation = [value, operation, result];
            }

            
        } 
        result = eval(this._operation.join(""));
        this._operation = [result, last];
        this._resultLast = result;
        this._operationLast = last;
        this.setLastNumberToDisplay();
    }


    //Get e Set
    setLastOperation(value) {
        this._operation[this._operation.length -1] = value;
    }

    getLastOperation(){
        return this._operation[this._operation.length -1];
    }

    get displayDate() {
        return this.currentDate.toLocaleDateString(this._locale);
    }

    get displayTime() {
        return this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    //Pega a  data do sistema
    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        return this._currentDate = value;
    }
}