let oldValue = '';
let currentValue = '';
let equation = '';
let isEqualsPressed = false;

const firstLine = document.getElementById('old-value');
const secondLine = document.getElementById('current-value');

const ac = document.getElementById('ac');
const c = document.getElementById('c');
const dot = document.getElementById('dot');

const nine = document.getElementById('nine');
const eight = document.getElementById('eight');
const seven = document.getElementById('seven');
const six = document.getElementById('six');
const five = document.getElementById('five');
const four = document.getElementById('four');
const three = document.getElementById('three');
const two = document.getElementById('two');
const one = document.getElementById('one');
const zero = document.getElementById('zero');

const add = document.getElementById('add');
const subtract = document.getElementById('subtract');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');

const equals = document.getElementById('equals');

ac.addEventListener('click', () => {
    oldValue = '';
    firstLine.textContent = '';
    currentValue = '';
    secondLine.textContent = currentValue;
});

c.addEventListener('click', () => {
    clearLastDigit();
});

dot.addEventListener('click', (e) => {
    addDot(e.target.textContent);
});

nine.addEventListener('click', (e) => {
    changeValue(e.target.textContent);
});

eight.addEventListener('click', (e) => {
    changeValue(e.target.textContent);
});

seven.addEventListener('click', (e) => {
    changeValue(e.target.textContent);
});

six.addEventListener('click', (e) => {
    changeValue(e.target.textContent);
});

five.addEventListener('click', (e) => {
    changeValue(e.target.textContent);
});

four.addEventListener('click', (e) => {
    changeValue(e.target.textContent);
});

three.addEventListener('click', (e) => {
    changeValue(e.target.textContent);
});

two.addEventListener('click', (e) => {
    changeValue(e.target.textContent);
});

one.addEventListener('click', (e) => {
    changeValue(e.target.textContent);
});

zero.addEventListener('click', (e) => {
    changeValue(e.target.textContent);
});

add.addEventListener('click', (e) => {
    addOperation(e.target.textContent);
});

subtract.addEventListener('click', (e) => {
    addOperation(e.target.textContent);
});

multiply.addEventListener('click', (e) => {
    addOperation(e.target.textContent);
});

divide.addEventListener('click', (e) => {
    addOperation(e.target.textContent);
});

equals.addEventListener('click', () => {
    oldValue += currentValue;
    firstLine.textContent = oldValue;
    equation = oldValue;
    operate();
});

window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'Delete':
        case 'Backspace':
            clearLastDigit();
            break;
        case '.':
            addDot(e.key);
            break;
        case '9':
        case '8':
        case '7':
        case '6':
        case '5':
        case '4':
        case '3':
        case '2':
        case '1':
        case '0':
            changeValue(e.key);
            break;
        case '+':
        case '-':
        case '*':
        case '/': 
            addOperation(e.key);
            break;
        case '=':
        case 'Enter':
            oldValue += currentValue;
            firstLine.textContent = oldValue;
            equation = oldValue;
            operate();
            break;
        default:
            break;
    }
}, false);

function clearLastDigit() {
    currentValue = currentValue.slice(0, -1);
    secondLine.textContent = currentValue;
}

function addDot(dot) {
    if (!currentValue.includes(dot)) {
        currentValue += dot;
        secondLine.textContent = currentValue;
    }
}

function changeValue(newValue) {
    currentValue += newValue;
    secondLine.textContent = currentValue;
}

function addOperation(operation) {
    if (isEqualsPressed) {
        oldValue = '';
        isEqualsPressed = false;
    }

    oldValue += currentValue + ' ' + operation + ' ';
    firstLine.textContent = oldValue;
    currentValue = '';
    secondLine.textContent = currentValue;
}

function operate() {
    if (equation.match(/\*|\//)) {
        multiplyOrDivide();
    } else if ((equation.match(/[\s][\+|-][\s]/))) {
        addOrSubtract();
    } else {
        currentValue = equation;
        secondLine.textContent = currentValue;
        isEqualsPressed = true;
    }
}

function multiplyOrDivide() {
    const regEx = /(\-?)[\d]+(\.?)[\d]*[\s][\*|\/][\s](\-?)[\d]+(\.?)[\d]*/;
    const regExMatch = equation.match(regEx)[0];
    const operator = regExMatch.match(/\*|\//)[0];
    const numberRegEx = /(\-?)[\d]+(\.?)[\d]*/g;
    const firstNumber = regExMatch.match(numberRegEx)[0];
    const secondNumber = regExMatch.match(numberRegEx)[1];
    let result = '';

    if (operator == '*') {
        result = multiplyNumbers(firstNumber, secondNumber);
        equation = regEx[Symbol.replace](equation, result);
    } else {
        result = divideNumbers(firstNumber, secondNumber);
        equation = regEx[Symbol.replace](equation, result);
    }

    operate();
}

function multiplyNumbers(a, b) {
    return a * b;
}

function divideNumbers(a, b) {
    return a / b;
}

function addOrSubtract() {
    const regEx = /(\-?)[\d]+(\.?)[\d]*[\s][\+|-][\s](\-?)[\d]+(\.?)[\d]*/;
    const regExMatch = equation.match(regEx)[0];
    const operator = regExMatch.match(/[\s][\+|-][\s]/)[0];
    const numberRegEx = /(\-?)[\d]+(\.?)[\d]*/g;
    const firstNumber = Number(regExMatch.match(numberRegEx)[0]);
    const secondNumber = Number(regExMatch.match(numberRegEx)[1]);
    let result = '';

    if (operator == ' + ') {
        result = addNumbers(firstNumber, secondNumber);
        equation = regEx[Symbol.replace](equation, result);
    } else {
        result = subtractNumbers(firstNumber, secondNumber);
        equation = regEx[Symbol.replace](equation, result);
    }

    operate();
}

function addNumbers(a, b) {
    return a + b;
}

function subtractNumbers(a, b) {
    return a - b;
}