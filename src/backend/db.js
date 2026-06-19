// db.js
// Capa muy simple de acceso a datos. No usamos un motor de base de datos
// porque el alcance del proyecto es básico: el objetivo es demostrar la
// separación frontend/backend y un flujo real de inventario, no evaluar
// un gestor de bases de datos. Toda la información vive en data/db.json.

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'db.json');

function leerDB() {
  const contenido = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(contenido);
}

function guardarDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

module.exports = { leerDB, guardarDB };
