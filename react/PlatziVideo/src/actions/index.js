export const setFavorite = payload => ({
    type: 'SET_FAVORITE',
    payload
});

export const deleteFavorite = payload => ({
    type: 'DELETE_FAVORITE',
    payload
});

// funcion para manejar la informacion del login
export const loginRequest = payload => ({
    type: 'LOGIN_REQUEST',
    payload
});