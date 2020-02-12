import { combineReducers } from 'redux';
import usuariosReducer from './usuariosReducer';
import publicacionesReducer from './publicacionesReducer';

// Se enviaran todos los reducers combinados
export default combineReducers({
    usuariosReducer,
    publicacionesReducer
});