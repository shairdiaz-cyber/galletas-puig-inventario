# 08. Diseño frontend

Aquí cuento las decisiones de diseño visual: qué pantallas tiene el sistema, por qué se ve como se ve, y el razonamiento detrás de cada elección. Porque el diseño no es decoración — es parte de si la herramienta funciona o no.

---

## Las tres vistas

El sistema tiene una sola página HTML (`index.html`) con tres secciones que se muestran y ocultan según la pestaña activa. No hay cambio de página — todo ocurre en el mismo lugar.

**Vista 1: Tablero**
El primer pantallazo que ve el supervisor al abrir la app. Muestra cuatro tarjetas de resumen (total de productos, materias primas, productos terminados, alertas de bajo mínimo) y dos listas rápidas: los productos que ya están por debajo de su stock mínimo y los últimos 8 movimientos registrados.

**Vista 2: Productos**
La lista completa del catálogo de productos con filtros por categoría, línea de producción y estado de stock. Las filas con stock bajo mínimo se resaltan visualmente. Desde aquí se puede registrar un nuevo producto o eliminar uno existente (siempre que no tenga movimientos).

**Vista 3: Movimientos**
Formulario para registrar entradas y salidas, más el historial de todos los movimientos con filtros por producto y tipo. Cada movimiento se muestra como un "tiquete de bodega" — más sobre eso abajo.

---

## Concepto visual: tablero de planta industrial

La estética no es "panadería artesanal". No hay colores crema con tipografías serif y tonos terracota. El sistema está pensado para usarse en una planta de producción — pantallas con luz intensa, distancia de lectura variable, supervisores que están de pie y con las manos ocupadas.

El concepto es **tablero de control industrial**: limpio, de alto contraste, con información densa pero legible.

---

## Paleta de color

| Nombre | Hex | Uso |
|--------|-----|-----|
| Grafito oscuro | `#20242a` | Header, fondos de énfasis |
| Panel claro | `#f1eee7` | Fondo general del cuerpo |
| Superficie | `#ffffff` | Tarjetas, formularios |
| Ámbar acento | `#d3852f` | Botones primarios, badges, alertas de stock |
| Verde entrada | `#4f7942` | Sello de movimiento tipo ENTRADA |
| Rojo salida | `#af3d2f` | Sello de movimiento tipo SALIDA |
| Hairline | `#ddd7c9` | Bordes sutiles, divisores |

El ámbar tiene doble intención: referencia industrial (señal de precaución) y referencia al producto (tono de galleta tostada). Eso ayuda a que el sistema "pertenezca" al contexto sin caer en lo decorativo.

---

## Tipografía

Tres familias, cada una con un rol:

- **Big Shoulders Display** — Titulares y encabezados. Condensada, de trazos fuertes, muy legible a tamaños grandes. Da el carácter "industrial" sin ser agresiva.
- **Source Sans 3** — Cuerpo de texto, formularios, etiquetas. Neutral, de alta legibilidad, funciona bien a tamaño pequeño.
- **JetBrains Mono** — Datos numéricos: cantidades, fechas, IDs, stocks. Fuente monoespaciada que hace que los números se alineen naturalmente y se lean de un vistazo.

---

## El elemento firma: tiquete de bodega

Los movimientos no se muestran como filas de tabla. Se muestran como **tiquetes**, que es la forma natural en que se registran las entradas y salidas en una bodega real.

Cada tiquete tiene:
- Borde punteado en lugar de línea sólida (evoca papel perforado o ticket de caja).
- Muescas circulares en los laterales (`:before` y `:after` con `border-radius` circular) que simulan las perforaciones de los talonarios de bodega.
- Un **sello rotado** (`transform: rotate(-4deg)`) con el texto ENTRADA o SALIDA, como si fuera el sello de tinta que le estampa el bodeguero al recibir o despachar mercancía.

Esto no es capricho estético — es un elemento que hace que el sistema sea inmediatamente reconocible y coherente con el contexto donde va a vivir.

---

## Responsive

El sistema funciona en pantallas de distintos tamaños con dos puntos de quiebre:

- **880px:** el panel doble (tablero lateral + contenido) pasa a columna única.
- **560px:** las tarjetas de resumen se apilan, la tipografía se ajusta, los botones ocupan ancho completo.

No está diseñado para móvil como uso primario — pero si el supervisor necesita revisarlo desde el teléfono, funciona.

---

## Accesibilidad básica

- Todos los inputs tienen etiquetas `<label>` asociadas.
- Los botones tienen texto descriptivo (no solo iconos).
- El foco del teclado es visible (no se eliminó con `outline: none`).
- Los colores de alerta (ámbar, rojo) tienen contraste suficiente sobre blanco.

---

## Capturas de pantalla

Las capturas reales de la aplicación están en `docs/assets/imagenes/`:

| Archivo | Vista |
|---------|-------|
| `01-tablero.png` | Tablero principal con resumen y alertas |
| `02-productos.png` | Lista de productos con filtros activos |
| `03-productos-formulario.png` | Formulario de registro de nuevo producto |
| `04-movimientos.png` | Historial de movimientos con tiquetes |
