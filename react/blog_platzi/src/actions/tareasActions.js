import axios from 'axios';
import { TRAER_TODAS, 
         CARGANDO, 
         ERROR,
         CAMBIO_USUARIO_ID,
         CAMBIO_TITULO,
         AGREGADA
        } from '../types/tareasTypes';

export const traerTodas = () => async dispatch => {
    dispatch({
        type: CARGANDO
    })
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
        // Normalizacion
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
       dispatch({
           type: ERROR,
           payload: 'Informacion de tareas no disponible'
       })      
    }
}

export const cambioUsuarioId = (usuario_id) => dispatch => {
    dispatch({
        type: CAMBIO_USUARIO_ID,
        payload: usuario_id
    })
}

export const cambioTitulo = (titulo) => dispatch => {
    dispatch({
        type: CAMBIO_TITULO,
        payload: titulo
    })
}

export const agregar = (nueva_tarea) => async dispatch => {
    dispatch({
        type: CARGANDO
    })

    try {
        // En axios al post se le agrega la url a la que se hara post y el objeto que se agregara
        const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
        console.log(respuesta.data);
        dispatch({
            type: AGREGADA
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: ERROR,
            payload: 'Intente mas tarde'
        })
    }
}

export const editar = (tarea_editada) => dispatch => {
    console.log(tarea_editada);    
}