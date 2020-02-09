import React from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo.png';
import { withRouter } from 'react-router';

const Header = ({ history }) => {

  const handleClick = () => {
    history.goBack();
  }

  return (
    <header className="Header">
      <img src={logo} width={250}/>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="is-selected">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/videos" activeClassName="is-selected">
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink to="/v">
              Redirect
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" activeClassName="is-selected">
              Contacto
            </NavLink>
          </li>
          <li>
            <NavLink to="/perfil" activeClassName="is-selected">
              Perfil
            </NavLink>
          </li>
          <li>
            <a onClick={handleClick}>
              👈
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default withRouter(Header);