# Carpeta `ai/` — Rules, Agents y Prompts

Pues bien, esta carpeta es probablemente la parte más distinta de todo el repositorio, porque aquí no hay código de la aplicación ni documentación del negocio... aquí está la "metodología" que usé para apoyarme en una IA mientras construía el proyecto.

La idea, si la resumo en una frase, es esta: en lugar de pedirle ayuda a la IA de forma improvisada cada vez (un día de una manera, otro día de otra), definí de antemano **reglas** que debía respetar siempre, **agentes** con un rol específico cada uno, y **prompts** reutilizables para las tareas que se repetían. Así el trabajo queda más ordenado y, sobre todo, más fácil de repetir o de explicarle a alguien más.

## ¿Por qué organizarlo así?

Cuando uno supervisa una línea de producción, rápidamente aprende que las cosas funcionan mejor cuando hay un procedimiento claro y cada persona sabe qué le toca. Si el operario de empaque no sabe qué hacer cuando ve un lote mal sellado, se pierde tiempo y a veces hasta producto. Pasé esa misma lógica al desarrollo: en vez de improvisar con la IA cada vez, dejé "procedimientos" escritos.

- **`rules/`** — son las reglas fijas, las que no cambian sin importar qué se esté construyendo: cómo documentar, cómo escribir código, cómo estructurar la arquitectura, cómo probar.
- **`agents/`** — son los "roles" que le pedí a la IA que asumiera según la tarea: un agente arquitecto, uno de frontend, uno de backend, uno de pruebas (QA) y uno documentador. Cada uno con su enfoque particular.
- **`prompts/`** — son plantillas de instrucciones que reutilicé para tareas puntuales: levantar requerimientos, escribir casos de uso, diseñar pruebas y depurar errores.

## ¿Cómo se usó esto en la práctica?

Durante la construcción del sistema, antes de pedir cualquier cosa, revisaba primero qué regla aplicaba y qué "agente" le tocaba responder. Por ejemplo, cuando necesitaba definir los endpoints del backend, no le pedía a la IA "hazme una API" sin más contexto — le indicaba que actuara como el Agente Backend, siguiendo las reglas de arquitectura y de código que ya tenía escritas. El resultado fue un desarrollo bastante más consistente, sin tantos cambios de estilo entre una parte del código y otra.

Si quieres ver el detalle completo de cómo se aplicó esto durante el proyecto, en `docs/17-guia-de-uso-de-rules-y-agents.md` cuento paso a paso cómo fue el proceso real, con ejemplos concretos de cada etapa.
