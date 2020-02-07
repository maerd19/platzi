import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getVideoSource } from '../actions';
// import { Redirect } from 'react-router-dom';
import '../assets/styles/components/Player.scss';
import NotFound from '../containers/NotFound'

const Player = props => {
    // props.match.params se obtiene desde router en el momento en el que esta ruta se genera (player/:id)
    // Asi podemos obtener una serie de parametros y buscar el video que corresponde al id.
    const { id } = props.match.params;

    // Validacion para comprobar si un video se esta ejecutando
    const hasPlaying = Object.keys(props.playing). length > 0;

    // Esta funcion se encargara de buscar el video a reproducirse
    useEffect(() => {
        // Se hace la llamada al action con el id del video como parametro
        props.getVideoSource(id);
    }, []);

    return hasPlaying ? (
        <div className="Player">
            <video controls autoPlay>
                <source src={props.playing.source} type="video/mp4" />
            </video>
            <div className="Player-back" onClick={() => props.history.goBack()}>
                <button>Regresar</button>
            </div>
        </div>
    ) 
    :
    // Si no encontramos el objeto que se esta reproduciendo se ejecuta el redirect
    // Si un video con el link correcto nos envia a esta seccion se debe a que el elemento tardo en llegar porque mas atras en la pila 
    // Esto significa que no estamos manejando la sincronia de nuestro proyecto
    // Una solucion rapida seria usar NorFound en lugar de Redirect
    // <Redirect to="/404/" />;
    <NotFound />
};

const mapStateToProps = state => {
    return { playing: state.playing };
};

const mapDispatchToProps = {
    getVideoSource
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
