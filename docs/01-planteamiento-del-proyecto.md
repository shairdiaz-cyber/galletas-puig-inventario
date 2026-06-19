# 01. Planteamiento del proyecto

Voy a empezar contando de dónde sale esto, porque creo que ayuda a entender por qué el sistema quedó como quedó.

Trabajo como supervisor de producción en Galletas Puig. La fábrica tiene varias líneas — avena, wafer, soda, chocolate — y cada línea consume materia prima constantemente: harina, azúcar, mantequilla, chocolate en gotas, empaques, cajas... y al mismo tiempo va generando producto terminado que hay que llevar a bodega. Mi trabajo, entre muchas otras cosas, incluye estar al tanto de que no se nos acabe nada a mitad de turno y de que el producto terminado quede bien registrado antes de salir hacia distribución.

El problema es que, en la práctica, ese control de inventario se hacía de forma bastante manual. Cuadernos, hojas sueltas, algún Excel que alguien actualizaba cuando se acordaba... y eso, en una planta con varias líneas corriendo al mismo tiempo, se presta para errores. Te cuento un caso real: en una ocasión la línea de avena se detuvo casi cuarenta minutos porque nadie había notado que el stock de harina ya estaba por debajo de lo necesario. Nadie lo hizo a propósito, simplemente nadie tenía una forma rápida de verlo antes de que fuera demasiado tarde. Y no fue la única vez — también hemos tenido conteos de producto terminado que no coinciden entre lo que se anotó y lo que realmente había en bodega, sencillamente porque alguien olvidó registrar una salida.

Cuando el profesor de Lenguaje de Programación 3 propuso esta actividad — diseñar, documentar y construir una aplicación con apoyo de Rules y Agents — pensé que era la oportunidad perfecta para no hacer un ejercicio aislado, sino algo que realmente le sirviera a mi trabajo. Así que decidí construir un sistema de inventario pensado específicamente en las funciones que cumplo como supervisor: saber qué hay, saber cuánto entra y cuánto sale, y darme cuenta a tiempo cuando algo se está quedando corto.

## El problema, resumido

No hay una forma centralizada y confiable de saber, en cualquier momento del turno, cuánta materia prima y cuánto producto terminado hay disponible por línea de producción, ni de ver con claridad qué está por debajo del mínimo necesario para seguir produciendo sin contratiempos.

## La solución que propongo

Un sistema web sencillo donde se puede registrar cada producto (materia prima o producto terminado), asociarlo a una línea de producción, y llevar el control de su stock exclusivamente a través de movimientos de entrada y salida — nunca editando el número a mano, porque eso es justo lo que hace que un inventario pierda confiabilidad. El sistema, además, resalta de inmediato cualquier producto que esté por debajo de su stock mínimo, para que esa alerta no dependa de que alguien se acuerde de revisar.

No es un sistema con todas las funciones que tendría un ERP de planta completo — y eso es intencional. El alcance que defino en el siguiente documento es deliberadamente básico, pensado para resolver bien lo esencial antes de pensar en algo más ambicioso.
