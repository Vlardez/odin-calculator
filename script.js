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
const opStates = {
    queue: false,
    op: "",
    doubleEqual: false
};

//adding onclicks to various buttons
clearBtn.addEventListener('click', e => {
    mainDisplay.textContent = "";
    subDisplay.textContent = "";
    dispVal = null;
    clrQueue();
})
numBtns.forEach(numBtn => {
    numBtn.addEventListener('click', e => {
        if (mainDisplay.textContent === "0") {
            mainDisplay.textContent = "";
            disp(e.currentTarget.value);
        } else {
            disp(e.currentTarget.value);
        }
    })
})
deciBtn.addEventListener('click',e => {
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
            if (!opStates.queue) {
                firstNum = dispVal;
                dispVal = null;
                mainDisplay.textContent = "";
                opStates.queue = true;
                opStates.op = e.currentTarget.value;
            } else {
                nextNum = dispVal;
                dispVal = operate(opStates.op,firstNum,nextNum);
                mainDisplay.textContent = dispVal;
                firstNum = dispVal;
            }
    })
})
eqBtn.addEventListener('click', e => {
    if (opStates.queue) {
        nextNum = dispVal;
        dispVal = operate(opStates.op,firstNum,nextNum);
        mainDisplay.textContent = dispVal;
        firstNum = dispVal
        clrQueue();
    }
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
    mainDisplay.textContent += num;
    dispVal = parseFloat(mainDisplay.textContent);
}
function clrQueue() {
    opStates.queue = false;
    opStates.op = "";
}