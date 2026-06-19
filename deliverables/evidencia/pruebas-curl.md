# Evidencia de pruebas — API REST

Resultados de las pruebas ejecutadas con `curl` contra el servidor local en `http://localhost:3000`.

---

## GET /api/resumen

```
curl http://localhost:3000/api/resumen
```

Resultado: 200 OK — devuelve totales correctos (12 productos, 8 materias primas, 4 terminados) y los 2 productos bajo mínimo (P11 y P12).

---

## GET /api/productos

```
curl http://localhost:3000/api/productos
```

Resultado: 200 OK — devuelve los 12 productos del catálogo.

---

## GET /api/productos/:id (válido)

```
curl http://localhost:3000/api/productos/P01
```

Resultado: 200 OK — devuelve el objeto completo de la Harina de trigo.

---

## GET /api/productos/:id (inexistente)

```
curl http://localhost:3000/api/productos/P99
```

Resultado: 404 Not Found — `{"error":"Producto no encontrado"}`

---

## POST /api/productos (válido)

```
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Sal fina","categoria":"Materia Prima","linea":"General","unidad":"kg","stockMinimo":5}'
```

Resultado: 201 Created — producto creado con ID P13, stockActual 0.

---

## POST /api/productos (categoría inválida)

```
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Prueba","categoria":"Semiprocesado","linea":"General","unidad":"kg","stockMinimo":0}'
```

Resultado: 400 Bad Request — `{"error":"La categoría debe ser: Materia Prima, Producto Terminado"}`

---

## POST /api/movimientos (entrada válida)

```
curl -X POST http://localhost:3000/api/movimientos \
  -H "Content-Type: application/json" \
  -d '{"productoId":"P01","tipo":"entrada","cantidad":200,"responsable":"Laura Gómez","motivo":"Prueba de entrada"}'
```

Resultado: 201 Created — movimiento registrado, stockActual de P01 aumentó en 200.

---

## POST /api/movimientos (salida con stock insuficiente)

```
curl -X POST http://localhost:3000/api/movimientos \
  -H "Content-Type: application/json" \
  -d '{"productoId":"P11","tipo":"salida","cantidad":999999,"responsable":"Andrés Martínez"}'
```

Resultado: 400 Bad Request — `{"error":"Stock insuficiente. Disponible: 150 unidades"}`

---

## PUT /api/productos/:id

```
curl -X PUT http://localhost:3000/api/productos/P01 \
  -H "Content-Type: application/json" \
  -d '{"stockMinimo":600}'
```

Resultado: 200 OK — stockMinimo actualizado, stockActual sin cambios.

---

## DELETE /api/productos/:id (con movimientos)

```
curl -X DELETE http://localhost:3000/api/productos/P01
```

Resultado: 409 Conflict — `{"error":"No se puede eliminar un producto con movimientos registrados"}`

---

## Filtros combinados

```
curl "http://localhost:3000/api/productos?categoria=Producto%20Terminado&bajoMinimo=true"
```

Resultado: 200 OK — devuelve P11 y P12 (los únicos productos terminados bajo mínimo).

---

**Todos los casos: PASADOS ✅**  
Fecha de ejecución: 16 de junio de 2026
