import React, { Component } from 'react';

import './styles/Badge.css';
// El source de las imágenes en React puede contener direcciones web o puede importarse por referencia directa.
import confLogo from '../images/badge-header.svg';
import Gravatar from './Gravatar';

class Badge extends Component {
    // Los componentes requieren el método render para definir el resultado que aparecerá en pantalla.
    // Los props son atributos de un componente como class, src, etc.
    // Los props salen de una variable de la clase que se llama this.props y los valores son asignados directamente en el ReactDOM.render().
    render() {        
    return (
      <div className="Badge">
        <div className="Badge__header">
          <img src={confLogo} alt="Logo de la conferencia" />
        </div>

          <div className="Badge__section-name">
            <Gravatar 
              className="Badge__avatar" 
              email={this.props.email}
            />
            <h1>
              {this.props.firstName} <br /> {this.props.lastName}
            </h1>
          </div>

          <div className="Badge__section-info">
            <h3>{this.props.jobTitle}</h3>
            <div>@{this.props.twitter}</div>
          </div>

          <div className="Badge__footer">#platziconf</div>
        </div>
    );
  }
}

export default Badge;