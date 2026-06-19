# Reglas de documentación

Estas son las reglas que seguí (y que le pedí seguir a la IA cuando me ayudaba) para que toda la documentación del proyecto quedara pareja, sin ese efecto de "este documento lo escribió alguien y el de al lado otra persona completamente distinta".

1. **Cada documento empieza diciendo para qué sirve.** Nada de lanzarse directo a las tablas o los requerimientos sin antes ubicar al lector. Una o dos frases bastan.

2. **Se escribe para quien lo va a leer, no para quedar bonito.** Si el documento es el manual de usuario, pensado para alguien de planta que tal vez no usa computador todos los días, el lenguaje tiene que ser simple. Si es el manual técnico, ahí sí se puede usar vocabulario técnico, porque el lector ya lo conoce.

3. **La documentación tiene que coincidir con lo que realmente se construyó.** Esto suena obvio, pero es la regla que más se rompe en cualquier proyecto: uno documenta lo que pensaba hacer y después el código cambia y nadie actualiza el documento. Aquí, cada vez que el código cambiaba, se revisaba si el documento correspondiente también necesitaba un ajuste.

4. **Nada de secciones vacías o con "pendiente por definir" en la entrega final.** Si algo no aplica, se explica por qué no aplica, en vez de dejarlo en blanco.

5. **Toda tabla, diagrama o ejemplo debe poder entenderse sin tener que adivinar.** Si hay una tabla de endpoints, debe verse claro qué hace cada uno, qué se le manda y qué responde — sin que el lector tenga que ir a leer el código para entenderlo.

6. **Las listas y tablas se usan solo cuando ayudan, no por costumbre.** Hay información que se explica mejor en un párrafo corriente, y forzarla en bullets solo la hace ver más fragmentada de lo que es.

7. **Markdown, siempre.** Todos los documentos del repositorio se escriben en Markdown, para que se puedan leer bien tanto en GitHub como en cualquier editor.

8. **Fechas reales y bitácora honesta.** En la bitácora de avances no se inventan fechas para que se vea bonito; se documenta el proceso real, incluyendo los tropiezos, porque esos también enseñan algo.
