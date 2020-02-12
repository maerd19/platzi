import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Tabla = props => {
    
    const ponerFilas = () => props.usuarios.map((user, key) => (
          <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.website}</td>
              <td>
                  {/* Para no recargar la pagina es necesario usar Link/to en lugar de a/href */}
                  <Link to={ `/publicaciones/${key}` }>
                        {/* Numero de la casilla en el arreglo en donde esta el usuario */}
                        <div className="eye-solid icon"></div>
                  </Link>
              </td>
          </tr>
        )
    );

    return (
        <div>
            <table className="tabla">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Enlace</th>
                </tr>          
                </thead>
                <tbody>
                { ponerFilas() }
                </tbody>
            </table> 
        </div>
    )
}

const mapStateToProps = reducers => {
    return reducers.usuariosReducer
}

export default connect(mapStateToProps, null)(Tabla);
