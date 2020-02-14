import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Comentarios from './Comentarios';

// Usuarios y publicaciones conviven en el mismo componente
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

// Cuando se llaman a multiples reducers en una action se deben usar alias para 
// no mezclar las actions en caso de que tengan el mismo nombre.
const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { 
    traerPorUsuario: publicacionesTraerPorUsuario, 
    abrirCerrar, 
    traerComentarios 
} = publicacionesActions;

class Publicaciones extends Component {
    // Para asegurarnos de que las funciones dentro del componentDidMountse manden a llamar
    // escalonadamente se le coloca un async/await
    async componentDidMount() {
        // No se recomienda destructurar los reducers en el componentDidMount porque
        // this.props.usuariosReducer apunta directamente al reducer y al desctructurarse
        // crea una variable en memoria la cual nunca cambiaria su valor dejando el
        // usuariosTraerTodos() sin ejecutarse ya que la variable generada por la 
        // destructuracion no detectaria el cambio del estado        
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
            await publicacionesTraerPorUsuario(key);
        }        
    }

    ponerUsuario = () => {
        const { 
            usuariosReducer,
            match: { params: { key } }
        } = this.props;

        if(usuariosReducer.error) {
            return <Fatal mensaje={ usuariosReducer.error }/>;
        }
        
        if(!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
            return <Spinner />
        }

        const nombre = usuariosReducer.usuarios[key].name;

        return <h1>Publicaciones de { nombre }</h1>
    };

    ponerPublicaciones = () => {
        // Aqui si se puede destructurar el reducer porque es una funcion que se ejecuta en el 
        // render y no tienen ningun cambio de estado
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key } }
        } = this.props;

        // Validaciones antes de mostrar publicaciones
        if (!usuarios.length) return;
        if (usuariosReducer.error) return;
        if (publicacionesReducer.cargando) return <Spinner />;
        if (publicacionesReducer.error) return <Fatal mensaje={publicacionesReducer.error} />;
        if (!publicaciones.length) return;
        if (!('publicaciones_key' in usuarios[key])) return;

        const { publicaciones_key } = usuarios[key];

        console.log('publicaciones[publicaciones_key]', publicaciones[publicaciones_key]);
        
        // Se envian por parametros publicaciones y publicaciones_key a mostrarInfo
        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        );
    };

    mostrarInfo = (publicaciones, pub_key) => {
        return ( publicaciones.map((publicacion, com_key) => (
                <div 
                    className="pub_titulo"
                    key={ publicacion.id }
                    onClick={ 
                        ()=>this.mostrarComentarios(pub_key, com_key, publicacion.comentarios) 
                    }
                >
                    <h2> { publicacion.title } </h2>
                    <h3> { publicacion.body } </h3>
                    {
                        (publicacion.abierto) ? 
				<Comentarios 
					comentarios={publicacion.comentarios}
				/> 
				: ''
                    }
                </div>
            ))
        );
    };

    mostrarComentarios = (pub_key, com_key, comentarios) => {        
        this.props.abrirCerrar(pub_key, com_key)
        if (!comentarios.length) {
            this.props.traerComentarios(pub_key, com_key)
        }
    };

    render() {        
        return (
            <div>                
                { this.ponerUsuario() }
                { this.ponerPublicaciones() }
            </div>
        );
    }
}

// Recibo los reducers
const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
	return { usuariosReducer, publicacionesReducer };
};

// Entregamos los nuevos metodos destructurados y renombrados
const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);