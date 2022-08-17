//initializing some variables and attaching buttons to variables
let firstNum = 0;
let nextNum = 0;
let clearBtn = document.querySelector('#clearbtn');
let display = document.querySelector('#display');
let numBtns = document.querySelectorAll('.numbtn');
let dispVal = 0;
//adding onclicks to various buttons
clearBtn.addEventListener('click', e => {
    display.textContent = "";
    dispVal = 0;
})
numBtns.forEach(numBtn => {
    numBtn.addEventListener('click', e => {
        disp(this.value);
    })
})

//operator functions, display functions, etc
function add(a,b) {
    return a+b;
}
function subtract(a,b) {
    return a-b;
}
function multi(a,b) {
    return a*b;
}
function divide(a,b) {
    return a/b;
}
function operate(op,a,b) {
    switch (op) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multi(a,b);
        case '/':
            return divide(a,b);
    }
}
function disp(num) {
    dispVal += num;
    display.textContent = dispVal;
}