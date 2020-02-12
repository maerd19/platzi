import React, { Component } from 'react';
// 1. Imporamos componente para conectar con redux
import { connect } from 'react-redux';

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
        // Si los usuarios no existen en el reducer se llaman de nuevo.
        if(!this.props.usuariosReducer.usuarios.length) {
            // Los usuarios se mandan a llamar de nuevo importando las acciones desde usuarios 
            await this.props.usuariosTraerTodos();
        }
        // Despues de que se traen los usuarios se traen las publicaciones que le corresponden al usuario
        this.props.publicacionesTraerPorUsuario(this.props.match.params.key);
    }

    render() {
        console.log(this.props);
        
        return (
            <div>
                <h1>Publicaciones de</h1>
                {/*Obtenemos valor por parametro */}
                { this.props.match.params.key }
            </div>
        )
    }
}

// 2. Recibo los reducers
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