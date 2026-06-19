# 15. Bitácora de avances

Acá está el registro de cómo fue avanzando el proyecto semana a semana. Lo fui escribiendo a medida que iba completando cada parte.

---

## Semana 1 — Definición del problema y análisis inicial
**Fechas: 26 mayo – 1 junio 2026**

Empecé definiendo el problema real: el control de inventario en la planta es manual y desorganizado. Las pérdidas de tiempo son frecuentes — a veces me entero de que falta materia prima cuando ya estamos en medio del turno, y en ese punto ya es tarde.

Definí el alcance con apoyo del Agent Arquitecto: básico, enfocado en productos, stock y movimientos. Nada de auth, nada de gráficos, nada que no pueda terminar solo.

Documenté el planteamiento del proyecto (doc 01), los objetivos y alcance (doc 02) y las reglas de negocio iniciales (doc 06). También diseñé el modelo de datos en papel antes de escribir una línea de código.

**Commits de referencia:** `feat: definición inicial del alcance`, `docs: planteamiento y objetivos`

---

## Semana 2 — Diseño de arquitectura y backend
**Fechas: 2 – 8 junio 2026**

Con el modelo de datos claro, me fui al backend. Decidí usar Node.js puro sin Express — quería entender bien cómo funciona HTTP desde adentro, y además así el proyecto no tiene dependencias.

Primero escribí `db.js` (las funciones de leer y guardar el JSON). Luego construí `server.js` con el routing manual para los 8 endpoints. Usé el Agent Backend para revisar la estructura del código y asegurarme de que las validaciones cubrieran todos los casos de borde.

Encontré un bug importante: los handlers de `GET /:id`, `PUT /:id` y `DELETE /:id` leían el ID de la posición equivocada en el array de partes de la URL. Lo identifiqué con pruebas curl, lo corregí y volví a verificar.

**Commits de referencia:** `feat: servidor HTTP con módulo nativo`, `fix: corrección de routing en endpoints por ID`

---

## Semana 2 (continuación) — Datos de ejemplo y constantes compartidas
**Fechas: 5 – 9 junio 2026**

Creé el catálogo de 12 productos de ejemplo (8 materias primas y 4 productos terminados) y 24 movimientos coherentes, calculando los stocks finales para que dos productos (P11 y P12) quedaran bajo su mínimo — así el dashboard tiene alertas visibles desde el primer arranque.

Creé `shared/constantes.js` con los valores válidos de categorías, líneas, unidades y tipos de movimiento. Este archivo lo carga tanto el backend para validar como el frontend para armar los selectores de los formularios.

**Commits de referencia:** `feat: constantes compartidas`, `feat: datos de ejemplo en db.json`

---

## Semana 3 — Frontend completo
**Fechas: 9 – 14 junio 2026**

Con el backend funcionando, me concentré en el frontend. Definí el concepto visual: "tablero de planta industrial", no "vitrina de panadería". Elegí las tres tipografías y la paleta de color (grafito, ámbar, verde/rojo para entradas/salidas).

El elemento que más me costó y más me gustó fue el "tiquete de bodega": los movimientos se muestran como tiquetes con borde punteado, muescas laterales y un sello rotado. Lo construí con CSS puro usando `:before` y `:after`.

Implementé los seis archivos JS (api.js, utils.js, dashboard.js, productos.js, movimientos.js, app.js) siguiendo el patrón de módulos simples sin imports. Usé el Agent Frontend para revisar la consistencia de los componentes.

Verifiqué la sintaxis de todos los archivos JS con `node --check` — todos pasaron sin errores.

**Commits de referencia:** `feat: frontend completo con 3 vistas`, `style: paleta industrial y componente tiquete`

---

## Semana 3 (continuación) — Pruebas y ajustes finales
**Fechas: 14 – 16 junio 2026**

Corrí todas las pruebas manuales documentadas en el doc 12. Los 24 casos pasaron. Tomé capturas de pantalla de las cuatro vistas principales con la aplicación corriendo.

Ajusté detalles de estilos después de ver la app con datos reales: el resaltado de filas bajo mínimo, el contraste de los sellos de entrada/salida y el comportamiento responsive en pantallas pequeñas.

Regeneré el `db.json` con datos limpios para que la entrega parta de un estado coherente.

**Commits de referencia:** `test: pruebas funcionales completas`, `fix: ajustes visuales post-pruebas`

---

## Semana 4 — Documentación completa
**Fechas: 16 – 18 junio 2026**

Última semana: documentar todo lo construido. Escribí los 18 documentos de `docs/` siguiendo la estructura de la plantilla del profesor.

Usé el Agent Documentador para revisar que la documentación fuera coherente con el código — que los endpoints documentados en doc 11 coincidieran con los que el servidor realmente expone, que los casos de uso en doc 05 fueran alcanzables con la interfaz construida.

Completé también la carpeta `ai/` con las reglas, agentes y prompts, y redacté la guía de uso (doc 17) explicando cómo la IA asistió en cada fase del proyecto.

**Estado al cierre:** proyecto completo, documentación completa, pruebas pasadas, listo para entrega.

**Commits de referencia:** `docs: documentación completa del proyecto`, `chore: preparación de entrega final`
