# 04. Requerimientos no funcionales

Estos no son cosas que el sistema "hace", sino cualidades que debe tener mientras hace lo que tiene que hacer. Y aquí también incluyo, sin maquillaje, las limitaciones que decidí aceptar conscientemente para esta versión.

| ID | Requerimiento | Comentario |
|---|---|---|
| RNF01 | Usabilidad | La interfaz debe ser entendible para alguien sin mucha experiencia con sistemas, en pocos minutos de uso. Nada de menús escondidos ni flujos de más de un par de pasos para una tarea común. |
| RNF02 | Portabilidad | El sistema debe poder ejecutarse con solo tener Node.js instalado, sin necesidad de instalar una base de datos externa ni paquetes adicionales. |
| RNF03 | Mantenibilidad | El código debe mantener una separación clara entre frontend, backend y elementos compartidos, para que un cambio en una capa no obligue a tocar las demás. |
| RNF04 | Disponibilidad | Pensado para uso de un solo supervisor por sesión, en un entorno local de planta. No está diseñado para muchos usuarios escribiendo datos al mismo tiempo. |
| RNF05 | Seguridad | **Limitación aceptada conscientemente:** esta versión no incluye autenticación ni control de acceso. Cualquier persona con acceso a la aplicación puede registrar movimientos. Es una limitación válida para un entorno de planta controlado y un alcance académico básico, pero no para un despliegue real sin ajustes adicionales. |
| RNF06 | Persistencia de datos | **Limitación aceptada conscientemente:** los datos se guardan en un archivo JSON del lado del servidor. Es suficiente para esta entrega, pero no es apto para escenarios de alta concurrencia ni para volúmenes grandes de datos históricos. |
| RNF07 | Compatibilidad | El frontend usa JavaScript estándar y la API `fetch`, disponible en cualquier navegador moderno (Chrome, Firefox, Edge), sin necesidad de plugins. |
| RNF08 | Consistencia visual | La interfaz mantiene una identidad visual propia y coherente en sus tres pantallas, evitando una apariencia genérica de plantilla. |

Quiero detenerme un momento en RNF05 y RNF06, porque son las dos limitaciones más importantes del proyecto y prefiero ser honesto sobre ellas en vez de esconderlas entre líneas. Para un sistema académico que resuelve un problema real de mi turno de trabajo, son aceptables. Para que este sistema algún día corriera de verdad en toda la planta, con varios supervisores y varios turnos escribiendo al mismo tiempo, habría que resolver primero esos dos puntos — y de hecho, en `docs/07-arquitectura-general.md` explico cómo se pensó la arquitectura precisamente para que esa evolución fuera posible sin rehacer todo desde cero.
