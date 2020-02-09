import React from 'react';
import './generic-page.css';

const NotFound = props => {
    const handleForwardClick = () => {
        props.history.goForward();        
    };

    const handleBackClick = () => {
        props.history.goBack();
    };

    const handleRandomClick = () => {
        const random = Math.round(Math.random() * (10 - 1) + 1);
        props.history.push(`/videos?id=${random}`, { id: random })
    };
    return (
        <div className="Page NotFound">
            <h1>404</h1>
            <h3 className="SadFace">:(</h3>
            <h2>No hemos encontrado la pagina que buscabas</h2>
            <button
                className="Button"
                onClick={handleForwardClick}
            >
                Ir a la siguiente pagina {'->'}
            </button>
            <button
                className="Button"
                onClick={handleBackClick}
            >
                Ir a la ruta anterior {'<-'}
            </button>
            <button
                className="Button"
                onClick={handleRandomClick}
            >
                Video random
            </button>
        </div>
    );
}

export default NotFound;
