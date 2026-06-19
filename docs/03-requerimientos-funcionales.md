# 03. Requerimientos funcionales

Aquí están los requerimientos funcionales del sistema, es decir, todo lo que la aplicación debe poder HACER. Cada uno salió de pensar en una tarea real que hago (o debería poder hacer) como supervisor de turno.

| ID | Requerimiento |
|---|---|
| RF01 | El sistema debe permitir registrar un nuevo producto, indicando nombre, categoría (Materia Prima o Producto Terminado), línea de producción, unidad de medida, stock mínimo y bodega de almacenamiento. |
| RF02 | El sistema debe permitir editar los datos de un producto ya existente (nombre, categoría, línea, unidad, stock mínimo, bodega), sin permitir modificar directamente su stock actual. |
| RF03 | El sistema debe permitir eliminar un producto, siempre y cuando no tenga movimientos de entrada o salida asociados. |
| RF04 | El sistema debe permitir listar todos los productos registrados, mostrando su stock actual frente a su stock mínimo. |
| RF05 | El sistema debe permitir filtrar la lista de productos por categoría, por línea de producción, o mostrar únicamente los que están por debajo de su stock mínimo. |
| RF06 | El sistema debe permitir registrar un movimiento de entrada de inventario, indicando el producto, la cantidad, el responsable y un motivo u observación. |
| RF07 | El sistema debe permitir registrar un movimiento de salida de inventario, con las mismas validaciones de la entrada, y rechazando la operación si la cantidad solicitada supera el stock disponible. |
| RF08 | Cada movimiento registrado (entrada o salida) debe actualizar automáticamente el stock del producto correspondiente. |
| RF09 | El sistema debe permitir consultar el historial completo de movimientos, ordenado del más reciente al más antiguo. |
| RF10 | El sistema debe permitir filtrar el historial de movimientos por producto o por tipo de movimiento (entrada o salida). |
| RF11 | El sistema debe mostrar un tablero general con: total de productos registrados, total por categoría, cantidad de productos bajo el mínimo, y los movimientos más recientes. |
| RF12 | El sistema debe resaltar visualmente, tanto en el tablero como en el listado de productos, cualquier producto cuyo stock actual esté por debajo de su stock mínimo. |
| RF13 | El sistema debe permitir que el supervisor de turno indique su nombre al usar la aplicación, y ese nombre quede asociado a los movimientos que registre. |

Una aclaración: estos requerimientos están redactados pensando en lo que el sistema debe permitir, no en cómo lo hace por dentro — el cómo está en los documentos de arquitectura y diseño. Y como mencioné en el documento de alcance, no incluí a propósito requerimientos relacionados con login, reportes avanzados o integración con otros sistemas, porque quedaron fuera de esta primera versión.
