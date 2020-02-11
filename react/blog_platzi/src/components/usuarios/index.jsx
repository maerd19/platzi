import React, { Component } from 'react';
import axios from 'axios';

export class Usuarios extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: []
    }
  }

  async componentDidMount() {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log('respuesta', respuesta.data);
    
    this.setState({
      usuarios: respuesta.data
    })
  }

  ponerFilas = () => (
    this.state.usuarios.map(user => (
      <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.website}</td>
      </tr>
    ))
  )
  render() {
    return (
     <div className="margen">
       <div className="tabla">
         <thead>
           <tr>
             <th>Nombre</th>
             <th>Correo</th>
             <th>Enlace</th>
           </tr>
           { this.ponerFilas() }
         </thead>
       </div>
     </div>
    )
  }
}

export default Usuarios;
