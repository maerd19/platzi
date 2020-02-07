// El reducer se encarga de entender que es lo que esta pasando y como va a actualizar el estado
const reducer = (state, action) => {
    switch (action.type) {
        // logica para manejar un estado en particular
        case 'SET_FAVORITE':
            return {
                // 1.- traemos el state actual
                ...state,
                // 2.- Indicamos el elemento que cambiara dentro del estado y los elementos nuevos que se agregaran al estado principal.
                myList: [...state.myList, action.payload]
            }
        case 'DELETE_FAVORITE':
                return {
                    ...state,
                    // Usaremos filter para crear un nuevo array con todos los elementos que cumplan la condicion implementada en la funcion
                    // Evaluaremos el valor id de nuestro elemento para compararlo si esta en la lista y crear una desigualdad para compararlo con el contenido de action.payload
                    myList: state.myList.filter(items => items.id !== action.payload)
                }
        default: 
            return state;
    }
}

export default reducer;