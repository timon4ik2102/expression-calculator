function eval() {
    // Do not use eval!!!
    return;
}


function expressionCalculator(expr) {



    const priorityOperations = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    function calculate(a,b,oper) {
        switch (oper) {
            case '+':
                return result = +a + +b;
            case '-':
                return result = +a - +b;
            case '*':
                return result = a * b;
            case '/':
                return result = a / b
        }
    }

    let numbersStack = [];
    let operationsStack = [];
    let openBracket = 0;
    let closeBracket = 0;

    function checkErrors(el) {
        for (let j = 0; j < el.length; j++) {
            if (el[j] === '(') {
                openBracket++;
            }
            else if (el[j] === ')') {
                closeBracket++;
            }
        }
        if (openBracket != closeBracket) {
            throw "ExpressionError: Brackets must be paired";
        }
        let tempStr = el.split(" ").join("");
        if (tempStr.includes("/0")) {
            throw new Error("TypeError: Division by zero.");
        }
    }
    checkErrors(expr)
    let newStr = expr.trim().replace(/\s/g,'').replace(/\)/g,' )').replace(/\(/g,'( ').replace(/\+/g,' + ').replace(/\-/g,' - ').replace(/\*/g,' * ').replace(/\//g,' / ').split(' ');

    let resultStack = [];



    for (let i = 0; i < newStr.length; i++) {
        let current = newStr[i];
        let prevNum = numbersStack[numbersStack.length - 1]
        // let beforePrevNum = numbersStack[numbersStack.length - 2]
        // let prevOper = operationsStack[operationsStack - 1]


        priorityOperations[operationsStack[operationsStack.length - 1]]
        if (newStr[i] !== '*' && newStr[i] !== '+' && newStr[i] !== '/' && newStr[i] !== '-' && newStr[i] !== '(' && newStr[i] !== ')') {
            numbersStack.push(newStr[i])
        }
        else if (operationsStack.length === 0 && priorityOperations[newStr[i]] === 2) {
            numbersStack.pop()
            numbersStack.push(calculate(prevNum,newStr[i + 1],current))
            newStr.splice([i + 1],1)
        }
        else if (operationsStack.length === 0 || priorityOperations[newStr[i]] === 1) {
            operationsStack.push(newStr[i])
        } else if (priorityOperations[newStr[i]] > priorityOperations[operationsStack[operationsStack.length - 1]]) {
            numbersStack.pop()
            numbersStack.push(calculate(prevNum,newStr[i + 1],current))
            newStr.splice([i + 1],1)

        } else {


        }

    }

    let numbers = numbersStack.reverse();
    let operations = operationsStack.reverse();
    if (numbers.length === 1) {
        resultStack.push(numbers[0])
    } else {

        while (numbers.length !== 0) {
            let prevNum = numbers[numbers.length - 1]
            let beforePrevNum = numbers[numbers.length - 2]
            let prevOper = operations[operations.length - 1]


            if (resultStack.length === 0) {
                resultStack.push(calculate(prevNum,beforePrevNum,prevOper));
                numbers.pop()
                numbers.pop();
                operations.pop()

            } else {
                resultStack.push(calculate(resultStack[resultStack.length - 1],prevNum,prevOper))
                resultStack.shift()
                numbers.pop();
                operations.pop()

            }
        }

    }
    return resultStack[0]
}

module.exports = {
    expressionCalculator
}

