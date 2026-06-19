# Prompt: Generación de casos de uso

Este prompt lo usé para pasar de la lista de requerimientos funcionales a casos de uso completos, con su flujo principal y sus flujos alternos.

```
Actúa como el Agente Arquitecto del proyecto de inventario de Galletas Puig.

Te voy a dar un requerimiento funcional ya definido. Conviértelo en un caso
de uso completo, con esta estructura:

- Actor (quién hace la acción; en este sistema casi siempre es el supervisor
  de turno).
- Precondiciones (qué debe ser cierto antes de que el caso de uso pueda
  empezar).
- Flujo principal (los pasos en orden, numerados, del camino exitoso).
- Flujo alterno (qué pasa si algo sale mal: dato inválido, regla de negocio
  que se incumple, etc.).
- Postcondición (cómo queda el sistema después de un flujo exitoso).

Requerimiento funcional: [pegar aquí el requerimiento, por ejemplo: "RF04 -
El sistema debe permitir registrar una salida de inventario, validando que
no se deje el stock en negativo"].

No agregues pasos que no tengan sentido para un sistema básico (sin login,
sin notificaciones automáticas, sin reportes). Si el flujo alterno requiere
una regla de negocio que aún no está definida, dilo explícitamente en vez de
inventarla.
```

**Por qué funciona:** pedirle a la IA "hazme los casos de uso" sin más, casi siempre termina en casos de uso genéricos de manual de universidad. Este prompt amarra cada caso de uso a un requerimiento ya validado, y deja claro que no debe inventar reglas de negocio sobre la marcha — si falta una regla, que lo diga, para yo definirla con criterio real de planta y no dejar que la IA decida sola algo tan importante.
