// app.js

const CLAVE_RESPONSABLE = 'gp_responsable';

function cambiarVista(nombre) {
  document.querySelectorAll('.vista').forEach(v => v.classList.add('vista--oculta'));
  document.getElementById('vista-' + nombre).classList.remove('vista--oculta');

  document.querySelectorAll('.nav__tab').forEach(t => {
    t.classList.toggle('nav__tab--activo', t.dataset.vista === nombre);
  });

  if (nombre === 'dashboard') Dashboard.cargar();
  if (nombre === 'productos') Productos.cargar();
  if (nombre === 'movimientos') Movimientos.cargar();
}

function inicializarCabecera() {
  document.getElementById('fecha-actual').textContent = Utils.formatearFechaLarga(new Date());

  const inputResponsable = document.getElementById('input-responsable');
  const guardado = localStorage.getItem(CLAVE_RESPONSABLE);
  if (guardado) inputResponsable.value = guardado;

  inputResponsable.addEventListener('change', () => {
    localStorage.setItem(CLAVE_RESPONSABLE, inputResponsable.value.trim());
  });

  document.querySelectorAll('.nav__tab').forEach(tab => {
    tab.addEventListener('click', () => cambiarVista(tab.dataset.vista));
  });
}

window.addEventListener('DOMContentLoaded', () => {
  inicializarCabecera();
  cambiarVista('dashboard');
});
