import axios from 'axios';
import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes

export const traerPorUsuario = key => async (dispatch, getState) => {
    // Se destructuran los usuarios y publicaciones del reducer
    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const usuario_id = usuarios[key].id;

    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);

    // En lugar de sobreescribir o cambiar el estado a respuesta.data tengo que agregar el respuesta.data a las publicaciones que existen en ese momento.
    // Es decir, se va haciendo una pila de publicaciones para evitar buscarlas mas de una vez si es que se buscaron una primera vez.
    const publicaciones_actualizadas = [
        ...publicaciones,
        respuesta.data
    ];

    const publicaciones_key = publicaciones_actualizadas.length - 1;
    const usuarios_actualizados = [...usuarios];
    usuarios_actualizados[key] = {
        ...usuarios[key],
        // publicaciones_key : publicaciones_key
        publicaciones_key
    }

    dispatch({
        type: USUARIOS_TRAER_TODOS,
        payload: usuarios_actualizados
    });

    dispatch({
        type: TRAER_POR_USUARIO,
        payload: publicaciones_actualizadas
    });
}