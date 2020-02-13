import axios from 'axios';
import { TRAER_POR_USUARIO } from '../types/publicacionesTypes';
import * as usuarioTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuarioTypes;

export const traerPorUsuario = key => async (dispatch, getState) => {
    // La informacion del usuario y las publicaciones se obtienen del estado actual al cual
    // podemos acceder mediante el uso de getState

    // Se destructuran los usuarios y publicaciones del reducer
    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const usuario_id = usuarios[key].id;

    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);
    
    // En lugar de sobreescribir el estado de las publicaciones cada vez que accedemos
    // a un usuario, se deben almacenar todas en un arreglo para evitar segundas busquedas.
    const publicaciones_actualizadas = [
        // contenido de publicaciones
        ...publicaciones,
        // Se agregan las nuevas publicaciones
        respuesta.data
    ];

    // Ya que esta hecho el arreglo de arreglos es necesario decirle al usuario reducer 
    // cual es el lugar en el arreglo en el que estan almacenadas las publicaciones

    // Accedemos al ultimo valor del arreglo
    const publicaciones_key = publicaciones_actualizadas.length - 1;
    const usuarios_actualizados = [...usuarios];
    // Se agrega un nuevo atributo a un usuario especifico (key)
    usuarios_actualizados[key] = {
        ...usuarios[key],        
        publicaciones_key // === publicaciones_key : publicaciones_key 
    }

    // Nuevo dispatch para tambien mandar los usuarios actualizados
    dispatch({
        type: USUARIOS_TRAER_TODOS,
        payload: usuarios_actualizados
    });

    dispatch({
        type: TRAER_POR_USUARIO,
        payload: publicaciones_actualizadas
    });
}