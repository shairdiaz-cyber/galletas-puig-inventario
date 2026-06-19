# Reglas de código

Estas reglas aplican tanto para el código que escribí yo como para el que generé con ayuda de la IA. La meta era simple: que el proyecto se viera como si lo hubiera hecho una sola persona, con un criterio consistente de principio a fin.

1. **JavaScript vanilla, sin frameworks ni librerías externas.** Ni en el frontend ni en el backend. La razón es práctica: quería que cualquiera pudiera clonar el repositorio y ejecutarlo sin tener que instalar media docena de paquetes primero. Solo se necesita tener Node instalado.

2. **Nombres en español, claros y descriptivos.** Tanto las variables como las funciones usan nombres en español (`obtenerProductos`, `registrarMovimiento`, `stockActual`), porque todo el proyecto — documentación incluida — está en español, y mezclar idiomas a mitad de camino solo genera confusión.

3. **Separación clara entre frontend, backend y código compartido.** El backend no sabe nada de cómo se ve la interfaz, y el frontend no tiene reglas de negocio escondidas en el HTML. Lo que sí se comparte entre los dos (como las listas de categorías o líneas de producción válidas) vive en `src/shared/`, para no repetirlo dos veces y que un día se desincronicen.

4. **Las reglas de negocio se validan en el backend, no solo en el frontend.** El frontend puede avisarle al usuario que algo está mal antes de enviarlo, para que la experiencia sea más fluida, pero la validación que realmente importa — la que protege los datos — vive en el servidor. Si alguien hiciera una petición directa a la API sin pasar por la interfaz, las reglas igual se respetan.

5. **Cada función hace una sola cosa, y se nota qué cosa es por el nombre.** Si una función empieza a hacer demasiado, se parte en funciones más pequeñas.

6. **Comentarios solo donde realmente aclaran algo.** No se comenta lo obvio (`// suma 1`), pero sí se explica el porqué de una decisión que no sea evidente a primera vista, como por ejemplo por qué el stock nunca se edita directamente.

7. **Manejo de errores explícito.** Toda función de la API que puede fallar (producto no encontrado, datos inválidos, stock insuficiente) responde con un mensaje claro y un código HTTP adecuado, nunca con un error genérico que no le diga nada al usuario.

8. **Antes de dar por terminada una función, se prueba.** No hace falta un framework de pruebas automatizadas para un proyecto de este tamaño, pero sí se verifica manualmente (con `curl` o desde el navegador) que cada endpoint y cada validación se comporte como se espera. El detalle de esas pruebas está en `docs/12-plan-de-pruebas.md`.
