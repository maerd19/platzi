import axios from 'axios';
import {
	TRAER_TODAS,
	CARGANDO,
	ERROR,
	CAMBIO_USUARIO,
	CAMBIO_TITULO,
	GUARDADA,
    ACTUALIZAR,
    LIMPIAR
} from '../types/tareasTypes';

export const traerTodas = () => async dispatch => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
        // Normalizacion de la respuesta recibida de la API
        // 1. Creo objeto vacio
        const tareas = {};
        // 2. Iteramos por cada tarea que obtengamos como respuesta
        respuesta.data.map((tar) => (
            // 3. Al objeto vacio de tareas se le agrega un nuevo atributo: userId
            tareas[tar.userId] = {
                // 4. Este objeto contendra todo lo que ya tiene almacenado ese id de las tareas
                ...tareas[tar.userId],
                // 5. Al contenido correspondiente a un nuevo id se le agrega todo el contenido de una nueva tarea
                [tar.id]: {
                    ...tar
                }
            }
        ));

        dispatch({
            type: TRAER_TODAS,
            payload: tareas
        })
    } catch (error) {
    	console.log(error.message);
       dispatch({
           type: ERROR,
           payload: 'Informacion de tareas no disponible'
       })      
    }
}

export const cambioUsuarioId = usuario_id => dispatch => {
    dispatch({
        type: CAMBIO_USUARIO,
        payload: usuario_id
    })
}

export const cambioTitulo = titulo => dispatch => {
    dispatch({
        type: CAMBIO_TITULO,
        payload: titulo
    })
}

export const agregar = nueva_tarea => async dispatch => {
    dispatch({
        type: CARGANDO
    });

    try {
        // En axios al post se le agrega la url a la que se hara post y el objeto que se agregara
        const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
        dispatch({
            type: GUARDADA
        });
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Servicio no disponible en este momento.'
        });
    }
};

export const editar = tarea_editada => async dispatch => {
    dispatch({
        type: CARGANDO
    })

    try {
        // Con PUT tenemos que agregar una nueva variable en la URL; esta sera el id de la tarea que editamos
        // Como 2do valor de la funcion enviaremos el contenido que reemplazara al anterior.
        const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada);
        dispatch({
            type: GUARDADA
        });
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Servicio no disponible en este momento.'
        });
    }
};

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
    const { tareas } = getState().tareasReducer;
    const seleccionada = tareas[usu_id][tar_id];
    // Forma pura de usar inmutabilidad
    // Si no lo hicieramos de esta manera el estado mutaria y se estuviera actualizando sin que hicieramos un dispatch
    // Iremos bajando en profundidad de acuerdo al contenido de las tareas que estan en reducer
    // 1er nivel
    const actualizadas = {
        ...tareas
    };
    // 2do nivel
    actualizadas[usu_id] = {
        ...tareas[usu_id]
    };
    // 3er nivel
    actualizadas[usu_id][tar_id] = {
        ...tareas[usu_id][tar_id],
        completed: !seleccionada.completed
    }

    dispatch({
        type: ACTUALIZAR,
        payload: actualizadas
    })
};

export const eliminar = tar_id => async dispatch => {
    dispatch({
        type: CARGANDO
    });

    try {
        const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);
        // Ya se elimino la tarea por lo que se limpiaran todas las tareas para recargar las tareas
        // y saber que id es el que ya no esta porque no sabemos cuales seran las nuevas posiciones
        dispatch({
            type: TRAER_TODAS,
            payload: {}
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Servicio no disponible en este momento.'
        })
    }
};

export const limpiarForma = () => dispatch => {
    dispatch({
        type: LIMPIAR
    });
};