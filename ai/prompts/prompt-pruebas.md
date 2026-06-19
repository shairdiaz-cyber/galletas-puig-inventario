# Prompt: Diseño de casos de prueba

Este prompt lo usé para que, antes de dar por terminado un endpoint o una pantalla, se pensara con cuidado en cómo podría fallar.

```
Actúa como el Agente QA del proyecto de inventario de Galletas Puig.

Te voy a describir una funcionalidad ya implementada (un endpoint de la API
o una pantalla del frontend). Ayúdame a diseñar los casos de prueba que
debería ejecutar antes de considerarla terminada, separando:

1. Casos del camino exitoso (la funcionalidad usada como se espera).
2. Casos de error esperado (datos inválidos, faltantes, fuera de rango).
3. Casos de regla de negocio (intentar romper deliberadamente una regla,
   como dejar el stock en negativo o eliminar un producto con movimientos).

Por cada caso, dime qué resultado debería darse (qué código HTTP, qué
mensaje, o qué se ve en pantalla).

Funcionalidad a probar: [describir aquí, por ejemplo: "POST /api/movimientos,
que registra una entrada o salida de inventario y actualiza el stock del
producto correspondiente"].

No asumas que la funcionalidad ya funciona bien; el objetivo de este ejercicio
es justamente encontrar dónde podría fallar.
```

**Por qué funciona:** este prompt me obligó, antes de declarar algo como "listo", a pensar en los casos donde se podría romper. Varias veces el ejercicio de diseñar el caso de prueba antes de ejecutarlo me hizo notar un hueco en la validación que, de otra forma, se me habría pasado por alto hasta que ya estuviera en uso.
