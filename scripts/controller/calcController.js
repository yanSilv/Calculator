class CalcController {

    constructor() {
        this._operation = [];
        this._locale = "pt-Br";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
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

    execBtn(value) {
        switch (value) {
            case 'soma': this.addOperation('+'); break;
            case 'subtracao': this.addOperation('-'); break;
            case 'multiplicacao': this.addOperation('*'); break;
            case 'divisao': this.addOperation('/'); break;
            case 'porcento': this.addOperation('%'); break;
            case 'igual': this.addOperation('='); break;
            case 'ponto': value = '.'; break;
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
                this.addOperation(parseInt(value)); 
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
            } else if(isNaN(value)) {
                //Outra coisa
            } else {
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        } else if(isNaN(value)) {
            this.pushOperation(value);
        } else {
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
            this.setLastNumberToDisplay();
        }
    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
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

        this.displayCalc = lastNumber;
    }

    pushOperation(value){
        this._operation.push(value);
        if(this._operation.length > 3) {
            this.calc();
        }
    }

    calc() {
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last];
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