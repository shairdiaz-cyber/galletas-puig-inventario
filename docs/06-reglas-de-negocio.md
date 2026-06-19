# 06. Reglas de negocio

Las reglas de negocio son las restricciones que el sistema debe respetar pase lo que pase. No son caprichos — cada una tiene una razón práctica que surge de cómo funciona de verdad una fábrica de galletas.

---

## RN01 — No puede haber salida si el stock es insuficiente

Si alguien intenta registrar una salida de 500 kg de harina y solo hay 200 kg disponibles, el sistema la rechaza. Punto.

Esto evita que el inventario quede en negativo, que sería peor que no tener inventario: significaría que los números mienten.

> **Ejemplo real:** en el turno anterior me pasó que alguien registró una salida "a ojo" y el sistema quedó mostrando -80 kg. Nadie supo qué era real. Con esta regla eso no puede pasar.

---

## RN02 — El stock solo puede cambiar a través de movimientos

No se puede editar el campo `stockActual` de un producto directamente. La única forma de subir o bajar el stock es registrando un movimiento (entrada o salida).

¿Por qué? Porque así queda todo trazado. Si el stock bajó, hay una salida que lo explica. Si subió, hay una entrada. Sin esto, el inventario se convierte en un número que "alguien cambió" sin saber cuándo ni por qué.

---

## RN03 — No se puede eliminar un producto si tiene movimientos asociados

Si un producto ya tiene historial de entradas o salidas registradas, no se puede borrar del sistema. Se puede desactivar o ignorar, pero la trazabilidad se preserva.

Esto protege la integridad de los datos históricos. Si se borrara el producto, los movimientos quedarían huérfanos y los registros no cuadrarían.

---

## RN04 — La categoría debe ser una de las dos válidas

Solo existen dos categorías posibles: `Materia Prima` y `Producto Terminado`. No se aceptan valores distintos.

Esto previene que alguien cree categorías inventadas (como "Semiprocesado" o "Otro") que romperían los filtros y los reportes del dashboard.

---

## RN05 — La línea de producción debe pertenecer al catálogo

Las líneas válidas son: `General`, `Línea Avena`, `Línea Wafer`, `Línea Soda` y `Línea Chocolate`. Cualquier otra combinación es rechazada.

---

## RN06 — La cantidad en un movimiento siempre debe ser mayor a cero

No tiene sentido registrar una entrada de 0 kg ni una salida de 0 unidades. Si eso ocurre, es un error del formulario o del sistema de donde venga el dato.

---

## RN07 — "Bajo mínimo" significa stock actual menor al stock mínimo definido

Cuando `stockActual < stockMinimo`, el producto se marca visualmente como bajo mínimo. Esto dispara la alerta en el tablero y resalta la fila en la tabla de productos.

El stock mínimo lo define quien administra cada producto según su criterio de operación (cuántos días de consumo quiere tener garantizados, por ejemplo).

---

## RN08 — Todo movimiento debe tener un responsable registrado

No se puede registrar una entrada o salida sin indicar quién la está registrando. El campo "responsable" es obligatorio.

Esto no es para vigilar a nadie — es para que, si hay una discrepancia, se pueda conversar con la persona indicada y reconstruir qué pasó.

---

## Resumen rápido

| Código | Regla | Consecuencia si se viola |
|--------|-------|--------------------------|
| RN01 | No salida si stock insuficiente | El sistema retorna error 400 |
| RN02 | Stock solo cambia por movimientos | El campo no es editable directamente |
| RN03 | No eliminar producto con movimientos | El sistema retorna error 409 |
| RN04 | Categoría debe ser válida | El sistema retorna error 400 |
| RN05 | Línea debe estar en catálogo | El sistema retorna error 400 |
| RN06 | Cantidad > 0 siempre | El sistema retorna error 400 |
| RN07 | Bajo mínimo = stockActual < stockMinimo | Alerta visual, no bloqueo |
| RN08 | Responsable obligatorio en movimientos | El sistema retorna error 400 |
