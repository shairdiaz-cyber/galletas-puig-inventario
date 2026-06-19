// server.js
// Backend del Sistema de Inventario - Galletas Puig (proyecto académico)
//
// Decisión de diseño: se usa únicamente el módulo "http" que viene incluido
// con Node.js, sin Express ni ninguna otra dependencia externa. Para el
// alcance de este proyecto (CRUD de productos + registro de entradas y
// salidas) no se necesita un framework, y así cualquier persona puede
// clonar el repositorio y ejecutarlo con un solo comando: "node server.js".
//
// El servidor hace dos cosas:
//   1. Sirve los archivos estáticos del frontend (HTML, CSS, JS).
//   2. Expone la API REST bajo el prefijo /api/ que el frontend consume.

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const { leerDB, guardarDB } = require('./db');
const CONSTANTES = require('../shared/constantes');

const PUERTO = process.env.PORT || 3000;
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
const SHARED_DIR = path.join(__dirname, '..', 'shared');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

// ---------- utilidades generales ----------

function enviarJSON(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

function leerCuerpo(req) {
  return new Promise((resolve, reject) => {
    let chunks = '';
    req.on('data', (chunk) => { chunks += chunk; });
    req.on('end', () => {
      if (!chunks) return resolve({});
      try {
        resolve(JSON.parse(chunks));
      } catch (err) {
        reject(new Error('El cuerpo de la petición no es un JSON válido'));
      }
    });
    req.on('error', reject);
  });
}

function idConPadding(prefijo, numero) {
  return prefijo + String(numero).padStart(2, '0');
}

// ---------- archivos estáticos ----------

function servirArchivoEstatico(req, res, pathname) {
  let rutaRelativa = pathname === '/' ? '/index.html' : pathname;
  let baseDir = FRONTEND_DIR;

  if (rutaRelativa.startsWith('/shared/')) {
    baseDir = SHARED_DIR;
    rutaRelativa = rutaRelativa.replace('/shared', '');
  }

  // Se evita que alguien intente salir de la carpeta esperada con "..".
  const rutaSegura = path.normalize(rutaRelativa).replace(/^(\.\.[/\\])+/, '');
  const rutaFinal = path.join(baseDir, rutaSegura);

  fs.readFile(rutaFinal, (err, contenido) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 - Archivo no encontrado');
      return;
    }
    const ext = path.extname(rutaFinal);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(contenido);
  });
}

// ---------- validaciones (reglas de negocio) ----------

function validarProductoEntrante(datos, esCreacion) {
  const errores = [];

  if (esCreacion && (!datos.nombre || !String(datos.nombre).trim())) {
    errores.push('El nombre del producto es obligatorio.');
  }
  if (datos.categoria && !CONSTANTES.categorias.includes(datos.categoria)) {
    errores.push(`La categoría debe ser una de: ${CONSTANTES.categorias.join(', ')}.`);
  }
  if (datos.linea && !CONSTANTES.lineasProduccion.includes(datos.linea)) {
    errores.push(`La línea de producción debe ser una de: ${CONSTANTES.lineasProduccion.join(', ')}.`);
  }
  if (datos.unidad && !CONSTANTES.unidadesMedida.includes(datos.unidad)) {
    errores.push(`La unidad de medida debe ser una de: ${CONSTANTES.unidadesMedida.join(', ')}.`);
  }
  if (datos.stockMinimo !== undefined && (isNaN(datos.stockMinimo) || Number(datos.stockMinimo) < 0)) {
    errores.push('El stock mínimo debe ser un número mayor o igual a cero.');
  }

  return errores;
}

function validarMovimientoEntrante(datos) {
  const errores = [];

  if (!datos.productoId) errores.push('Debe indicar a qué producto pertenece el movimiento.');
  if (!CONSTANTES.tiposMovimiento.includes(datos.tipo)) {
    errores.push(`El tipo de movimiento debe ser "entrada" o "salida".`);
  }
  if (datos.cantidad === undefined || isNaN(datos.cantidad) || Number(datos.cantidad) <= 0) {
    errores.push('La cantidad debe ser un número mayor a cero.');
  }
  if (!datos.responsable || !String(datos.responsable).trim()) {
    errores.push('Debe indicar quién registra el movimiento.');
  }

  return errores;
}

// ---------- handlers de la API ----------

function manejarProductos(req, res, partes, query) {
  const db = leerDB();

  // GET /api/productos  o  GET /api/productos/:id
  if (req.method === 'GET') {
    if (partes[3]) {
      const producto = db.productos.find(p => p.id === partes[3]);
      if (!producto) return enviarJSON(res, 404, { error: 'Producto no encontrado.' });
      return enviarJSON(res, 200, producto);
    }

    let resultado = db.productos;
    if (query.categoria) resultado = resultado.filter(p => p.categoria === query.categoria);
    if (query.linea) resultado = resultado.filter(p => p.linea === query.linea);
    if (query.bajoMinimo === 'true') resultado = resultado.filter(p => p.stockActual < p.stockMinimo);

    return enviarJSON(res, 200, resultado);
  }

  // POST /api/productos
  if (req.method === 'POST') {
    return leerCuerpo(req).then((datos) => {
      const errores = validarProductoEntrante(datos, true);
      if (errores.length) return enviarJSON(res, 400, { errores });

      const nuevoId = idConPadding('P', db.meta.siguienteIdProducto);
      const nuevoProducto = {
        id: nuevoId,
        nombre: String(datos.nombre).trim(),
        categoria: datos.categoria || CONSTANTES.categorias[0],
        linea: datos.linea || 'General',
        unidad: datos.unidad || 'unidades',
        stockMinimo: Number(datos.stockMinimo) || 0,
        bodega: datos.bodega || 'Sin asignar',
        stockActual: 0,
        fechaCreacion: new Date().toISOString().slice(0, 10)
      };

      db.productos.push(nuevoProducto);
      db.meta.siguienteIdProducto += 1;
      guardarDB(db);

      return enviarJSON(res, 201, nuevoProducto);
    }).catch((err) => enviarJSON(res, 400, { errores: [err.message] }));
  }

  // PUT /api/productos/:id
  if (req.method === 'PUT' && partes[3]) {
    return leerCuerpo(req).then((datos) => {
      const producto = db.productos.find(p => p.id === partes[3]);
      if (!producto) return enviarJSON(res, 404, { error: 'Producto no encontrado.' });

      const errores = validarProductoEntrante(datos, false);
      if (errores.length) return enviarJSON(res, 400, { errores });

      // El stock actual nunca se edita directamente desde aquí: solo cambia
      // a través de movimientos de entrada o salida. Esto es intencional,
      // para que siempre quede registro de por qué cambió el inventario.
      const camposEditables = ['nombre', 'categoria', 'linea', 'unidad', 'stockMinimo', 'bodega'];
      camposEditables.forEach((campo) => {
        if (datos[campo] !== undefined) producto[campo] = datos[campo];
      });

      guardarDB(db);
      return enviarJSON(res, 200, producto);
    }).catch((err) => enviarJSON(res, 400, { errores: [err.message] }));
  }

  // DELETE /api/productos/:id
  if (req.method === 'DELETE' && partes[3]) {
    const producto = db.productos.find(p => p.id === partes[3]);
    if (!producto) return enviarJSON(res, 404, { error: 'Producto no encontrado.' });

    const tieneMovimientos = db.movimientos.some(m => m.productoId === partes[3]);
    if (tieneMovimientos) {
      return enviarJSON(res, 400, {
        error: 'Este producto tiene movimientos registrados y no se puede eliminar, para no perder la trazabilidad del inventario.'
      });
    }

    db.productos = db.productos.filter(p => p.id !== partes[3]);
    guardarDB(db);
    return enviarJSON(res, 200, { mensaje: 'Producto eliminado.' });
  }

  return enviarJSON(res, 405, { error: 'Método no permitido para este recurso.' });
}

function manejarMovimientos(req, res, partes, query) {
  const db = leerDB();

  // GET /api/movimientos
  if (req.method === 'GET') {
    let resultado = db.movimientos;
    if (query.productoId) resultado = resultado.filter(m => m.productoId === query.productoId);
    if (query.tipo) resultado = resultado.filter(m => m.tipo === query.tipo);

    resultado = [...resultado].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    return enviarJSON(res, 200, resultado);
  }

  // POST /api/movimientos
  if (req.method === 'POST') {
    return leerCuerpo(req).then((datos) => {
      const errores = validarMovimientoEntrante(datos);
      if (errores.length) return enviarJSON(res, 400, { errores });

      const producto = db.productos.find(p => p.id === datos.productoId);
      if (!producto) return enviarJSON(res, 404, { error: 'El producto indicado no existe.' });

      const cantidad = Number(datos.cantidad);

      if (datos.tipo === 'salida' && producto.stockActual - cantidad < 0) {
        return enviarJSON(res, 400, {
          error: `Stock insuficiente. Disponible: ${producto.stockActual} ${producto.unidad}, solicitado: ${cantidad} ${producto.unidad}.`
        });
      }

      producto.stockActual = datos.tipo === 'entrada'
        ? producto.stockActual + cantidad
        : producto.stockActual - cantidad;

      const nuevoMovimiento = {
        id: idConPadding('M', db.meta.siguienteIdMovimiento),
        productoId: datos.productoId,
        tipo: datos.tipo,
        cantidad,
        fecha: new Date().toISOString(),
        responsable: String(datos.responsable).trim(),
        motivo: datos.motivo ? String(datos.motivo).trim() : ''
      };

      db.movimientos.push(nuevoMovimiento);
      db.meta.siguienteIdMovimiento += 1;
      guardarDB(db);

      return enviarJSON(res, 201, { movimiento: nuevoMovimiento, producto });
    }).catch((err) => enviarJSON(res, 400, { errores: [err.message] }));
  }

  return enviarJSON(res, 405, { error: 'Método no permitido para este recurso.' });
}

function manejarResumen(req, res) {
  const db = leerDB();

  const materiaPrima = db.productos.filter(p => p.categoria === 'Materia Prima');
  const productoTerminado = db.productos.filter(p => p.categoria === 'Producto Terminado');
  const bajoMinimo = db.productos.filter(p => p.stockActual < p.stockMinimo);
  const recientes = [...db.movimientos]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 8);

  return enviarJSON(res, 200, {
    totalProductos: db.productos.length,
    totalMateriaPrima: materiaPrima.length,
    totalProductoTerminado: productoTerminado.length,
    productosBajoMinimo: bajoMinimo,
    movimientosRecientes: recientes
  });
}

// ---------- enrutador principal ----------

const servidor = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;
  const query = parsed.query;

  if (!pathname.startsWith('/api/')) {
    return servirArchivoEstatico(req, res, pathname);
  }

  const partes = pathname.split('/'); // ['', 'api', 'productos', ':id']

  try {
    if (partes[2] === 'productos') return manejarProductos(req, res, partes, query);
    if (partes[2] === 'movimientos') return manejarMovimientos(req, res, partes, query);
    if (partes[2] === 'resumen') return manejarResumen(req, res);

    return enviarJSON(res, 404, { error: 'Recurso de la API no encontrado.' });
  } catch (err) {
    console.error(err);
    return enviarJSON(res, 500, { error: 'Error interno del servidor.' });
  }
});

servidor.listen(PUERTO, () => {
  console.log(`Sistema de Inventario - Galletas Puig`);
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
