class CalcController {

    constructor () {
        this._locale = "pt-Br";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){

        setInterval(()=>{
            this._dateEl.innerHTML = this.displayDate;
            this._timeEl.innerHTML = this.displayTime;
        }, 1000);
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        buttons.forEach(btn=>{
            btn.addEventListener('click', e=>{
                console.log(btn.className.baseVal.replace("btn-", ""));
            });
        });
    }

    get displayDate () {
        return this.currentDate.toLocaleDateString(this._locale);
    }

    get displayTime () {
        return this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    //Pega a  data do sistema
    get currentDate () {
        return new Date();
    }

    set currentDate (value) {
        return this._currentDate = value;
    }
}