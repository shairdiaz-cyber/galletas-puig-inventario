// constantes.js
// Estas constantes las usan tanto el backend (al validar lo que llega en
// las peticiones) como el frontend (al construir los formularios y los
// filtros). Si algún día se agrega una línea de producción nueva en la
// planta, este es el único archivo que hay que tocar.

const CONSTANTES = {
  categorias: ['Materia Prima', 'Producto Terminado'],

  lineasProduccion: [
    'General',
    'Línea Avena',
    'Línea Wafer',
    'Línea Soda',
    'Línea Chocolate'
  ],

  unidadesMedida: ['kg', 'g', 'L', 'ml', 'unidades'],

  tiposMovimiento: ['entrada', 'salida']
};

// En Node (backend) exportamos el objeto con module.exports.
// En el navegador (frontend), este archivo se carga con <script src="...">
// y la constante queda disponible directamente como variable global,
// porque no se usa "type=module" en ninguna parte del proyecto.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONSTANTES;
}
