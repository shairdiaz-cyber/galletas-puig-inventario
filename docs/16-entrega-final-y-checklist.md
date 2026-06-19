# 16. Entrega final y checklist

Esta es la lista de verificación antes de entregar. La usé para confirmar que no me faltó nada de lo que el profesor pidió.

---

## Estructura del repositorio

- [x] `README.md` en la raíz con descripción del proyecto
- [x] `.gitignore` configurado
- [x] Carpeta `src/frontend/` con HTML, CSS y JS
- [x] Carpeta `src/backend/` con servidor Node.js
- [x] Carpeta `src/shared/` con constantes compartidas
- [x] Carpeta `docs/` con todos los documentos requeridos
- [x] Carpeta `ai/` con rules, agents y prompts
- [x] Carpeta `deliverables/` con evidencias y release notes
- [x] Carpeta `.github/` con plantilla de pull request

---

## Documentación (docs/)

- [x] 00 — Índice navegable
- [x] 01 — Planteamiento del proyecto
- [x] 02 — Objetivos y alcance
- [x] 03 — Requerimientos funcionales
- [x] 04 — Requerimientos no funcionales
- [x] 05 — Casos de uso
- [x] 06 — Reglas de negocio
- [x] 07 — Arquitectura general (con diagrama Mermaid)
- [x] 08 — Diseño frontend
- [x] 09 — Diseño backend
- [x] 10 — Modelo de datos (con diagrama ER en Mermaid)
- [x] 11 — API e interfaces (todos los endpoints documentados)
- [x] 12 — Plan de pruebas (24 casos, todos pasados)
- [x] 13 — Manual técnico
- [x] 14 — Manual de usuario
- [x] 15 — Bitácora de avances
- [x] 16 — Este documento
- [x] 17 — Guía de uso de Rules y Agents
- [x] Capturas de pantalla reales en `docs/assets/imagenes/`

---

## Carpeta ai/

- [x] `ai/README.md` — propósito de la carpeta
- [x] `ai/rules/reglas-de-documentacion.md`
- [x] `ai/rules/reglas-de-codigo.md`
- [x] `ai/rules/reglas-de-arquitectura.md`
- [x] `ai/rules/reglas-de-pruebas.md`
- [x] `ai/agents/agent-arquitecto.md`
- [x] `ai/agents/agent-frontend.md`
- [x] `ai/agents/agent-backend.md`
- [x] `ai/agents/agent-qa.md`
- [x] `ai/agents/agent-documentador.md`
- [x] `ai/prompts/prompt-requerimientos.md`
- [x] `ai/prompts/prompt-casos-de-uso.md`
- [x] `ai/prompts/prompt-pruebas.md`
- [x] `ai/prompts/prompt-debugging.md`

---

## El sistema funciona

- [x] El servidor arranca con `node server.js` sin errores
- [x] La app carga en `http://localhost:3000`
- [x] El tablero muestra datos reales del `db.json`
- [x] Se puede registrar un nuevo producto
- [x] Se puede registrar una entrada y el stock sube
- [x] Se puede registrar una salida y el stock baja
- [x] La salida es rechazada si no hay stock suficiente
- [x] El producto bajo mínimo aparece en las alertas del tablero
- [x] Los filtros de productos y movimientos funcionan
- [x] No se puede eliminar un producto con movimientos

---

## Calidad del código

- [x] Todos los archivos JS del frontend pasan `node --check` sin errores de sintaxis
- [x] Las validaciones del backend cubren los 8 casos de las reglas de negocio
- [x] El código tiene comentarios explicativos donde la lógica no es obvia
- [x] No hay credenciales, tokens ni datos sensibles en el repositorio

---

## Nota final

El proyecto cumple con los requerimientos del alcance básico definido al inicio: gestión de productos, control de stock y registro de movimientos. Las limitaciones (sin auth, sin DB real, sin uso simultáneo) están todas documentadas conscientemente en los documentos técnicos correspondientes.

**Versión entregada:** v1.0.0  
**Fecha de entrega:** 18 de junio de 2026
