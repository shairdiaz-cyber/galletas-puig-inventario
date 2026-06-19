# 12. Plan de pruebas

Las pruebas las hice de forma manual: primero con `curl` para verificar que la API respondiera bien a distintos escenarios, y luego navegando la app directamente desde el browser para confirmar que el frontend mostrara todo correctamente. No hay pruebas automatizadas — está dentro del alcance básico que definí.

---

## Estrategia de pruebas

El enfoque fue probar primero las reglas de negocio más críticas (¿rechaza una salida sin stock suficiente?) y luego los flujos normales de uso. También probé casos de error: datos faltantes, IDs inexistentes, categorías inválidas.

---

## Casos de prueba ejecutados

### Bloque 1: Productos

| ID | Descripción | Resultado esperado | Estado |
|----|-------------|-------------------|--------|
| PT-01 | Listar todos los productos | Devuelve los 12 productos del catálogo | ✅ Pasó |
| PT-02 | Obtener producto por ID válido | Devuelve el objeto completo del producto | ✅ Pasó |
| PT-03 | Obtener producto con ID inexistente | Error 404 con mensaje claro | ✅ Pasó |
| PT-04 | Crear producto con todos los campos válidos | Producto creado con ID autoasignado, stockActual=0 | ✅ Pasó |
| PT-05 | Crear producto con categoría inválida | Error 400 con mensaje de validación | ✅ Pasó |
| PT-06 | Crear producto sin nombre | Error 400 indicando campo obligatorio | ✅ Pasó |
| PT-07 | Editar stockMinimo de un producto | Campo actualizado, stockActual sin cambios | ✅ Pasó |
| PT-08 | Eliminar producto sin movimientos | Producto eliminado correctamente | ✅ Pasó |
| PT-09 | Eliminar producto que tiene movimientos | Error 409, operación rechazada | ✅ Pasó |
| PT-10 | Filtrar productos por categoría + bajoMinimo | Devuelve solo los productos que cumplan ambos filtros | ✅ Pasó |

### Bloque 2: Movimientos

| ID | Descripción | Resultado esperado | Estado |
|----|-------------|-------------------|--------|
| PM-01 | Registrar entrada válida | Movimiento creado, stockActual del producto aumenta | ✅ Pasó |
| PM-02 | Registrar salida con stock suficiente | Movimiento creado, stockActual del producto disminuye | ✅ Pasó |
| PM-03 | Registrar salida con stock insuficiente | Error 400 indicando el stock disponible | ✅ Pasó |
| PM-04 | Registrar movimiento sin responsable | Error 400, campo obligatorio | ✅ Pasó |
| PM-05 | Registrar movimiento con cantidad 0 | Error 400, cantidad debe ser mayor a cero | ✅ Pasó |
| PM-06 | Registrar movimiento para producto inexistente | Error 404 | ✅ Pasó |
| PM-07 | Filtrar movimientos por producto específico | Solo devuelve movimientos de ese producto | ✅ Pasó |
| PM-08 | Filtrar movimientos por tipo | Solo entradas o solo salidas según el filtro | ✅ Pasó |

### Bloque 3: Dashboard

| ID | Descripción | Resultado esperado | Estado |
|----|-------------|-------------------|--------|
| PD-01 | Obtener resumen | Totales correctos y los 2 productos bajo mínimo (P11, P12) | ✅ Pasó |
| PD-02 | Verificar que productos bajo mínimo aparecen en dashboard | P11 y P12 en la lista de alertas | ✅ Pasó |

### Bloque 4: Archivos estáticos

| ID | Descripción | Resultado esperado | Estado |
|----|-------------|-------------------|--------|
| PE-01 | Cargar index.html desde el servidor | Responde 200 con el HTML completo | ✅ Pasó |
| PE-02 | Cargar styles.css | Responde 200 con el CSS | ✅ Pasó |
| PE-03 | Cargar archivos JS del frontend | Todos responden 200 | ✅ Pasó |
| PE-04 | Cargar constantes.js desde /shared/ | Responde 200, disponible en el navegador | ✅ Pasó |

---

## Resultado general

**24 de 24 casos: pasaron.** No quedó ningún caso fallido pendiente de resolver.

El único bug encontrado durante el proceso fue un error de routing en el servidor: los handlers de `GET /:id`, `PUT /:id` y `DELETE /:id` leían el ID de la posición equivocada del array de partes de la URL. Se identificó, se corrigió y se verificó con los casos PT-02, PT-07, PT-08 y PT-09.

---

## Evidencia

Las capturas de pantalla de la aplicación funcionando están en `docs/assets/imagenes/`. Los logs de las pruebas con curl están en `deliverables/evidencia/pruebas-curl.md`.
