// El reducer se encarga de entender que es lo que esta pasando y como va a actualizar el estado
const reducer = (state, action) => {
    switch (action.type) {        
        case 'SET_FAVORITE':
            return {
                // 1.- Traemos el state actual.
                ...state,
                // 2.- Indicamos el elemento que cambiara dentro del estado y los elementos nuevos que se agregaran al estado principal.
                myList: [...state.myList, action.payload]
            }
        case 'DELETE_FAVORITE':
            return {
                // 1.- Traemos el state actual.
                ...state,
                // 2.- Usamos filter para obtener los elementos que cumplan la condicion de la funcion.
                myList: state.myList.filter(items => items.id !== action.payload)
            }
        case 'LOGIN_REQUEST':
            return {
                // 1.- Traemos el state actual.
                ...state,
                // 2.- Transmitimos el objeto que estamos creando en el action y los asignamos a user.
                user: action.payload
            }
        default: 
            // Si type no coincide con ninguno de los casos regresara nuestro estado principal
            return state;
    }
}

export default reducer;