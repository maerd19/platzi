import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

class Usuarios extends Component {

  componentDidMount() {    
    this.props.traerTodos();
  }

  ponerFilas = () => (
    this.props.usuarios.map(user => (
      <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.website}</td>
      </tr>
    ))
  )
  render() {
    return (
      <div className="tabla">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
            </tr>          
          </thead>
          <tbody>
            { this.ponerFilas() }
          </tbody>
        </table>        
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);