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

        if (newStr[i] !== '*' && newStr[i] !== '+' && newStr[i] !== '/' && newStr[i] !== '-' && newStr[i] !== '(' && newStr[i] !== ')') {
            numbersStack.push(newStr[i])
        }
        else if (operationsStack.length === 0 && priorityOperations[newStr[i]] === 2) {
            if (newStr[i + 1] !== '(') {
                numbersStack.pop()
                numbersStack.push(calculate(prevNum,newStr[i + 1],current))
                newStr.splice([i + 1],1)
            } else {
                operationsStack.push(newStr[i])

            }

        }
        else if (newStr[i] !== '(' && newStr[i] !== ')' && operationsStack.length === 0 || priorityOperations[newStr[i]] === 1) {
            operationsStack.push(newStr[i])


        }
        else if (priorityOperations[newStr[i]] > priorityOperations[operationsStack[operationsStack.length - 1]]) {
            if (newStr[i + 1] !== '(') {
                numbersStack.pop()
                numbersStack.push(calculate(prevNum,newStr[i + 1],current))
                newStr.splice([i + 1],1)
            } else {
                operationsStack.push(newStr[i])

            }

        } else if (newStr[i] === '(') {
            let openBrIndex = newStr.indexOf('(');
            let closedBrIndex = newStr.lastIndexOf(')')
            let tempBrArray = newStr.slice(openBrIndex + 1,closedBrIndex)
            let breElem = closedBrIndex - openBrIndex;
            let removed = newStr.splice(openBrIndex,breElem)
            let tempBracketsNum = [];
            let tempBracketsOper = [];

            let bracketsResult = [];
            // let curr = tempBrArray[k]

            for (let k = 0; k < tempBrArray.length; k++) {
                let prevBrNum = tempBracketsNum[tempBracketsNum.length - 1]
                let curr = tempBrArray[k]
                if (tempBrArray[k] !== '*' && tempBrArray[k] !== '+' && tempBrArray[k] !== '/' && tempBrArray[k] !== '-') {
                    tempBracketsNum.push(tempBrArray[k])
                } else if (tempBracketsOper.length === 0 && priorityOperations[tempBrArray[k]] === 2) {
                    tempBracketsNum.pop()
                    tempBracketsNum.push(calculate(prevBrNum,tempBrArray[k + 1],curr))
                    tempBrArray.splice([k + 1],1)
                } else if (tempBracketsOper.length === 0 || priorityOperations[tempBrArray[k]] === 1) {
                    tempBracketsOper.push(tempBrArray[k])
                } else if (priorityOperations[tempBrArray[k]] > priorityOperations[tempBracketsOper[tempBracketsOper.length - 1]]) {
                    tempBracketsNum.pop()
                    tempBracketsNum.push(calculate(prevBrNum,tempBrArray[k + 1],curr))
                    tempBrArray.splice([k + 1],1)
                }

            }

            tempBracketsNum = tempBracketsNum.reverse();
            tempBracketsOper = tempBracketsOper.reverse();
            if (tempBracketsNum.length === 1) {
                bracketsResult.push(tempBracketsNum[0])
            } else {

                while (tempBracketsNum.length !== 0) {

                    if (bracketsResult.length === 0) {
                        bracketsResult.push(calculate(tempBracketsNum[tempBracketsNum.length - 1],tempBracketsNum[tempBracketsNum.length - 2],tempBracketsOper[tempBracketsOper.length - 1]));
                        tempBracketsNum.pop()
                        tempBracketsNum.pop();
                        tempBracketsOper.pop()

                    }
                    else {
                        bracketsResult.push(calculate(bracketsResult[0],tempBracketsNum[tempBracketsNum.length - 1],tempBracketsOper[tempBracketsOper.length - 1]))
                        bracketsResult.shift()
                        tempBracketsNum.pop();
                        tempBracketsOper.pop()

                    }
                }

            }
            // newStr.splice
            numbersStack.push(bracketsResult[0])
            if (priorityOperations[operationsStack[operationsStack.length - 1]] === 2) {
                let x = numbersStack[numbersStack.length - 2];
                let y = numbersStack[numbersStack.length - 1];
                numbersStack.pop();
                numbersStack.pop();
                numbersStack.push(calculate(x,y,operationsStack[operationsStack.length - 1]))
                operationsStack.pop()
            }



        }
        // else if (newStr[i] === ')') {
        //   // i++
        // }

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

