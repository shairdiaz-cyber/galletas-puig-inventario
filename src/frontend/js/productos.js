// productos.js

const Productos = {
  _inicializado: false,

  async cargar() {
    if (!this._inicializado) this._inicializar();
    await this._renderTabla();
  },

  _inicializar() {
    this._llenarSelect('prod-categoria', CONSTANTES.categorias);
    this._llenarSelect('prod-linea', CONSTANTES.lineasProduccion);
    this._llenarSelect('prod-unidad', CONSTANTES.unidadesMedida);
    this._llenarSelect('filtro-categoria', CONSTANTES.categorias, 'Todas las categorías');
    this._llenarSelect('filtro-linea', CONSTANTES.lineasProduccion, 'Todas las líneas');

    document.getElementById('btn-mostrar-form-producto').addEventListener('click', () => {
      document.getElementById('form-producto').classList.remove('formulario--oculta');
    });
    document.getElementById('btn-cancelar-producto').addEventListener('click', () => {
      document.getElementById('form-producto').classList.add('formulario--oculta');
      document.getElementById('form-producto').reset();
    });

    document.getElementById('form-producto').addEventListener('submit', (e) => this._guardarProducto(e));

    ['filtro-categoria', 'filtro-linea', 'filtro-bajo-minimo'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this._renderTabla());
    });

    this._inicializado = true;
  },

  _llenarSelect(id, opciones, primeraEtiqueta) {
    const select = document.getElementById(id);
    const inicio = primeraEtiqueta ? `<option value="">${primeraEtiqueta}</option>` : '';
    select.innerHTML = inicio + opciones.map(o => `<option value="${o}">${o}</option>`).join('');
  },

  async _guardarProducto(evento) {
    evento.preventDefault();
    const errorEl = document.getElementById('prod-error');
    errorEl.textContent = '';

    const producto = {
      nombre: document.getElementById('prod-nombre').value,
      categoria: document.getElementById('prod-categoria').value,
      linea: document.getElementById('prod-linea').value,
      unidad: document.getElementById('prod-unidad').value,
      stockMinimo: Number(document.getElementById('prod-stock-minimo').value),
      bodega: document.getElementById('prod-bodega').value
    };

    try {
      await API.crearProducto(producto);
      document.getElementById('form-producto').reset();
      document.getElementById('form-producto').classList.add('formulario--oculta');
      await this._renderTabla();
    } catch (err) {
      errorEl.textContent = err.message;
    }
  },

  async _eliminarProducto(id) {
    if (!confirm('¿Eliminar este producto del inventario?')) return;
    try {
      await API.eliminarProducto(id);
      await this._renderTabla();
    } catch (err) {
      alert(err.message);
    }
  },

  async _renderTabla() {
    const filtros = {
      categoria: document.getElementById('filtro-categoria').value,
      linea: document.getElementById('filtro-linea').value,
      bajoMinimo: document.getElementById('filtro-bajo-minimo').checked ? 'true' : ''
    };
    Object.keys(filtros).forEach(k => { if (!filtros[k]) delete filtros[k]; });

    const productos = await API.obtenerProductos(filtros);
    const cuerpo = document.getElementById('tabla-productos-cuerpo');

    if (!productos.length) {
      cuerpo.innerHTML = `<tr><td colspan="8" class="vacio">No hay productos que coincidan con el filtro.</td></tr>`;
      return;
    }

    cuerpo.innerHTML = productos.map(p => `
      <tr class="${p.stockActual < p.stockMinimo ? 'fila-bajo-minimo' : ''}">
        <td class="celda-mono">${p.id}</td>
        <td>${p.nombre}</td>
        <td><span class="etiqueta-categoria">${p.categoria}</span></td>
        <td>${p.linea}</td>
        <td class="celda-mono">${p.stockActual} ${p.unidad}</td>
        <td class="celda-mono">${p.stockMinimo} ${p.unidad}</td>
        <td>${p.bodega}</td>
        <td><button class="boton boton--peligro" data-eliminar="${p.id}">Eliminar</button></td>
      </tr>
    `).join('');

    cuerpo.querySelectorAll('[data-eliminar]').forEach(btn => {
      btn.addEventListener('click', () => this._eliminarProducto(btn.dataset.eliminar));
    });
  }
};
