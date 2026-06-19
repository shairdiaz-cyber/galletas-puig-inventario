# 17. Guía de uso de Rules y Agents

Acá cuento cómo usé la IA durante el desarrollo — no de forma genérica, sino contando qué agente usé en cada momento, qué le pedí y qué aportó concretamente al proyecto.

---

## La idea detrás de la carpeta `ai/`

Cuando el profe planteó la actividad, la parte de Rules y Agents me pareció al principio una carga adicional de documentación. Pero en la práctica fue diferente — tener los agentes definidos me ayudó a pensar en el problema desde distintos ángulos, como si tuviera un pequeño equipo especializado en lugar de solo "preguntarle a la IA" sin estructura.

La carpeta `ai/` tiene tres subcarpetas:

- **`rules/`** — restricciones que aplican a todo el proyecto (cómo documentar, cómo nombrar variables, qué patrones seguir).
- **`agents/`** — roles especializados con contexto específico del proyecto.
- **`prompts/`** — plantillas reutilizables para tareas frecuentes.

---

## Agent Arquitecto — Fase de diseño

El primer agente que usé fue el **Agent Arquitecto**. Le di el contexto del problema (inventario de fábrica de galletas, alcance básico, sin frameworks) y le pregunté cómo organizar el proyecto.

Lo más útil que aportó fue la decisión de usar `src/shared/constantes.js`: antes iba a tener las listas de categorías y líneas duplicadas en el frontend y en el backend. El Agente Arquitecto señaló ese problema y propuso el archivo compartido. Eso después evitó varios bugs potenciales.

También me ayudó a definir que el ID del producto no fuera un UUID sino un string con formato `"P01"`, `"P02"`... — más legible en los tiquetes y en el historial.

**Prompt que usé:** `prompt-requerimientos.md` — plantilla para analizar el contexto del negocio y proponer una arquitectura.

---

## Agent Backend — Construcción del servidor

El **Agent Backend** lo usé mientras construía `server.js`. Le pasé el diseño de rutas y le pedí que revisara si faltaba alguna validación.

Fue el que identificó que necesitaba manejar el caso de `DELETE /api/productos/:id` cuando el producto tiene movimientos (error 409, no 400) y que el mensaje de error en salida con stock insuficiente debía incluir el stock disponible actual — así el supervisor sabe exactamente con qué cuenta.

También me sugirió el objeto `meta` en el JSON para los contadores de IDs, que es mucho más limpio que calcular el máximo de los IDs existentes cada vez.

**Prompt que usé:** `prompt-debugging.md` — cuando encontré el bug del routing de IDs.

---

## Agent Frontend — Diseño de la interfaz

El **Agent Frontend** entró cuando tenía el backend funcionando y empecé a pensar la interfaz. Le describí el contexto de uso (supervisor de planta, pantallas industriales, información densa) y me ayudó a rechazar la idea inicial de un diseño "panadería artesanal" en favor de algo más funcional y de alto contraste.

La idea del tiquete de bodega surgió en esa conversación — yo tenía en mente una tabla de movimientos, pero el Agente sugirió referenciar los formatos físicos que ya se usan en la industria. Eso le dio al sistema una identidad visual coherente con su contexto.

**Regla que aplicó:** `reglas-de-codigo.md` — nomenclatura de clases CSS con metodología BEM adaptada.

---

## Agent QA — Pruebas

El **Agent QA** me ayudó a armar el plan de pruebas antes de ejecutarlo. Le pasé la lista de reglas de negocio y me devolvió un esquema de casos de prueba que cubría los flujos normales, los errores esperados y los casos de borde.

Fue útil especialmente para los casos de borde que yo no habría pensado solo: ¿qué pasa si la cantidad del movimiento es exactamente igual al stock disponible? ¿Se permite? (Sí, la validación es `cantidad > stockActual`, así que una salida igual al stock sí pasa.) ¿Qué pasa con `stockMinimo = 0`? (Es válido, simplemente nunca dispara la alerta.)

**Prompt que usé:** `prompt-pruebas.md` — genera casos de prueba a partir de requerimientos y reglas de negocio.

---

## Agent Documentador — Revisión de documentación

El **Agent Documentador** lo usé al final, cuando ya tenía los documentos escritos. Le pedí que revisara la coherencia entre lo documentado y lo implementado: ¿el doc 11 (API) coincide con los endpoints reales? ¿Los casos de uso del doc 05 son alcanzables con la interfaz construida?

Encontró una inconsistencia pequeña: en el doc 05 describí que el supervisor podría "ver el detalle completo de un movimiento" como caso de uso, pero la interfaz no tiene pantalla de detalle de movimiento — todo se ve en el tiquete. Actualicé el caso de uso para reflejar la realidad.

**Regla que aplicó:** `reglas-de-documentacion.md` — la documentación debe coincidir con lo implementado, no con lo deseado.

---

## Reflexión final

La metodología de Rules y Agents cambió cómo trabajé: en lugar de describir el problema completo cada vez que necesitaba ayuda de IA, tenía agentes con contexto ya cargado. Eso hizo las conversaciones más rápidas y los resultados más coherentes entre sí.

Lo más valioso no fueron los agentes por sí solos, sino las **rules**: tener escrito "el stock solo cambia por movimientos" como restricción me ayudó a no ceder cuando en algún momento pensé en agregar un campo de edición directa del stock "para emergencias".

Los prompts reutilizables también fueron útiles — especialmente `prompt-debugging.md`, que tiene un protocolo para aislar bugs antes de pedir ayuda.
