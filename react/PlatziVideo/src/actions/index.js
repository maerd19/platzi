// action para agregar un elemento a favoritos
export const setFavorite = payload => ({
    type: 'SET_FAVORITE',
    payload
});

// action para eliminar un elemento de favoritos
export const deleteFavorite = payload => ({
    type: 'DELETE_FAVORITE',
    payload
});

// action para manejar la informacion del login
export const loginRequest = payload => ({
    type: 'LOGIN_REQUEST',
    payload
});

// action para cerrar sesion
export const logoutRequest = payload => ({
    type: 'LOGOUT_REQUEST',
    payload
});

// action para manejar la informacion del register
export const registerRequest = payload => ({
    type: 'REGISTER_REQUEST',
    payload
});

// action para obtener el source del video
export const getVideoSource = payload => ({
    type: 'GET_VIDEO_SOURCE',
    payload
});