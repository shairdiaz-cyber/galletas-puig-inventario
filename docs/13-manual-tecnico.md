# 13. Manual técnico

Este documento es para quien quiera instalar y correr el proyecto. Está escrito asumiendo que la persona sabe usar la terminal pero no necesariamente conoce el proyecto.

---

## Requisitos

Solo se necesita una cosa:

- **Node.js versión 18 o superior.** Se puede verificar con `node --version`. Si da algo como `v18.x.x` o mayor, está bien.

No hay base de datos que instalar. No hay paquetes que descargar con `npm install`. No hay nada más.

---

## Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/galletas-puig-inventario.git

# 2. Entrar al directorio del backend
cd galletas-puig-inventario/src/backend

# 3. Iniciar el servidor
node server.js

# Alternativa (usando npm):
npm start
```

El servidor va a responder:
```
Servidor corriendo en http://localhost:3000
```

Abrir esa dirección en cualquier navegador moderno y listo — la app está funcionando.

---

## Estructura del proyecto

```
galletas-puig-inventario/
├── src/
│   ├── frontend/               ← Interfaz de usuario (HTML, CSS, JS)
│   │   ├── index.html
│   │   ├── css/styles.css
│   │   └── js/
│   │       ├── api.js
│   │       ├── utils.js
│   │       ├── dashboard.js
│   │       ├── productos.js
│   │       ├── movimientos.js
│   │       └── app.js
│   ├── backend/                ← Servidor Node.js
│   │   ├── server.js           ← Punto de entrada
│   │   ├── db.js               ← Lectura y escritura del JSON
│   │   ├── package.json
│   │   └── data/
│   │       └── db.json         ← Base de datos en JSON
│   └── shared/
│       └── constantes.js       ← Valores compartidos
├── docs/                       ← Documentación completa
├── ai/                         ← Rules, Agents y Prompts
└── deliverables/               ← Evidencias y notas de versión
```

---

## Variable de entorno

El puerto se puede cambiar con la variable `PORT`:

```bash
PORT=8080 node server.js
```

Si no se define, usa el puerto `3000` por defecto.

---

## Cómo funcionan los datos

Los datos del sistema viven en `src/backend/data/db.json`. Este archivo ya viene con 12 productos y 24 movimientos de ejemplo cuando se clona el repositorio.

Cada vez que se crea un producto, se registra un movimiento o se edita algo, el servidor actualiza ese archivo en disco automáticamente. No hay que hacer nada especial — los cambios persisten aunque se reinicie el servidor.

**¿Cómo resetear los datos de ejemplo?**

El repositorio incluye los datos en su estado inicial. Si se quieren restaurar después de haber hecho cambios durante pruebas, simplemente se puede copiar el contenido original del `db.json` desde el historial de git:

```bash
git checkout -- src/backend/data/db.json
```

---

## Solución de problemas comunes

**"EADDRINUSE: address already in use :::3000"**
Significa que el puerto 3000 ya está siendo usado por otro proceso. Opciones:
- Buscar y cerrar el otro proceso: `lsof -i :3000` (en Mac/Linux) o usar el Administrador de tareas en Windows.
- Usar otro puerto: `PORT=3001 node server.js`.

**La página carga pero no aparecen los datos**
Verificar que el servidor esté corriendo y que la consola del navegador no muestre errores de red. El frontend necesita que el backend esté activo en `localhost:3000`.

**"node: command not found"**
Node.js no está instalado o no está en el PATH. Descargarlo desde [nodejs.org](https://nodejs.org) e instalar la versión LTS.

---

## Limitaciones conocidas

- **No apto para uso simultáneo:** Si dos personas acceden y hacen cambios al mismo tiempo, pueden sobrescribirse mutuamente en el `db.json`. Es un sistema de un solo usuario a la vez.
- **Sin autenticación:** No hay login ni control de acceso. Quien tenga acceso a la red local puede usar el sistema.
- **Persistencia en JSON:** No es una base de datos relacional. Para volúmenes grandes de datos o alta concurrencia, necesitaría una DB real.
- **Sin HTTPS:** La comunicación es HTTP plano. Para un despliegue fuera de la red local, habría que agregar un proxy con SSL.
