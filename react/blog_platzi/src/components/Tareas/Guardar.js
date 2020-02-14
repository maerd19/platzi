import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as tareasActions from '../../actions/tareasActions';

// Componente para dar de alta una tarea nueva y subirla al componente
class Guardar extends Component {
    componentDidMount() {
        const {
            match: { params: { usu_id, tar_id } },
            tareas,
            cambioTitulo,
            cambioUsuarioId,
            limpiarForma
        } = this.props;

        // Se valida que los id's de usuario y tarea hayan pasado como parametros de la URL
        // Gracias a esto este componente se puede usar para editar y crear
        if(usu_id && tar_id) {
            // Del reducer seleccionamos especificamente la tarea de acuerdo a los parametros de la URL
            const tarea = tareas[usu_id][tar_id];
            // Las siguientes funciones se reciben desde tareasActions y colocaran contenido en el input, dicho contenido vendra del reducer            
            cambioUsuarioId(tarea.userId);
            cambioTitulo(tarea.title);
        } 
        else {
            limpiarForma();
        }
    }

    // Manejo de inputs con reducers
    cambioUsuarioId = e => {
        this.props.cambioUsuarioId(e.target.value);        
    };

    cambioTitulo = e => {
        this.props.cambioTitulo(e.target.value);        
    };

    guardar = () => {
        const { 
            match: { params: { usu_id, tar_id } },
            tareas,
            usuario_id, 
            titulo, 
            agregar,
            editar 
        } = this.props;

        const nueva_tarea = {
            userId: usuario_id,
            title: titulo,
            completed: false
        };

        // Si se reciben parametros en la url se especificara que se debe editar
        if (usu_id && tar_id) {
            const tarea = tareas[usu_id][tar_id];
            const tarea_editada = {
                ...nueva_tarea,
                completed: tarea.completed,
                id: tarea.id
            };
	    editar(tarea_editada);
        }
        // Si no se reciben los parametros en la url se creara una nueva tarea
        else {
            agregar(nueva_tarea);
        }
    };

    deshabilitar = () => {
        const { titulo, usuario_id, cargando } = this.props;

        if (cargando) return true;
        if (!usuario_id || !titulo) return true;
        return false;
    }

    mostrarAccion = () => {
        const { error, cargando } = this.props;
        if (cargando) return <Spinner />;
        if (error) return <Fatal mensaje={error} />;
    }

    render() {
        return (
            <div>
                {
                    (this.props.regresar) ? <Redirect to='/tareas' /> : ''
                }
                <h1>Guardar Tarea</h1>
                Usuario id:
                <input 
                    type="number" 
                    value={ this.props.usuario_id }
                    onChange={ this.cambioUsuarioId }
                />
                <br/><br/>
                Titulo:
                <input 
                    type="text"
                    value={ this.props.titulo }
                    onChange={ this.cambioTitulo }
                />
                <br/><br/>
                <button
                    onClick={ this.guardar }
                    disabled={ this.deshabilitar() }
                >
                    Guardar
                </button>
                { this.mostrarAccion() }
            </div>
        );
    }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);