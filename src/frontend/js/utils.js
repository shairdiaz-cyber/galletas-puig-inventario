// utils.js
// Funciones pequeñas que usan más de una vista, para no repetir código
// entre dashboard.js y movimientos.js.

const Utils = {
  formatearFechaCorta(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  },

  formatearFechaLarga(fecha) {
    return fecha.toLocaleDateString('es-CO', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  },

  // Construye el HTML de un "tiquete" de movimiento. mapaProductos es un
  // objeto { id: producto } para no tener que buscar en un arreglo cada vez.
  crearTiqueteHTML(movimiento, mapaProductos) {
    const producto = mapaProductos[movimiento.productoId];
    const nombreProducto = producto ? producto.nombre : movimiento.productoId;
    const unidad = producto ? producto.unidad : '';
    const esEntrada = movimiento.tipo === 'entrada';

    return `
      <div class="tiquete">
        <span class="tiquete__sello ${esEntrada ? 'tiquete__sello--entrada' : 'tiquete__sello--salida'}">
          ${esEntrada ? 'Entrada' : 'Salida'}
        </span>
        <div class="tiquete__info">
          <div class="tiquete__producto">${nombreProducto}</div>
          <div class="tiquete__detalle">${movimiento.motivo || 'Sin observación'} · ${movimiento.responsable}</div>
        </div>
        <div class="tiquete__numeros">
          <div class="tiquete__cantidad">${esEntrada ? '+' : '-'}${movimiento.cantidad} ${unidad}</div>
          <div class="tiquete__fecha">${this.formatearFechaCorta(movimiento.fecha)}</div>
        </div>
      </div>
    `;
  }
};
