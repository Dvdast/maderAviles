// Inicializar la lista de pedidos LocalStorage
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

// Función guardar los pedidos en LocalStorage
function guardarPedidos() {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

// Función  mostrar los pedidos en pantalla
function mostrarPedidos() {
    const listaPedidos = document.getElementById('listaPedidos');
    listaPedidos.innerHTML = pedidos.map((p) =>
        `<div>
            Pedido #${p.numero}: ${p.cliente} - Fecha: ${p.fecha} - Procesado: ${p.procesado ? 'Sí' : 'No'} - Servido: ${p.servido ? 'Sí' : 'No'}
            <button class="btn btn-warning btn-sm" onclick="editarPedido(${p.numero})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarPedido(${p.numero})">Eliminar</button>
        </div>`
    ).join('');
}

// Función para agregar y guardar cambios en pedido
function manejarFormularioPedido() {
    const numero = parseInt(document.getElementById('pedidoNumero').value);
    const cliente = document.getElementById('pedidoCliente').value;
    const fecha = document.getElementById('pedidoFecha').value;
    const procesado = document.getElementById('pedidoProcesado').checked;
    const servido = document.getElementById('pedidoServido').checked;

    if (isNaN(numero) || numero < 1 || pedidos.some(p => p.numero === numero && !document.getElementById('pedidoNumero').dataset.editing)) {
        alert("Número de pedido no válido o ya existente.");
        return;
    }

    if (new Date(fecha) > new Date()) {
        alert("La fecha no puede ser futura.");
        return;
    }

    const pedido = { numero, cliente, fecha, procesado, servido };

    if (document.getElementById('pedidoNumero').dataset.editing) {
        const index = pedidos.findIndex(p => p.numero === numero);
        pedidos[index] = pedido;
        document.getElementById('pedidoNumero').removeAttribute('data-editing');
    } else {
        pedidos.push(pedido);
    }

    guardarPedidos();
    mostrarPedidos();
    document.getElementById('formPedido').reset();
    document.getElementById('guardarCambios').style.display = 'none';
    document.getElementById('agregarPedido').style.display = 'inline-block';
}

// Función para editar pedido
function editarPedido(numero) {
    const pedido = pedidos.find(p => p.numero === numero);
    if (pedido) {
        document.getElementById('pedidoNumero').value = pedido.numero;
        document.getElementById('pedidoCliente').value = pedido.cliente;
        document.getElementById('pedidoFecha').value = pedido.fecha;
        document.getElementById('pedidoProcesado').checked = pedido.procesado;
        document.getElementById('pedidoServido').checked = pedido.servido;

        document.getElementById('guardarCambios').style.display = 'inline-block';
        document.getElementById('agregarPedido').style.display = 'none';
        document.getElementById('pedidoNumero').setAttribute('data-editing', true);
    }
}

// Función para eliminar pedido
function eliminarPedido(numero) {
    pedidos = pedidos.filter(p => p.numero !== numero);
    guardarPedidos();
    mostrarPedidos();
}

// Cargar pedidos en pantalla 
document.addEventListener('DOMContentLoaded', () => {
    mostrarPedidos();
});
