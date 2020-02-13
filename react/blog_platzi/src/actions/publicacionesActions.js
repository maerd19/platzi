import axios from 'axios';
import {
	CARGANDO,
	ERROR,
	ACTUALIZAR,
	COM_CARGANDO,
    COM_ERROR,
    COM_ACTUALIZAR
} from '../types/publicacionesTypes';
import * as usuarioTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuarioTypes;

export const traerPorUsuario = key => async (dispatch, getState) => {
    dispatch({
        type: CARGANDO
    });

    // La informacion del usuario y las publicaciones se obtienen del estado actual al cual
    // podemos acceder mediante el uso de getState

    // Se destructuran los usuarios y publicaciones del reducer
    let { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const usuario_id = usuarios[key].id;

    try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);
        
        // Necesitamos cambiar la respuesta ya que vamos a necesitar mas informacion dentro de las publicaciones
        // La informacion necesaria sera indicar si debe estar abierto o cerrado la casilla de comentarios y el
        // contenido de los comentarios.
        const nuevas = respuesta.data.map(publicacion => ({
            // Esta funcion regresa un objeto como respuesta que contiene: 
            // todo lo que trae la publicacion, comentarios y abierto por default en falso
            ...publicacion,
            comentarios: [],
            abierto: false
        }));

        // En lugar de sobreescribir el estado de las publicaciones cada vez que accedemos
        // a un usuario, se deben almacenar todas en un arreglo para evitar segundas busquedas.
        const publicaciones_actualizadas = [
            // contenido de publicaciones
            ...publicaciones,
            // Enviamos las nuevas publicaciones en lugar de respuesta.data
            nuevas
        ];

        dispatch({
            type: ACTUALIZAR,
            payload: publicaciones_actualizadas
        });

        // Ya que esta hecho el arreglo de arreglos es necesario decirle al usuario reducer 
        // cual es el lugar en el arreglo en el que estan almacenadas las publicaciones

        // Accedemos al ultimo valor del arreglo
        const publicaciones_key = publicaciones_actualizadas.length - 1;
        const usuarios_actualizados = [...usuarios];
        // Se agrega un nuevo atributo a un usuario especifico (key)
        usuarios_actualizados[key] = {
            ...usuarios[key],        
            publicaciones_key // === publicaciones_key : publicaciones_key 
        };

        // Nuevo dispatch para tambien mandar los usuarios actualizados
        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        });
    } 
    catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Publicaciones no disponibles.'
        });
    }
};

// Esta action traera el estado actual y modificara el valor de true o false a lo contrario
export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
    // 1.- Seleccion de publicaciones desde el reducer
    const { publicaciones } = getState().publicacionesReducer;
    // 2.- Del arreglo de publicaciones se toma la que coincida con los parametros recibidos en la funcion (pub_key, com_key)
    const seleccionada = publicaciones[pub_key][com_key];
    
    // 3.- Se cambia el valor la propiedad que indicara si debe estar abierto o cerrado
    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    };
    
    // 4.- Todo el contenido de las publicaciones regresa con el cambio de estado en la publicacion seleccionada
    const publicaciones_actualizadas = [...publicaciones];

    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ];

    // 5.- Seleccionamos la publicacion especifica que sufrio un cambio
    publicaciones_actualizadas[pub_key][com_key] = actualizada;

    // 6.- Por medio del dispatch se envia la informacion al reducer para que cambie el valor del estado
    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    });
}

export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
	dispatch({
		type: COM_CARGANDO
	});

	const { publicaciones } = getState().publicacionesReducer;
	const seleccionada = publicaciones[pub_key][com_key];

    try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)
        
        const actualizada = {
            ...seleccionada,
            comentarios: respuesta.data
        };

        const publicaciones_actualizadas = [...publicaciones];
        
        publicaciones_actualizadas[pub_key] = [
            ...publicaciones[pub_key]
        ];

        publicaciones_actualizadas[pub_key][com_key] = actualizada;

        dispatch({
            type: COM_ACTUALIZAR,
            payload: publicaciones_actualizadas
        });        
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: COM_ERROR,
            payload: 'Comentarios no disponibles.'
        });
    }
};