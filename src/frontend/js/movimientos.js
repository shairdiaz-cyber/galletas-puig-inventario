// movimientos.js

const Movimientos = {
  _inicializado: false,
  _mapaProductos: {},

  async cargar() {
    await this._refrescarMapaProductos();
    if (!this._inicializado) this._inicializar();
    else this._llenarSelectsProducto();
    await this._renderLista();
  },

  async _refrescarMapaProductos() {
    const productos = await API.obtenerProductos();
    this._mapaProductos = {};
    productos.forEach(p => { this._mapaProductos[p.id] = p; });
  },

  _inicializar() {
    this._llenarSelectsProducto();

    document.getElementById('form-movimiento').addEventListener('submit', (e) => this._registrar(e));
    document.getElementById('mov-producto').addEventListener('change', () => this._mostrarStockDisponible());
    document.getElementById('mov-tipo').addEventListener('change', () => this._mostrarStockDisponible());

    ['filtro-mov-producto', 'filtro-mov-tipo'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this._renderLista());
    });

    this._inicializado = true;
  },

  _llenarSelectsProducto() {
    const opciones = Object.values(this._mapaProductos)
      .map(p => `<option value="${p.id}">${p.nombre} (${p.linea})</option>`).join('');

    document.getElementById('mov-producto').innerHTML = opciones;

    const filtro = document.getElementById('filtro-mov-producto');
    filtro.innerHTML = '<option value="">Todos los productos</option>' + opciones;

    this._mostrarStockDisponible();
  },

  _mostrarStockDisponible() {
    const id = document.getElementById('mov-producto').value;
    const producto = this._mapaProductos[id];
    const ayuda = document.getElementById('mov-stock-disponible');
    if (!producto) { ayuda.textContent = ''; return; }
    ayuda.textContent = `Stock actual: ${producto.stockActual} ${producto.unidad} · Mínimo: ${producto.stockMinimo} ${producto.unidad}`;
  },

  async _registrar(evento) {
    evento.preventDefault();
    const errorEl = document.getElementById('mov-error');
    errorEl.textContent = '';

    const responsable = (document.getElementById('input-responsable').value || '').trim();
    if (!responsable) {
      errorEl.textContent = 'Escribe tu nombre en "Supervisor de turno" antes de registrar un movimiento.';
      return;
    }

    const movimiento = {
      productoId: document.getElementById('mov-producto').value,
      tipo: document.getElementById('mov-tipo').value,
      cantidad: Number(document.getElementById('mov-cantidad').value),
      responsable,
      motivo: document.getElementById('mov-motivo').value
    };

    try {
      await API.registrarMovimiento(movimiento);
      document.getElementById('form-movimiento').reset();
      await this._refrescarMapaProductos();
      this._llenarSelectsProducto();
      await this._renderLista();
    } catch (err) {
      errorEl.textContent = err.message;
    }
  },

  async _renderLista() {
    const filtros = {
      productoId: document.getElementById('filtro-mov-producto').value,
      tipo: document.getElementById('filtro-mov-tipo').value
    };
    Object.keys(filtros).forEach(k => { if (!filtros[k]) delete filtros[k]; });

    const movimientos = await API.obtenerMovimientos(filtros);
    const contenedor = document.getElementById('lista-movimientos');

    if (!movimientos.length) {
      contenedor.innerHTML = '<p class="vacio">No hay movimientos registrados con este filtro.</p>';
      return;
    }

    contenedor.innerHTML = movimientos.map(m => Utils.crearTiqueteHTML(m, this._mapaProductos)).join('');
  }
};
