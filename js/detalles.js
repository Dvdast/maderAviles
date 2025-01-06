// Cargar datos de LocalStorage
const piezas = JSON.parse(localStorage.getItem('piezas')) || [];

// Función para calcular superficie y volumen
function calcularSuperficie(largo, ancho) {
    return largo * ancho;
}

function calcularVolumen(largo, ancho, grosor) {
    return largo * ancho * grosor;
}

// Función para cargar piezas 
function cargarDetallesPedido(pedidoNumero) {
    const piezasFiltradas = piezas.filter(p => p.pedidoNumero === pedidoNumero);

    //mensaje de error si no hay piezas
    const errorMensaje = document.getElementById("errorMensaje");
    if (piezasFiltradas.length === 0) {
        errorMensaje.style.display = "block";
        return;
    } else {
        errorMensaje.style.display = "none";
    }

    // Rellenar la tabla
    const tabla = document.getElementById("tablaPiezas");
    tabla.innerHTML = ""; // Limpiar tabla

    piezasFiltradas.forEach((pieza) => {
        const superficie = calcularSuperficie(pieza.largo, pieza.ancho);
        const volumen = calcularVolumen(pieza.largo, pieza.ancho, pieza.grosor);

        const fila = `
            <tr>
                <td>${pieza.numero}</td>
                <td>${pieza.largo}</td>
                <td>${pieza.ancho}</td>
                <td>${pieza.grosor}</td>
                <td>${pieza.color}</td>
                <td>${superficie.toFixed(2)}</td>
                <td>${volumen.toFixed(2)}</td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalPedido"));
    modal.hide();
}

// Manejar la carga de la página
document.addEventListener("DOMContentLoaded", () => {
    const modalPedido = new bootstrap.Modal(document.getElementById("modalPedido"));
    modalPedido.show();

    // Manejar el botón de consulta
    document.getElementById("consultarPedido").addEventListener("click", () => {
        const pedidoNumero = parseInt(document.getElementById("inputPedidoNumero").value);
        if (!isNaN(pedidoNumero)) {
            cargarDetallesPedido(pedidoNumero);
        }
    });
});
