//initializing some variables and attaching buttons to variables
let firstNum;
let nextNum;
let clearBtn = document.querySelector('#clearbtn');
let display = document.querySelector('#display');
let numBtns = document.querySelectorAll('.numbtn');
let dispVal;
let deciBtn = document.querySelector('#decibtn');
let opBtns = document.querySelectorAll('.opbtn');
let eqBtn = document.querySelector('#equalbtn');
let zeroBtn = document.querySelector('#btn0');
const opQueue = {
    queue: false,
    op: ""
};

//adding onclicks to various buttons
clearBtn.addEventListener('click', e => {
    display.textContent = "";
    dispVal = null;
    clrQueue();
})
numBtns.forEach(numBtn => {
    numBtn.addEventListener('click', e => {
        disp(e.currentTarget.value);
    })
})
deciBtn.addEventListener('click',e => {
    if (display.textContent !== "" && display.textContent.search('.') === -1) {
        disp(e.currentTarget.value);
    }
})
zeroBtn.addEventListener('click', e => {
    if (display.textContent === "" || display.textContent.search([1-9]) !== -1) {
        disp(e.currentTarget.value);
    }
})
opBtns.forEach(opBtn => {
    opBtn.addEventListener('click', e => {
            if (!opQueue.queue) {
                firstNum = dispVal;
                dispVal = null;
                display.textContent = "";
                opQueue.queue = true;
                opQueue.op = e.currentTarget.value;
            } else {
                nextNum = dispVal;
                dispVal = operate(opQueue.op,firstNum,nextNum);
                display.textContent = dispVal;
                firstNum = dispVal;
            }
    })
})
eqBtn.addEventListener('click', e => {
    if (opQueue.queue) {
        nextNum = dispVal;
        dispVal = operate(opQueue.op,firstNum,nextNum);
        display.textContent = dispVal;
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
    display.textContent += num;
    dispVal = parseFloat(display.textContent);
}
function clrQueue() {
    opQueue.queue = false;
    opQueue.op = "";
}