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
