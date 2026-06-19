# Prompt: Levantamiento de requerimientos

Este es el prompt que usé cada vez que necesitaba pasar de "una idea en mi cabeza sobre cómo funciona la planta" a requerimientos concretos y escribibles.

```
Actúa como el Agente Arquitecto del proyecto de inventario de Galletas Puig.

Contexto: soy supervisor de producción en una fábrica de galletas con varias
líneas (avena, wafer, soda, chocolate). Quiero un sistema básico de inventario
que cubra productos, stock y entradas/salidas, sin login, sin base de datos
externa por ahora, pensado para un solo usuario por sesión.

Te voy a describir una situación real de mi trabajo. A partir de ella, ayúdame
a extraer:
1. Qué requerimiento funcional concreto resuelve (qué debe poder HACER el
   sistema).
2. Si aplica, qué requerimiento no funcional se desprende (qué tan rápido,
   qué tan simple de usar, qué limitación es aceptable).
3. Si hay una regla de negocio escondida en la situación (algo que el sistema
   NUNCA debe permitir, o que SIEMPRE debe exigir).

Situación: [describir aquí la situación real, por ejemplo: "una vez se nos
acabó la harina a mitad de turno y nadie se dio cuenta hasta que la línea
ya estaba detenida"].

Responde de forma breve y concreta, sin inventar requerimientos que yo no
haya mencionado o que no se desprendan claramente de la situación descrita.
```

**Por qué funciona:** en vez de pedirle a la IA que "invente" requerimientos de un sistema de inventario genérico (que es lo que pasa si uno no da contexto), este prompt obliga a partir de una situación real de la planta, y de ahí sacar el requerimiento. Eso evita funcionalidades de relleno que suenan bien pero que no resuelven nada concreto de mi trabajo.
