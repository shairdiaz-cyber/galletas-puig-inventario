# 11. API e interfaces

Acá está la documentación completa de los 9 endpoints de la API REST. Cada uno está descrito con su método, ruta, parámetros, body y las posibles respuestas.

La API escucha en `http://localhost:3000/api/` por defecto.

---

## Productos

### GET `/api/productos`

Lista todos los productos. Acepta filtros opcionales como query string.

**Parámetros de query (todos opcionales):**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `categoria` | string | Filtra por `"Materia Prima"` o `"Producto Terminado"` |
| `linea` | string | Filtra por línea de producción |
| `bajoMinimo` | boolean | Si es `true`, devuelve solo los productos con stockActual < stockMinimo |

**Ejemplo:**
```
GET /api/productos?categoria=Materia%20Prima&bajoMinimo=true
```

**Respuesta 200:**
```json
[
  {
    "id": "P01",
    "nombre": "Harina de trigo",
    "categoria": "Materia Prima",
    "linea": "General",
    "unidad": "kg",
    "stockMinimo": 500,
    "stockActual": 720,
    "bodega": "Bodega principal",
    "fechaCreacion": "2026-05-20T08:00:00.000Z"
  }
]
```

---

### GET `/api/productos/:id`

Devuelve un producto específico por su ID.

**Respuesta 200:** el objeto del producto.
**Respuesta 404:** `{ "error": "Producto no encontrado" }`

---

### POST `/api/productos`

Crea un nuevo producto. El `id`, `stockActual` y `fechaCreacion` son generados automáticamente.

**Body requerido:**
```json
{
  "nombre": "Esencia de vainilla",
  "categoria": "Materia Prima",
  "linea": "General",
  "unidad": "ml",
  "stockMinimo": 10,
  "bodega": "Bodega de insumos"
}
```

**Respuesta 201:** el producto creado con su ID asignado.
**Respuesta 400:** `{ "error": "La categoría debe ser: Materia Prima, Producto Terminado" }` (o mensaje similar según la validación fallida).

---

### PUT `/api/productos/:id`

Edita los campos de un producto. No se puede modificar `stockActual` por esta vía — ese campo solo lo actualiza el servidor al procesar movimientos.

**Body (todos los campos opcionales):**
```json
{
  "nombre": "Harina de trigo premium",
  "stockMinimo": 600,
  "bodega": "Bodega norte"
}
```

**Respuesta 200:** el producto con los cambios aplicados.
**Respuesta 404:** producto no encontrado.

---

### DELETE `/api/productos/:id`

Elimina un producto. Si el producto tiene movimientos registrados, la operación es rechazada.

**Respuesta 200:** `{ "mensaje": "Producto eliminado" }`
**Respuesta 404:** producto no encontrado.
**Respuesta 409:** `{ "error": "No se puede eliminar un producto con movimientos registrados" }`

---

## Movimientos

### GET `/api/movimientos`

Lista todos los movimientos ordenados por fecha descendente (el más reciente primero). Acepta filtros opcionales.

**Parámetros de query (todos opcionales):**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `productoId` | string | Filtra movimientos de un producto específico |
| `tipo` | string | Filtra por `"entrada"` o `"salida"` |

**Respuesta 200:** array de movimientos.

---

### POST `/api/movimientos`

Registra un nuevo movimiento de entrada o salida. Al registrar, el servidor actualiza automáticamente el `stockActual` del producto.

**Body requerido:**
```json
{
  "productoId": "P01",
  "tipo": "salida",
  "cantidad": 50,
  "responsable": "Laura Gómez",
  "motivo": "Consumo turno mañana"
}
```

**Respuesta 201:** el movimiento creado.
**Respuesta 400:** `{ "error": "Stock insuficiente. Disponible: 30 kg" }` (u otro mensaje de validación).
**Respuesta 404:** `{ "error": "Producto no encontrado" }`

---

## Resumen

### GET `/api/resumen`

Devuelve los datos consolidados para el tablero del dashboard.

**Respuesta 200:**
```json
{
  "totalProductos": 12,
  "totalMateriasPrimas": 8,
  "totalProductosTerminados": 4,
  "productosBajoMinimo": [
    {
      "id": "P11",
      "nombre": "Galleta Wafer de Chocolate x150g",
      "stockActual": 150,
      "stockMinimo": 300,
      "unidad": "unidades"
    }
  ],
  "movimientosRecientes": [
    {
      "id": "M24",
      "productoId": "P03",
      "tipo": "entrada",
      "cantidad": 100,
      "fecha": "2026-06-16T14:00:00.000Z",
      "responsable": "Andrés Martínez",
      "motivo": "Recepción semanal"
    }
  ]
}
```

El campo `productosBajoMinimo` incluye todos los productos en alerta. El campo `movimientosRecientes` incluye los últimos 8 movimientos.

---

## Códigos de respuesta HTTP usados

| Código | Significado |
|--------|-------------|
| 200 | OK — operación exitosa |
| 201 | Created — recurso creado correctamente |
| 400 | Bad Request — datos inválidos o regla de negocio violada |
| 404 | Not Found — recurso no encontrado |
| 405 | Method Not Allowed — método HTTP no soportado en esa ruta |
| 409 | Conflict — operación rechazada por estado del sistema |
| 500 | Internal Server Error — error inesperado del servidor |
