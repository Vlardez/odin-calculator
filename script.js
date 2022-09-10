//initializing some variables and attaching buttons to variables
let firstNum;
let nextNum;
let clearBtn = document.querySelector('#clearbtn');
let mainDisplay = document.querySelector('#maindisplay');
let subDisplay = document.querySelector('#smdisplay');
let numBtns = document.querySelectorAll('.numbtn');
let dispVal;
let deciBtn = document.querySelector('#decibtn');
let opBtns = document.querySelectorAll('.opbtn');
let eqBtn = document.querySelector('#equalbtn');
let zeroBtn = document.querySelector('#btn0');
let negBtn = document.querySelector('#negbtn');
let percBtn = document.querySelector('#percbtn');
const opStates = {
    queue: false,
    op: "",
    clrdisp: false,
    clrsub: false
};

//attempting to add keyboard functions
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'Delete':
            clear();
            break;
        case '=':
            equals();
            break;
        case 'Enter':
            e.preventDefault();
            equals();
            break;
        case '+':
            performOp(e);
            break;
        case '*':
            performOp(e);
            break;
        case '/':
            performOp(e);
            break;
        case '-':
            performOp(e);
            break;
        case '%':
            percVal();
            break;
        case 'Backspace':
            backspace();
            break;
        case '.':
            dispDeci(e);
            break;
        case '0':
            dispZero(e);
            break;
    }
    if (e.key >= 1 && e.key <= 9) {
        dispNum(e);
    }
})

//adding onclicks to various buttons
clearBtn.addEventListener('click', clear);

negBtn.addEventListener('click', e => {
    dispVal = -dispVal;
    mainDisplay.textContent = dispVal;
});

percBtn.addEventListener('click', percVal);

numBtns.forEach(numBtn => {
    numBtn.addEventListener('click', dispNum)
});

deciBtn.addEventListener('click', dispDeci);

zeroBtn.addEventListener('click', dispZero);

opBtns.forEach(opBtn => {
    opBtn.addEventListener('click', performOp)
})
eqBtn.addEventListener('click', equals)


//functions refactored here to implement keyboard functionality
function backspace() {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    dispVal = parseFloat(mainDisplay.textContent);
}

function dispNum(e) {
    let val = e.type === 'click' ? e.currentTarget.value : e.key;
    if (mainDisplay.textContent === "0" || opStates.clrdisp) {
        mainDisplay.textContent = "";
        opStates.clrdisp = false;
    }
    disp(val);
}

function dispZero(e) {
    let val = e.type === 'click' ? e.currentTarget.value : e.key;
    if (mainDisplay.textContent === "" || mainDisplay.textContent.search(/[1-9]/) !== -1) {
        disp(val);
    }
}

function dispDeci(e) {
    let val = e.type === 'click' ? e.currentTarget.value : e.key;
    if (mainDisplay.textContent !== "" && mainDisplay.textContent.search(/\./) === -1) {
        disp(val);
    }
}

function percVal() {
    dispVal = dispVal / 100;
    mainDisplay.textContent = dispVal;
}

function equals() {
    if (opStates.queue) {
        subDisplay.textContent += (" " + dispVal);
        calc();
        clrQueue();
        opStates.clrsub = true;
    }
}

function performOp(e) {
    let val = e.type === 'click' ? e.currentTarget.value : e.key;
    if (opStates.clrsub) {
        opStates.clrsub = false;
        subDisplay.textContent = "";
    }
    if (!opStates.queue) {
        subDisplay.textContent += (dispVal + " " + val);
        firstNum = dispVal;
        mainDisplay.textContent = "";
        opStates.queue = true;
        opStates.op = val;
    } else {
        subDisplay.textContent += (" " + dispVal + " " + val);
        calc();
        opStates.clrdisp = true;
        opStates.op = val;
    }
}

function clear() {
    mainDisplay.textContent = "";
    subDisplay.textContent = "";
    dispVal = null;
    clrQueue();
}

//operator functions
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

//utility functions used commonly above
function disp(num) {
    mainDisplay.textContent += num;
    dispVal = parseFloat(mainDisplay.textContent);
}

function clrQueue() {
    opStates.queue = false;
    opStates.op = "";
}

function calc() {
    nextNum = dispVal;
    dispVal = operate(opStates.op,firstNum,nextNum);
    mainDisplay.textContent = dispVal;
    firstNum = dispVal
}