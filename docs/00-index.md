# Índice de documentación — Sistema de Inventario Galletas Puig

Este es el mapa del proyecto. Desde aquí puedes ir a cualquier documento y entender de qué trata sin tener que abrirlo primero.

---

| # | Documento | ¿De qué va? |
|---|-----------|-------------|
| 01 | [Planteamiento del proyecto](01-planteamiento-del-proyecto.md) | El problema real que me motivó a construir esto, contado desde la fábrica |
| 02 | [Objetivos y alcance](02-objetivos-y-alcance.md) | Qué quería lograr y, muy importante, qué decidí dejar fuera por ahora |
| 03 | [Requerimientos funcionales](03-requerimientos-funcionales.md) | Todo lo que el sistema **sí hace**: registrar, editar, filtrar, mover stock |
| 04 | [Requerimientos no funcionales](04-requerimientos-no-funcionales.md) | Cómo debe comportarse: usabilidad, portabilidad y las limitaciones que asumí |
| 05 | [Casos de uso](05-casos-de-uso.md) | Flujos paso a paso de cada acción que puede hacer el supervisor |
| 06 | [Reglas de negocio](06-reglas-de-negocio.md) | Las restricciones que el sistema debe respetar sí o sí (ej. no salida si no hay stock) |
| 07 | [Arquitectura general](07-arquitectura-general.md) | Cómo está organizado el sistema por dentro: frontend, backend, JSON |
| 08 | [Diseño frontend](08-diseno-frontend.md) | La lógica visual: pantallas, paleta de color, tipografía y ese elemento del "tiquete" |
| 09 | [Diseño backend](09-diseno-backend.md) | El servidor Node.js, sus rutas y por qué elegí no usar frameworks |
| 10 | [Modelo de datos](10-modelo-de-datos.md) | Las entidades Producto y Movimiento, con sus campos y relaciones |
| 11 | [API e interfaces](11-api-e-interfaces.md) | Los 9 endpoints REST documentados con ejemplos reales |
| 12 | [Plan de pruebas](12-plan-de-pruebas.md) | Qué se probó, cómo y qué resultados arrojaron las pruebas |
| 13 | [Manual técnico](13-manual-tecnico.md) | Cómo instalar y correr el proyecto desde cero |
| 14 | [Manual de usuario](14-manual-de-usuario.md) | Cómo usar la app, pensado para el supervisor que no es programador |
| 15 | [Bitácora de avances](15-bitacora-de-avances.md) | El registro cronológico de cómo fue avanzando el proyecto |
| 16 | [Entrega final y checklist](16-entrega-final-y-checklist.md) | Lista de verificación de que todo está en orden para la entrega |
| 17 | [Guía de uso de Rules y Agents](17-guia-de-uso-de-rules-y-agents.md) | Cómo se usó la IA estructurada (carpeta `ai/`) durante el desarrollo |

---

> **Nota:** Los diagramas del sistema están embebidos como Mermaid dentro de los documentos correspondientes. GitHub los renderiza automáticamente, así que no hace falta abrir archivos separados.
