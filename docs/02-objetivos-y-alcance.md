# 02. Objetivos y alcance

## Objetivo general

Construir un sistema web de gestión de inventario que le permita a un supervisor de producción de una fábrica de galletas controlar, de forma simple y confiable, el stock de materia prima y producto terminado a través del registro de entradas y salidas.

## Objetivos específicos

- Permitir registrar, editar y eliminar productos del inventario, clasificados por categoría (materia prima o producto terminado) y por línea de producción.
- Permitir registrar movimientos de entrada y salida de inventario, validando que una salida nunca deje el stock en un número negativo.
- Mostrar, en un tablero general, un resumen del estado del inventario y una alerta visual clara sobre los productos que están por debajo de su stock mínimo.
- Permitir consultar y filtrar tanto los productos como el historial de movimientos, por categoría, línea de producción o tipo de movimiento.
- Documentar el proyecto completo (análisis, diseño, pruebas) y dejar registrado el proceso de uso de Rules y Agents durante su construcción, tal como lo pide la actividad.

## Alcance — lo que el sistema SÍ incluye

Pues bien, decidí mantener esto deliberadamente básico, porque prefiero un sistema pequeño que funcione bien a uno ambicioso que quede a medias. Lo que sí incluye esta primera versión:

- Gestión completa de productos (crear, editar, listar, eliminar) con sus campos esenciales: nombre, categoría, línea de producción, unidad de medida, stock mínimo y bodega.
- Registro de movimientos de entrada y salida, cada uno con su cantidad, fecha, responsable y motivo.
- Actualización automática del stock a partir de los movimientos — nunca editando el stock directamente.
- Validación de reglas de negocio básicas: no eliminar un producto con movimientos asociados, no permitir una salida mayor al stock disponible, exigir un responsable en cada movimiento.
- Un tablero (dashboard) con totales generales, lista de productos bajo el mínimo y los movimientos más recientes.
- Filtros de consulta sobre productos (por categoría, línea, bajo mínimo) y sobre movimientos (por producto, por tipo).

## Alcance — lo que el sistema NO incluye (por ahora)

Y aquí también quiero ser igual de claro, porque dejar esto explícito evita confusiones más adelante:

- **No hay login ni manejo de usuarios con permisos distintos.** El sistema asume un solo usuario por sesión (el supervisor de turno), que simplemente se identifica con su nombre al usar la aplicación, sin contraseña ni control de acceso.
- **No hay base de datos externa.** Los datos se guardan en un archivo del lado del servidor, suficiente para el alcance de esta entrega, pero no pensado para un escenario de muchos usuarios escribiendo al mismo tiempo.
- **No hay aplicación móvil.** El sistema es una aplicación web que se puede abrir desde un navegador, pero no se construyó una versión nativa para celular.
- **No hay integración con ningún sistema ERP** ni con proveedores externos.
- **No hay generación automática de órdenes de compra** ni de reportes en PDF o Excel — quedó fuera de esta versión a propósito, para no desviar el esfuerzo de lo esencial.
- **No hay reportes ni gráficos estadísticos.** El tablero muestra el estado actual, no tendencias históricas.

Estas exclusiones no son un olvido, son la frontera que decidí trazar para esta primera versión. En `docs/07-arquitectura-general.md` cuento un poco más sobre cómo se podría evolucionar el sistema hacia algo más completo en una siguiente fase.
