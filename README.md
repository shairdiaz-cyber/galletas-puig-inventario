# 🍪 Sistema de Inventario — Galletas Puig

> Proyecto académico — Lenguaje de Programación 3  
> Aplicación web de gestión de inventario para una fábrica de galletas con múltiples líneas de producción.

---

## El problema que resuelve

Trabajo como supervisor de producción en Galletas Puig. La fábrica tiene cuatro líneas activas — avena, wafer, soda, chocolate — y cada turno consume materia prima constantemente mientras genera producto terminado que tiene que quedar registrado.

El problema: el control era manual. Apuntes en cuadernos, conteos "a ojo", enterarse de que falta harina cuando ya la línea está detenida. Este sistema reemplaza eso con una herramienta simple, rápida y que corre sin instalar nada raro.

---

## Qué hace la app

- **Tablero de control:** resumen de stocks, alertas de productos bajo mínimo y últimos movimientos del turno.
- **Gestión de productos:** registrar, editar y filtrar materias primas y productos terminados por línea de producción.
- **Registro de movimientos:** entradas y salidas de stock con validación en tiempo real (no permite sacar más de lo que hay).
- **Historial:** tiquetes de bodega con fecha, responsable y motivo de cada movimiento.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, JavaScript vanilla |
| Backend | Node.js (módulo `http` nativo, sin frameworks) |
| Persistencia | JSON en disco |
| Tipografías | Big Shoulders Display, Source Sans 3, JetBrains Mono |

Sin dependencias externas. Sin base de datos que configurar. Sin `npm install`.

---

## Cómo correrlo

```bash
# 1. Clonar el repositorio
git clone https://github.com/shairdiaz-cyber/galletas-puig-inventario.git

# 2. Entrar al backend
cd galletas-puig-inventario/src/backend

# 3. Iniciar el servidor
node server.js
```

Abrir en el navegador: **http://localhost:3000**

Requiere **Node.js v18 o superior**. Nada más.

---

## Documentación

Toda la documentación técnica y funcional está en la carpeta [`docs/`](docs/00-index.md).

| Documento | Contenido |
|-----------|-----------|
| [Planteamiento](docs/01-planteamiento-del-proyecto.md) | El problema real y por qué construí esto |
| [Arquitectura](docs/07-arquitectura-general.md) | Cómo está organizado el sistema |
| [API](docs/11-api-e-interfaces.md) | Los 9 endpoints REST con ejemplos |
| [Manual de usuario](docs/14-manual-de-usuario.md) | Cómo usar la app paso a paso |
| [Manual técnico](docs/13-manual-tecnico.md) | Instalación, configuración y troubleshooting |

---

## Rules y Agents

La carpeta [`ai/`](ai/README.md) contiene las reglas, agentes y prompts reutilizables que guiaron el desarrollo con apoyo de IA. Ver [`docs/17-guia-de-uso-de-rules-y-agents.md`](docs/17-guia-de-uso-de-rules-y-agents.md) para entender cómo se usaron en la práctica.

---

## Versión

**v1.0.0** — Junio 2026  
Alcance: gestión básica de inventario (productos, stock, entradas/salidas).  
Estado: ✅ Completo y probado.
