import React from 'react';
import ReactDOM from 'react-dom';

import './styles/Modal.css'

function Modal(props) {
    // Cuando queremos renderizar un modal lo ideal será hacerlo en un nodo completamente aparte. 
    // React tiene una herramienta llamada Portales que funcionan parecido a ReactDOM.render.
    // Se les dice qué se desea renderizar y dónde, con la diferencia de que ese dónde puede ser fuera de la aplicación.
    if (!props.isOpen) {
        return null;
    }
    return ReactDOM.createPortal(
        <div className="Modal">
            <div className="Modal__container">
                <button onClick={props.onClose} className="Modal__close-button">
                    X
                </button>
                {/* se usa props.children para mostrar lo que se enviara dentro del componente */}
                {props.children}
            </div>
        </div>,
        document.getElementById('modal')
    )
}

export default Modal;