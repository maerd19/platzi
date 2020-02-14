import axios from 'axios';
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes';

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