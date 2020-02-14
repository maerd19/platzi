import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as tareasActions from '../../actions/tareasActions';

export class Tareas extends Component {
    componentDidMount() {
        this.props.traerTodas()
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
        ))
    };

    ponerTareas = usu_id => {
        // Se sacan las tareas del props
        const { tareas } = this.props;
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
                />
                {
                    por_usuario[tar_id].title
                }
            </div>
        ))
    }

    render() {
        return (
            <div>
                { this.mostrarContenido() }
            </div>
        );
    }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);