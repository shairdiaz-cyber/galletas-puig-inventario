// dashboard.js

const Dashboard = {
  async cargar() {
    const [resumen, productos] = await Promise.all([
      API.obtenerResumen(),
      API.obtenerProductos()
    ]);

    const mapaProductos = {};
    productos.forEach(p => { mapaProductos[p.id] = p; });

    this._renderTarjetas(resumen);
    this._renderBajoMinimo(resumen.productosBajoMinimo);
    this._renderMovimientosRecientes(resumen.movimientosRecientes, mapaProductos);
  },

  _renderTarjetas(resumen) {
    const contenedor = document.getElementById('tarjetas-resumen');
    contenedor.innerHTML = `
      <div class="tarjeta-resumen">
        <div class="tarjeta-resumen__valor">${resumen.totalProductos}</div>
        <div class="tarjeta-resumen__etiqueta">Productos registrados</div>
      </div>
      <div class="tarjeta-resumen">
        <div class="tarjeta-resumen__valor">${resumen.totalMateriaPrima}</div>
        <div class="tarjeta-resumen__etiqueta">Materia prima</div>
      </div>
      <div class="tarjeta-resumen">
        <div class="tarjeta-resumen__valor">${resumen.totalProductoTerminado}</div>
        <div class="tarjeta-resumen__etiqueta">Producto terminado</div>
      </div>
      <div class="tarjeta-resumen tarjeta-resumen--alerta">
        <div class="tarjeta-resumen__valor">${resumen.productosBajoMinimo.length}</div>
        <div class="tarjeta-resumen__etiqueta">Bajo el mínimo</div>
      </div>
    `;
  },

  _renderBajoMinimo(lista) {
    const contenedor = document.getElementById('lista-bajo-minimo');
    if (!lista.length) {
      contenedor.innerHTML = '<p class="vacio">Todo el inventario está por encima de su mínimo. Buen turno.</p>';
      return;
    }
    contenedor.innerHTML = lista.map(p => `
      <div class="alerta-item">
        <span>${p.nombre} <span class="etiqueta-categoria">${p.linea}</span></span>
        <span class="alerta-item__cantidad">${p.stockActual} / ${p.stockMinimo} ${p.unidad}</span>
      </div>
    `).join('');
  },

  _renderMovimientosRecientes(lista, mapaProductos) {
    const contenedor = document.getElementById('lista-movimientos-recientes');
    if (!lista.length) {
      contenedor.innerHTML = '<p class="vacio">Todavía no se han registrado movimientos.</p>';
      return;
    }
    contenedor.innerHTML = lista.map(m => Utils.crearTiqueteHTML(m, mapaProductos)).join('');
  }
};
