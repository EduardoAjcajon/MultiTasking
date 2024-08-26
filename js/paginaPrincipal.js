let LOCAL_STORAGE_KEY_ASSIGNMENTS = 'lista_tareas';

// Function to save assignments in localStorage
function guardarAsignaciones(asignaciones) {
    localStorage.setItem(LOCAL_STORAGE_KEY_ASSIGNMENTS, JSON.stringify(asignaciones));
}

// Function to get assignments from localStorage
function obtenerAsignaciones() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ASSIGNMENTS)) || [];
}

let modal = document.getElementById("miModal");
let abrirModal = document.querySelector(".opciones .material-symbols-outlined:nth-child(2)");
let cerrarModal = document.querySelector(".modal .cerrar");
let formulario = document.getElementById("formularioTarea");
let tareaList = document.querySelector(".task-list");
let nombreUsuarioElement = document.getElementById('nombreUsuario');

abrirModal.onclick = function() {
    modal.style.display = "block";
}

cerrarModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function eliminarTarea(index) {
    let asignaciones = obtenerAsignaciones();
    asignaciones.splice(index, 1);  // Remove task from array
    guardarAsignaciones(asignaciones);  // Save new list in localStorage
    renderizarTareas(asignaciones);  // Re-render tasks
}

function renderizarTareas(asignaciones) {
    tareaList.innerHTML = ''; 
    asignaciones.forEach((tarea, index) => {
        let nuevaFila = document.createElement("div");
        nuevaFila.classList.add("task-row");

        nuevaFila.innerHTML = `
            <div class="task-name">
                <span class="material-symbols-outlined">check_circle</span>
                <span>${tarea.nombreTarea}</span>
            </div>
            <div class="assigned">
                <p class="nombre">${tarea.asignado}</p>
            </div>
            <div class="due-date">${tarea.fechaEntrega}</div>
            <div class="status">${tarea.estado}</div>
            <button class="eliminar-tarea">Eliminar</button>
        `;

        let botonEliminar = nuevaFila.querySelector('.eliminar-tarea');
        botonEliminar.addEventListener('click', function() {
            eliminarTarea(index);
        });

        tareaList.appendChild(nuevaFila);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let asignaciones = obtenerAsignaciones();
    renderizarTareas(asignaciones);

    let nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
        nombreUsuarioElement.textContent = `Hola, ${nombreUsuario}`;
    } else {
        nombreUsuarioElement.textContent = 'Invitado';
    }

    let barraBusqueda = document.getElementById('barraBusqueda');
    barraBusqueda.addEventListener('input', function() {
        let terminoBusqueda = barraBusqueda.value.toLowerCase();
        let tareasFiltradas = asignaciones.filter(tarea => 
            tarea.nombreTarea.toLowerCase().includes(terminoBusqueda) || 
            tarea.asignado.toLowerCase().includes(terminoBusqueda) || 
            tarea.estado.toLowerCase().includes(terminoBusqueda)
        );
        renderizarTareas(tareasFiltradas);
    });
});

let botonEnviar = formulario.querySelector('button[type="submit"]');

botonEnviar.addEventListener('click', function() {
    let nombreTarea = document.getElementById("nombreTarea").value;
    let asignado = document.getElementById("asignado").value;
    let fechaEntrega = document.getElementById("fechaEntrega").value;
    let estado = document.getElementById("estado").value;

    let asignaciones = obtenerAsignaciones();

    let nuevaTarea = {
        nombreTarea,
        asignado,
        fechaEntrega,
        estado
    };

    asignaciones = asignaciones.concat(nuevaTarea); 
    guardarAsignaciones(asignaciones); 
    renderizarTareas(asignaciones); 

    modal.style.display = "none"; 
    formulario.reset(); 
});