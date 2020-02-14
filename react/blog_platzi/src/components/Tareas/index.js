import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as tareasActions from '../../actions/tareasActions';

class Tareas extends Component {
    componentDidMount() {
        // Con la informacion silicitada a la API ya normalizada se valida que haya tareas recibidas en props.
        // Podemos apoyarnos de Object.keys para contar el contenido de un objeto
        if (!Object.keys(this.props.tareas).length) {
            // Si las tareas estan vacias, traelas.
            this.props.traerTodas();
        }
    }

    componentDidUpdate() {
        // Hacemos que el if del componentDidUpdate() del tareas solo se llame cuando sea estrictamente necesario, 
        // asi solo cuando le de click a un eliminar se llame el traerTodas() del componentDidUpdate() una sola vez.
        const { tareas, cargando, traerTodas } = this.props;

        if (!Object.keys(this.props.tareas).length && !cargando) {
            traerTodas();          
        }
    }

    mostrarContenido = () => {
        // Destructuramos del reducer
        const { tareas, cargando, error } = this.props;

        if (cargando) return <Spinner />;
        if (error) return <Fatal mensaje={error}/>;

        // Si todo salio bien regresamos un arreglo de todos los usuarios con Object.keys(tareas);        
        return Object.keys(tareas).map(usu_id => (
            <div key={usu_id}>
                <h2>Usuario {usu_id}</h2>
                <div className="contenedor_tareas">
                    {/* Se iteran las tareas correspondientes al usuario */}
                    { this.ponerTareas(usu_id) }
                </div>
            </div>
        ));
    };

    ponerTareas = usu_id => {
        // Se sacan las tareas del props
        const { tareas, cambioCheck, eliminar } = this.props;
        // Se iteran las tareas correspondientes al id del usuario
        const por_usuario = {
            ...tareas[usu_id]
        };      

        // Se iteran las tareas para desplegarlas
        return Object.keys(por_usuario).map(tar_id => (
            <div key={tar_id}>
                <input 
                    type="checkbox"
                    defaultChecked={por_usuario[tar_id].completed}
                    onChange={ () => cambioCheck(usu_id, tar_id) }
                />
                {  por_usuario[tar_id].title }
                <button className='m_left'>
                    {/* Este Link debe generar una nueva ruta en el BrowserRouter */}
                    <Link to={`/tareas/guardar/${usu_id}/${tar_id}`}>
                        Editar
                    </Link>
                </button>
                <button className='m_left' onClick={ () => eliminar(tar_id) }>
                    Eliminar
                </button>
            </div>
        ));
    };

    render() {     
        return (
            <div>
                <button>
                    <Link to='/tareas/guardar'>
                        Agregar
                    </Link>
                </button>
                { this.mostrarContenido() }
            </div>
        );
    }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);