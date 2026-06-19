# Reglas de pruebas

1. **Toda regla de negocio importante necesita al menos una prueba que la confirme.** Si el sistema dice que no se puede registrar una salida mayor al stock disponible, tiene que existir una prueba que intente hacer exactamente eso y compruebe que el sistema la rechaza. De nada sirve documentar una regla que nunca se verificó.

2. **Se prueba tanto el camino correcto como el camino que falla.** No basta con probar que un producto se puede crear bien; también hay que probar qué pasa cuando falta un dato obligatorio, cuando se manda una categoría que no existe, o cuando se intenta eliminar algo que no debería poder eliminarse.

3. **Las pruebas de la API se hacen a nivel de endpoint, con `curl` o herramienta equivalente.** Como el proyecto no tiene un framework de pruebas automatizadas (no hacía falta para este alcance), las pruebas funcionales se ejecutan directamente contra los endpoints, revisando que la respuesta y el código HTTP sean los esperados.

4. **Las pruebas de interfaz se hacen navegando la aplicación real**, verificando que los formularios validen lo que tienen que validar, que las tablas se actualicen después de cada acción y que las alertas visuales (como el resaltado de bajo mínimo) aparezcan cuando corresponde.

5. **Cada prueba ejecutada se registra**, con su resultado, en `docs/12-plan-de-pruebas.md`. Si una prueba falla, se anota qué falló, se corrige, y se vuelve a correr — no se borra el rastro de que en algún momento falló, porque eso también es parte de la evidencia del proceso.

6. **Antes de la entrega final, se corre una ronda completa de pruebas sobre la versión definitiva**, no sobre una versión intermedia que ya cambió. Esto evita el clásico problema de documentar pruebas que se hicieron sobre una versión anterior del código.
