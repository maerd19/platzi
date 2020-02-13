import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

// Usuarios y publicaciones conviven en el mismo componente
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

// Cuando se llaman a multiples reducers en una action se deben usar alias para 
// no mezclar las actions en caso de que tengan el mismo nombre.
const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

export class Publicaciones extends Component {
    // Para asegurarnos de que las funciones dentro del componentDidMountse manden a llamar
    // escalonadamente se le coloca un async/await
    async componentDidMount() {
        // No se recomienda destructurar las reducers porque como el reducer es el estado recuerda que el estado
        // se actualiza y el componentDidMount se ejecuta despues del render, entonces ese estado puede variar
        // NO lo puedo destructurar.
        const {
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: { params: { key } }
        } = this.props;
        // Si los usuarios no existen en el reducer se llaman de nuevo.
        if(!this.props.usuariosReducer.usuarios.length) {
            // Los usuarios se mandan a llamar de nuevo importando las acciones desde usuarios 
            await usuariosTraerTodos();
        }
        // Existe un error para traer al usuarsio
        if(this.props.usuariosReducer.error) {
            return
        }
        // Validamos que el usuario no tenga 'publicaciones_key' dentro de sus atributos
        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
            // Traemos las publicaciones que le corresponden al usuario
            publicacionesTraerPorUsuario(key);
        }        
    }

    ponerUsuario = () => {
        const { 
            usuariosReducer,
            match: { params: { key } }
        } = this.props;

        if(usuariosReducer.error) {
            return <Fatal mensaje={ usuariosReducer.error }/>
        }
        
        if(!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
            return <Spinner />
        }

        const nombre = usuariosReducer.usuarios[key].name;

        return <h1>Publicaciones de { nombre }</h1>
    }

    render() {
        console.log(this.props);
        
        return (
            <div>
                {/*Obtenemos valor por parametro */}
                { this.props.match.params.key }
                { this.ponerUsuario() }
            </div>
        )
    }
}

// Recibo los reducers
const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer
    }
}

// Entregamos los nuevos metodos destructurados y renombrados
const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);