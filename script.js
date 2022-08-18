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
const opQueue = {
    queue: false,
    op: ""
};

//adding onclicks to various buttons
clearBtn.addEventListener('click', e => {
    display.textContent = "";
    dispVal = null;
})
numBtns.forEach(numBtn => {
    numBtn.addEventListener('click', e => {
        disp(e.currentTarget.value);
    })
})
deciBtn.addEventListener('click',e => {
    if (display.textContent !== "" && display.textContent.search(/./) === -1) {
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
        opQueue.queue = false;
        opQueue.op = "";
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