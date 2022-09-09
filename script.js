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
//possibly refactor the onclicks into named functions and then use that to add keyboard support
//adding onclicks to various buttons
clearBtn.addEventListener('click', e => {
    mainDisplay.textContent = "";
    subDisplay.textContent = "";
    dispVal = null;
    clrQueue();
})
negBtn.addEventListener('click', e => {
    dispVal = -dispVal;
    mainDisplay.textContent = dispVal;
})
percBtn.addEventListener('click', e => {
    dispVal = dispVal/100;
    mainDisplay.textContent = dispVal;
})
numBtns.forEach(numBtn => {
    numBtn.addEventListener('click', e => {
        if (mainDisplay.textContent === "0" || opStates.clrdisp) {
            mainDisplay.textContent = "";
            clrdisp = false;
        }
        disp(e.currentTarget.value);
    })
})
deciBtn.addEventListener('click', e => {
    if (mainDisplay.textContent !== "" && mainDisplay.textContent.search(/\./) === -1) {
        disp(e.currentTarget.value);
    }
})
zeroBtn.addEventListener('click', e => {
    if (mainDisplay.textContent === "" || mainDisplay.textContent.search(/[1-9]/) !== -1) {
        disp(e.currentTarget.value);
    }
})
opBtns.forEach(opBtn => {
    opBtn.addEventListener('click', e => {
        if (opStates.clrsub) {
            opStates.clrsub = false;
            subDisplay.textContent = "";
        }
        if (!opStates.queue) {
            subDisplay.textContent += (dispVal + " " + e.currentTarget.value);
            firstNum = dispVal;
            mainDisplay.textContent = "";
            opStates.queue = true;
            opStates.op = e.currentTarget.value;
        } else {
            subDisplay.textContent += (" " + dispVal + " " + e.currentTarget.value);
            calc();
            opStates.clrdisp = true;
            opStates.op = e.currentTarget.value;
        }
    })
})
eqBtn.addEventListener('click', e => {
    if (opStates.queue) {
        subDisplay.textContent += (" " + dispVal);
        calc();
        clrQueue();
        opStates.clrsub = true;
    }
})


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