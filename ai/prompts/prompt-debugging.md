# Prompt: Depuración de errores

Este prompt lo usé las veces que algo no funcionaba como esperaba y necesitaba ayuda para encontrar la causa, no solo un parche rápido.

```
Actúa como el Agente Backend (o el Agente Frontend, según corresponda) del
proyecto de inventario de Galletas Puig.

Tengo un error y necesito que me ayudes a encontrar la causa real, no solo a
silenciar el síntoma. Te voy a dar:

1. Qué esperaba que pasara.
2. Qué pasó en realidad (incluyendo el mensaje de error exacto, si lo hay).
3. El código relevante de la función o ruta donde creo que está el problema.

Esperaba: [describir].
Pasó en realidad: [describir, con el error textual si existe].
Código relevante:
[pegar aquí el fragmento de código].

Antes de proponer una corrección, explícame en una o dos frases cuál crees
que es la causa del problema. Si la corrección implica cambiar una regla de
negocio o una validación, dímelo explícitamente para que yo decida si esa
regla debe cambiar o no.
```

**Por qué funciona:** este fue justamente el prompt que usé cuando encontré el error en el enrutamiento del backend (los endpoints `GET /api/productos/:id`, `PUT` y `DELETE` estaban leyendo mal el identificador de la URL). Pedir primero la causa, antes que la corrección, evitó que se aplicara un parche que tapara el síntoma sin resolver el problema de fondo.
