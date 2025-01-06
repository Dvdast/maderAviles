document.addEventListener("DOMContentLoaded", () => {
    
    const botonInicio = document.getElementById("boton_index");
    if (botonInicio) {
        botonInicio.addEventListener("click", () => {
            window.location.href = "/index.html";
        });
    }

    // Botón pedidos
    const botonPedidos = document.getElementById("boton1");
    if (botonPedidos) {
        botonPedidos.addEventListener("click", () => {
            window.location.href = "/portfolio/pedidos.html";
        });
    }

    // Botón piezas
    const botonPiezas = document.getElementById("boton2");
    if (botonPiezas) {
        botonPiezas.addEventListener("click", () => {
            window.location.href = "/portfolio/piezas.html";
        });
    }

    // Botón pedido
    const botonDetalles = document.getElementById("boton3");
    if (botonDetalles) {
        botonDetalles.addEventListener("click", () => {
            window.location.href = "/portfolio/detalles.html";
        });
    }
});
