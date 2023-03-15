let operacionPresionada = false; // variable de estado para verificar si ya se ha presionado un símbolo de operación

window.addEventListener('load', () => {
    const display = document.querySelector('.calculadora-valor');
    const keyButtons = document.getElementsByClassName('calculadora-buttons');
    const keyButtonsArray = Array.from(keyButtons);

    keyButtonsArray.forEach((button) => {
        button.addEventListener('click', () => {
            calculadora(button, display);
        });
    });
});

function calculadora(button, display) {
    switch (button.innerHTML) {
        case 'C':
            borrarTodo(display);
            break;
        case '=':
            calcular(display);
            break;
        case 'B':
            borrar(display);
            break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '.':
            actualizarOperacion(display, button);
            break;
        default:
            actualizarNumero(display, button);
            break;
    }
}

function actualizarOperacion(display, button) {
    if (operacionPresionada) { // si ya se ha presionado un símbolo de operación, no agregar otro
        return;
    }
    if (display.innerHTML == '0') { // si el display solo tiene un cero, reemplazarlo con el símbolo de operación
        display.innerHTML = button.innerHTML;
    } else {
        display.innerHTML += button.innerHTML;
    }
    operacionPresionada = true; // establecer la variable de estado en true
}

function actualizarNumero(display, button) {
    if (operacionPresionada) { // si se ha presionado un símbolo de operación, establecer la variable de estado en true
        operacionPresionada = false;
    }
    if (display.innerHTML == '0') {
        display.innerHTML = button.innerHTML;
    } else {
        display.innerHTML += button.innerHTML;
    }
}


function calcular(display) {
    const operacion = display.innerHTML;
    const resultado = Function(`return ${operacion}`)();
    display.innerHTML = resultado;
}
function borrarTodo(display) {
    display.innerHTML = '0';
    operacionPresionada = false; // reiniciar la variable de estado a false
}

function borrar(display) {
    display.innerHTML = display.innerHTML.slice(0, -1);
    if (display.innerHTML == '') { // si el display está vacío, establecerlo en cero y reiniciar la variable de estado a false
        display.innerHTML = '0';
        operacionPresionada = false;
    }
}

function disable(display, button) {
    button.disabled = true;
    if (display.innerHTML == '-') {
        button.disabled = false;
    }
}
