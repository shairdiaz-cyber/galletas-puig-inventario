# Reglas de arquitectura

1. **Arquitectura simple, de tres capas claras.** Frontend (lo que ve el supervisor), backend (la API que aplica las reglas de negocio) y persistencia (donde quedan guardados los datos). Nada de capas intermedias que no aporten nada en un proyecto de este tamaño.

2. **El backend es la única puerta hacia los datos.** El frontend nunca lee ni escribe el archivo de datos directamente; siempre pasa por la API. Esto es importante porque es lo que permite, el día de mañana, cambiar de un archivo JSON a una base de datos real sin tener que rehacer el frontend.

3. **Sin base de datos externa por ahora, pero pensado para crecer hacia una.** Se eligió un archivo JSON como almacenamiento porque es suficiente para el alcance académico de esta entrega y porque no exige instalar ni configurar un motor de base de datos. La capa de acceso a datos (`db.js`) está aislada precisamente para que, si más adelante se quiere pasar a SQLite o PostgreSQL, el cambio quede contenido en un solo archivo y no se tenga que tocar el resto del backend.

4. **Una sola fuente de verdad para las reglas del negocio.** Categorías válidas, líneas de producción, unidades de medida y tipos de movimiento se definen una sola vez, en `src/shared/constantes.js`, y de ahí las toman tanto el frontend como el backend.

5. **El servidor sirve tanto la API como los archivos estáticos.** Para mantener el proyecto simple de ejecutar (un solo comando, un solo proceso), el mismo servidor Node entrega tanto las rutas `/api/...` como el HTML, CSS y JS del frontend. En una fase más avanzada del proyecto, esto se separaría en dos servicios independientes.

6. **Toda decisión de arquitectura debe poder explicarse con una razón práctica.** Si una decisión no tiene una razón clara más allá de "porque sí", probablemente no es la decisión correcta. El detalle de cada una de estas decisiones, con su justificación, está en `docs/07-arquitectura-general.md`.
