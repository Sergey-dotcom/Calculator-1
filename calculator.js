const numbers = document.querySelectorAll('.number'),
      operations = document.querySelectorAll('.operation'),
      decimalBtns = document.getElementById('decimal'),
      clearBtn = document.querySelectorAll('.clearBtn'),
      resultBtn = document.getElementById("result"),
      calculate = document.getElementById("calculate");
let  MemoryCurrentNumber = 0,
     MemoryNewNumber = false,
     MemoryPendingOperation = '';


for (let i=0; i < numbers.length ; i++)   {
    let number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.outerText);
    });
};

for (let i=0; i < operations.length ; i++)   {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    }); 
};

for (let i=0; i < clearBtn.length ; i++)   {
    let clearBtns = clearBtn[i];
    clearBtns.addEventListener('click', function (e) {
        clear(e.srcElement.id);
    }); 
};

decimalBtns.addEventListener('click', dot);
resultBtn.addEventListener('click', result);


function numberPress(number) {
    if (MemoryNewNumber ) {
        calculate.value = number ;
        MemoryNewNumber = false;
    } else {
        if (calculate.value === '0') {
            calculate.value = number;
        } else {
        calculate.value += number;
        };
    };
};


function operation(op) {
   let localOperationMemory = calculate.value;
    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        calculate.value = MemoryCurrentNumber;
     } else {
        MemoryNewNumber = true;
        if (op === 'sqrt' || op === 'x2') {
            MemoryPendingOperation = op;
         };
        if (MemoryPendingOperation === "+") {
            MemoryCurrentNumber += parseFloat(localOperationMemory); 
         }
         else if ( MemoryPendingOperation === '-') {
         MemoryCurrentNumber -= parseFloat(localOperationMemory) ;
         } else if ( MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory); 
         } else if ( MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory); 
         } else if ( MemoryPendingOperation === 'sqrt') {
            MemoryCurrentNumber = Math.sqrt(parseFloat(localOperationMemory)); 
            calculate.value = MemoryCurrentNumber;
         } else if ( MemoryPendingOperation === 'x2') {
              MemoryCurrentNumber = parseFloat(localOperationMemory)*parseFloat(localOperationMemory);  
         } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
         }
        calculate.value = MemoryCurrentNumber;
        MemoryPendingOperation = op ;
    };
};

function dot(argument) {
    let localDecimalMemory = calculate.value;
    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1 ) {
        localDecimalMemory += '.'; 
    };
    };
    calculate.value = localDecimalMemory;
};

function clear(id) {
    if (id === 'CE') {
         calculate.value = '0';
         MemoryNewNumber = true;
    } else if (id === 'C') {
         calculate.value = '0';
         MemoryNewNumber = true;
         MemoryCurrentNumber = '0';
         MemoryPendingOperation = '0';
    };
};



