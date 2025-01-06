// Inicializar la lista de piezas desde LocalStorage
let piezas = JSON.parse(localStorage.getItem('piezas')) || [];
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || []; 

// Función para guardar las piezas en LocalStorage
function guardarPiezas() {
    localStorage.setItem('piezas', JSON.stringify(piezas));
}

// Función para mostrar piezas por pantalla
function mostrarPiezas() {
    const listaPiezas = document.getElementById('listaPiezas');
    listaPiezas.innerHTML = piezas.map((pieza) =>
        `<div>
            Pieza #${pieza.numero} del Pedido #${pieza.pedidoNumero}: ${pieza.largo}x${pieza.ancho}x${pieza.grosor} cm - Color: ${pieza.color} - Cortada: ${pieza.cortada ? 'Sí' : 'No'}
            <button class="btn btn-warning btn-sm" onclick="editarPieza(${pieza.numero})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarPieza(${pieza.numero})">Eliminar</button>
        </div>`
    ).join('');
}

// Función Agregar o Guardar cambios
function manejarFormularioPiezas() {
    const numero = parseInt(document.getElementById('piezaNumero').value);
    const pedidoNumero = parseInt(document.getElementById('pedidoNumero').value);
    const largo = parseFloat(document.getElementById('piezaLargo').value);
    const ancho = parseFloat(document.getElementById('piezaAncho').value);
    const grosor = parseFloat(document.getElementById('piezaGrosor').value);
    const color = document.getElementById('piezaColor').value;
    const ambasCaras = document.getElementById('ambasCaras').checked;
    const cortada = document.getElementById('piezaCortada').checked;

    // Validaciones
    if (isNaN(numero) || numero < 1 || piezas.some(p => p.numero === numero && !document.getElementById('piezaNumero').dataset.editing)) {
        alert("Número de pieza no válido o ya existente.");
        return;
    }

    if (!pedidos.some(p => p.numero === pedidoNumero)) {
        alert("El número de pedido no existe.");
        return;
    }

    if (largo <= 0 || ancho <= 0 || grosor <= 0) {
        alert("Las medidas deben ser mayores a 0.");
        return;
    }

    const pieza = { numero, pedidoNumero, largo, ancho, grosor, color, ambasCaras, cortada };

    if (document.getElementById('piezaNumero').dataset.editing) {
        const index = piezas.findIndex(p => p.numero === numero);
        piezas[index] = pieza;
        document.getElementById('piezaNumero').removeAttribute('data-editing');
    } else {
        piezas.push(pieza);
    }

    guardarPiezas();
    mostrarPiezas();
    document.getElementById('formPiezas').reset();
    document.getElementById('guardarCambios').style.display = 'none';
    document.getElementById('agregarPieza').style.display = 'inline-block';
}

// Función para editar pieza
function editarPieza(numero) {
    const pieza = piezas.find(p => p.numero === numero);
    if (pieza) {
        document.getElementById('piezaNumero').value = pieza.numero;
        document.getElementById('pedidoNumero').value = pieza.pedidoNumero;
        document.getElementById('piezaLargo').value = pieza.largo;
        document.getElementById('piezaAncho').value = pieza.ancho;
        document.getElementById('piezaGrosor').value = pieza.grosor;
        document.getElementById('piezaColor').value = pieza.color;
        document.getElementById('ambasCaras').checked = pieza.ambasCaras;
        document.getElementById('piezaCortada').checked = pieza.cortada;

        document.getElementById('guardarCambios').style.display = 'inline-block';
        document.getElementById('agregarPieza').style.display = 'none';
        document.getElementById('piezaNumero').setAttribute('data-editing', true);
    }
}

// Función para eliminar pieza
function eliminarPieza(numero) {
    piezas = piezas.filter(p => p.numero !== numero);
    guardarPiezas();
    mostrarPiezas();
}

// Cargar piezas en pantalla al iniciar
document.addEventListener('DOMContentLoaded', () => {
    mostrarPiezas();
});
