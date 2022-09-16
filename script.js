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
let allBtns = document.querySelectorAll('button');

const opStates = {
    queue: false,
    op: "",
    clrdisp: false,
    clrsub: false,
    disableAll: false
};

//attempting to add keyboard functions
document.addEventListener('keydown', e => {
    allBtns.forEach(btn => {
        btn.style.backgroundColor = btn.value === e.key ? 'brown' : null;
    })
    clearBtn.style.backgroundColor = e.key === 'Delete' ? 'brown' : null;
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
});

document.addEventListener('keyup', e => {
    allBtns.forEach(btn => {
        if (btn.classList.contains('opbtn') || btn.id === 'equalbtn' || btn.id === 'percbtn' || btn.id === 'clearbtn') {
            btn.style.backgroundColor = btn.value === e.key ? 'lightskyblue' : null;
            btn.style.backgroundColor = e.key === 'Delete' ? 'lightskyblue' : null;
        } else if (btn.classList.contains('numbtn') || btn.id === 'btn0' || btn.id === 'decibtn') {
            btn.style.backgroundColor = btn.value === e.key ? 'chocolate' : null;
        }
    })
});

//adding onclicks to various buttons
clearBtn.addEventListener('click', clear);

negBtn.addEventListener('click', e => {
    if (!opStates.disableAll) {
        dispVal = -dispVal;
        mainDisplay.textContent = dispVal;
    }
});

percBtn.addEventListener('click', percVal);

numBtns.forEach(numBtn => {
    numBtn.addEventListener('click', dispNum)
});

deciBtn.addEventListener('click', dispDeci);

zeroBtn.addEventListener('click', dispZero);

opBtns.forEach(opBtn => {
    opBtn.addEventListener('click', performOp)
});

eqBtn.addEventListener('click', equals);


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
    if (!opStates.disableAll) {
        dispVal = dispVal / 100;
        mainDisplay.textContent = dispVal;
    }
}

function equals() {
    if (checkDiv0() === 1) return;
    if (opStates.queue) {
        subDisplay.textContent += (" " + dispVal);
        calc();
        clrQueue();
        opStates.clrsub = true;
    }
}

function performOp(e) {
    if (opStates.disableAll) return;
    let val = e.type === 'click' ? e.currentTarget.value : e.key;
    if (!(typeof dispVal === 'number')) {
        return;
    }
    if (opStates.clrsub) {
        opStates.clrsub = false;
        subDisplay.textContent = "";
    }
    if (checkDiv0() === 1) return; 
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
    if (opStates.disableAll) opStates.disableAll = false;
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
    if (!opStates.disableAll) {
        mainDisplay.textContent += num;
        dispVal = parseFloat(mainDisplay.textContent);
    }
}

function clrQueue() {
    opStates.queue = false;
    opStates.op = "";
}

function calc() {
    if (!opStates.disableAll) {
        nextNum = dispVal;
        dispVal = operate(opStates.op,firstNum,nextNum);
        mainDisplay.textContent = dispVal;
        firstNum = dispVal
    }
}

function checkDiv0() {
    if (opStates.queue && opStates.op === '/' && dispVal === 0) {
        subDisplay.textContent = "naughty naughty!";
        mainDisplay.textContent = "You think you're slick, eh? ;) I don't think so!"
        clrQueue();
        nextNum = null;
        firstNum = null;
        dispVal = null;
        opStates.clrsub = true;
        opStates.queue = false;
        opStates.disableAll = true;
        return 1;
    }
    else return 0;
}