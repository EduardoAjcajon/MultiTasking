// main.js
import { Task } from './Task.js';
import { UI } from './UI.js';

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
  ui.displayTasks();
});

document.getElementById('formularioTarea').addEventListener('submit', (e) => {
  e.preventDefault();

  const nombreTarea = document.getElementById('nombreTarea').value;
  const asignado = document.getElementById('asignado').value;
  const fechaEntrega = document.getElementById('fechaEntrega').value;
  const estado = document.getElementById('estado').value;

  if (nombreTarea === '' || asignado === '' || fechaEntrega === '' || estado === '') {
    ui.displayMessage('Todos los campos son obligatorios', 'error');
  } else {
    const task = new Task(nombreTarea, asignado, fechaEntrega, estado);
    ui.addTask(task);
    ui.displayMessage('Tarea agregada correctamente', 'success');
    ui.clearFields();
  }
});

document.getElementById('miModal').addEventListener('click', (e) => {
  if (e.target.classList.contains('cerrar')) {
    ui.closeModal();
  }
});

document.getElementById('barraBusqueda').addEventListener('keyup', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const tasks = Task.getAllTasks();
  const filteredTasks = tasks.filter((task) => task.nombreTarea.toLowerCase().includes(searchTerm));
  ui.displayTasks(filteredTasks);
});

// Task.js
export class Task {
  static tasks = [];

  constructor(nombreTarea, asignado, fechaEntrega, estado) {
    this.nombreTarea = nombreTarea;
    this.asignado = asignado;
    this.fechaEntrega = fechaEntrega;
    this.estado = estado;
  }

  static getAllTasks() {
    return Task.tasks;
  }

  static addTask(task) {
    Task.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(Task.tasks));
  }
}

// UI.js
export class UI {
  displayTasks(tasks = Task.getAllTasks()) {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    tasks.forEach((task) => {
      const row = document.createElement('div');
      row.classList.add('task-row');

      row.innerHTML = `
        <div class="task-info">
          <h3>${task.nombreTarea}</h3>
          <p>Asignado: ${task.asignado}</p>
          <p>Fecha de Entrega: ${task.fechaEntrega}</p>
        </div>
        <div class="task-status">
          <p>${task.estado}</p>
        </div>
      `;

      taskList.appendChild(row);
    });
  }

  displayMessage(message, type) {
    const div = document.createElement('div');
    div.classList.add('message', type);
    div.textContent = message;

    document.querySelector('.section').insertBefore(div, document.querySelector('.task-list'));

    setTimeout(() => {
      div.remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById('formularioTarea').reset();
  }

  closeModal() {
    document.getElementById('miModal').style.display = 'none';
  }
}

// paginaPrincipal.js
document.getElementById('nombreUsuario').textContent = 'Usuario'; // Replace 'Usuario' with the actual user's name