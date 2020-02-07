const reducer = (state, action) => {
    switch (action.type) {
        // logica para manejar un estado en particular
        case 'SET_FAVORITE':
            return {
                // 1.- traemos el state actual
                ...state,
                // 2.- Indicamos el elemento que cambiara dentro del estado
                myList: [...state.myList, action.payload]
            }
        default: 
            return state;
    }
}

export default reducer;