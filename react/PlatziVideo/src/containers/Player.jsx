import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getVideoSource } from '../actions';
import '../assets/styles/components/Player.scss';
import NotFound from '../containers/NotFound'

const Player = props => {
    // props.match.params se obtiene desde router en el momento en el que esta ruta se genera (player/:id)
    // Asi podemos obtener una serie de parametros y buscar el video que corresponde al id.
    const { id } = props.match.params;

    // Validacion para comprobar si un video se esta ejecutando
    const hasPlaying = Object.keys(props.playing).length > 0;

    // Esta funcion se encargara de buscar el video a reproducirse
    useEffect(() => {
        // Se hace la llamada al action con el id del video como parametro
        props.getVideoSource(id);
    }, []);

    if (!props.playing) return <h3>Cargando...</h3>;
    if (!Object.keys(props.playing).length) return <NotFound />
    return (
        <div className="Player">
            <video controls autoPlay>
                <source src={props.playing.source} type="video/mp4" />
            </video>
            <div className="Player-back" onClick={() => props.history.goBack()}>
                <button>Regresar</button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return { playing: state.playing };
};

const mapDispatchToProps = {
    getVideoSource
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
