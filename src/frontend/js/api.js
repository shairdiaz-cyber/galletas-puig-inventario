// api.js
// Pequeña capa que envuelve "fetch" para no repetir el manejo de errores
// en cada archivo. Todas las demás vistas (dashboard.js, productos.js,
// movimientos.js) llaman a estas funciones en lugar de usar fetch directo.

const API = {
  async _peticion(url, opciones) {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
      const mensaje = (datos.errores && datos.errores.join(' ')) || datos.error || 'Ocurrió un error inesperado.';
      throw new Error(mensaje);
    }
    return datos;
  },

  obtenerResumen() {
    return this._peticion('/api/resumen');
  },

  obtenerProductos(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return this._peticion(`/api/productos${params ? '?' + params : ''}`);
  },

  crearProducto(producto) {
    return this._peticion('/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
  },

  actualizarProducto(id, cambios) {
    return this._peticion(`/api/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cambios)
    });
  },

  eliminarProducto(id) {
    return this._peticion(`/api/productos/${id}`, { method: 'DELETE' });
  },

  obtenerMovimientos(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    return this._peticion(`/api/movimientos${params ? '?' + params : ''}`);
  },

  registrarMovimiento(movimiento) {
    return this._peticion('/api/movimientos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movimiento)
    });
  }
};
