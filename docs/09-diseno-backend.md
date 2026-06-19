# 09. Diseño backend

El backend es un servidor HTTP escrito en Node.js puro — sin Express, sin ningún paquete externo. Acá explico cómo funciona, por qué está hecho así y cuáles son sus límites.

---

## El servidor: `server.js`

El corazón del backend es un único archivo que hace tres cosas:

1. **Sirve los archivos estáticos** del frontend: el HTML, el CSS, los JS y las constantes compartidas. Así el frontend y el backend conviven en el mismo proceso.

2. **Maneja las rutas de la API** bajo el prefijo `/api/`. Según el método HTTP y la ruta, despacha la petición al handler correspondiente.

3. **Aplica validaciones de negocio** antes de tocar los datos: que el producto exista, que el stock alcance, que los campos obligatorios estén presentes, que los valores sean del catálogo permitido.

---

## Persistencia: `db.js`

Un archivo corto con dos funciones:

- `leerDB()` — lee el archivo `data/db.json` y retorna el objeto JavaScript.
- `guardarDB(db)` — serializa el objeto y lo escribe en disco.

Cada operación de escritura (crear, editar, eliminar) termina con un `guardarDB()`. No hay caché en memoria — siempre se lee del disco para garantizar que lo que se ve es lo que hay.

---

## Estructura de rutas

| Método | Ruta | Qué hace |
|--------|------|----------|
| GET | `/api/productos` | Lista todos los productos (acepta filtros por query string) |
| GET | `/api/productos/:id` | Devuelve un producto específico |
| POST | `/api/productos` | Crea un nuevo producto |
| PUT | `/api/productos/:id` | Edita los campos de un producto (excepto stockActual) |
| DELETE | `/api/productos/:id` | Elimina un producto (rechaza si tiene movimientos) |
| GET | `/api/movimientos` | Lista todos los movimientos (acepta filtros) |
| POST | `/api/movimientos` | Registra un movimiento y actualiza el stock |
| GET | `/api/resumen` | Totales del dashboard y últimos 8 movimientos |

---

## Validaciones implementadas

El servidor valida y rechaza con error 400 si:
- La categoría no es `Materia Prima` ni `Producto Terminado`.
- La línea de producción no está en el catálogo de constantes.
- La unidad de medida no está en la lista válida.
- La cantidad de un movimiento es cero o negativa.
- El responsable está vacío en un movimiento.
- El tipo de movimiento no es `entrada` ni `salida`.

Rechaza con error 409 si:
- Se intenta eliminar un producto que tiene movimientos.
- Se intenta registrar una salida con cantidad mayor al stock disponible.

Rechaza con error 404 si:
- El producto o movimiento solicitado no existe.

---

## Por qué no usé Express

La decisión de usar el módulo `http` nativo de Node.js fue deliberada, por tres razones:

1. **Cero dependencias.** El proyecto corre con un `node server.js`. Sin `npm install`, sin `node_modules`, sin versiones que romper. Cualquiera con Node ≥18 puede correrlo.

2. **Transparencia.** El routing está escrito a mano — se ve exactamente cómo una petición HTTP llega, se lee, se procesa y se responde. No hay capa de abstracción que oculte eso.

3. **Escala del problema.** Para un sistema de uso local con un único usuario a la vez, el overhead de Express no agrega nada útil.

---

## Limitaciones conocidas

- **Sin concurrencia segura:** Si dos personas editaran el sistema al mismo tiempo, podrían sobrescribirse mutuamente en el `db.json`. No está diseñado para uso simultáneo.
- **Sin autenticación:** Cualquiera que tenga acceso a la red local donde corre el servidor puede usarlo.
- **Sin manejo de `SIGTERM` / `SIGINT`:** Si el servidor se cierra a mitad de una escritura, el JSON podría corromperse (improbable pero posible).

Estas limitaciones están documentadas conscientemente. En un entorno de producción real, se abordarían con la fase 2 descrita en el documento de arquitectura.

---

## Cómo correr el servidor

```bash
cd src/backend
node server.js
# o también:
npm start
```

Por defecto escucha en el puerto `3000`. Se puede cambiar con la variable de entorno `PORT`:

```bash
PORT=8080 node server.js
```

Luego abrir en el navegador: `http://localhost:3000`
