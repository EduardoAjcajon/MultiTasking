const LOCAL_SOTRAGE_KEY_ASSIGMENTS = 'lista_tareas';

function guardarAsignaciones(asignaciones){
    localStorage.setItem(LOCAL_SOTRAGE_KEY_ASSIGMENTS, JSON.stringify(asignacionesp))
}

function obtenerAsignacion(){
    return JSON.parse(localStorage.getItem(LOCAL_SOTRAGE_KEY_ASSIGMENTS)) || []
}

export {LOCAL_SOTRAGE_KEY_ASSIGMENTS, guardarAsignaciones, obtenerAsignacion};