import React, { Component, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import './styles/BadgesList.css';
import Gravatar from './Gravatar';

class BadgesListItem extends Component {
  render() {
    return (
      <div className="BadgesListItem">
        <Gravatar
          className="BadgesListItem__avatar"
          email={this.props.badge.email}
        />

        <div>
          <strong>
            {this.props.badge.firstName} {this.props.badge.lastName}
          </strong>
          <br />@{this.props.badge.twitter}
          <br />
          {this.props.badge.jobTitle}
        </div>
      </div>
    );
  }
}

// Los customHooks deben empezar con use.
function useSearchBadges(badges) {
    const [ query, setQuery ] = useState('');
    const [ filteredBadges, setFilteredBadges ] = useState(badges);

    // useMemo devuelve un valor memorizado y solo volverá a calcular el valor cuando una de las dependencias haya cambiado. 
    // Esta optimización ayuda a evitar cálculos costosos en cada render.
    // Los argumentos de useMemo son una funcion y una lista. 
    // La lista almacenara los argumentos usados previamente. La contestacion, si ya esta memorizada, regresara de inmediato en caso contrario se calcula por primer vez.
    useMemo(() => {
        const result = badges.filter(badge => {
          // Si la cadena formada por nombre y apellido incluye lo que buscamos (query) la funcion regresara true.
          return `${badge.firstName} ${badge.lastName}`
            // nombre y query se convertiran a lowerCase para hacer la busqueda independientemente de que se usen o no mayusculas. (normalizar)
            .toLowerCase()
            .includes(query.toLowerCase());
        });
      // El valor del filtro se almacena en una variable que pueda usarse fuera de useMemo.
      setFilteredBadges(result);
    }, [badges, query]);

    return { query, setQuery, filteredBadges };
  }

function BadgesList(props) {
    const badges = props.badges;

    const { query, setQuery, filteredBadges } = useSearchBadges(badges);

    // Ya no estaremos pendientes de todos los badges sino unicamente de las que estan filtrados.
    // if (badges.length === 0) {
    if (filteredBadges.length === 0) {
      return (
        <div>
          {/* Buscador */}
          <div className="form-group">
            <label>Filter Badges</label>
            {/* Cada vez que onChange detecte un cambio en el input se guardara el nuevo valor en query */}
            <input 
              type="text" 
              className="form-control"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);              
              }}
            />
          </div>
          <h3>No badges were found</h3>
          <Link className="btn btn-primary" to="/badges/new" >
              Create New Badge
          </Link>
        </div>
      );
    }
    return (
      <div className="BadgesList">
        {/* Buscador */}
        <div className="form-group">
          <label>Filter Badges</label>
          <input 
            type="text" 
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);              
            }}
          />
        </div>
        <ul className="list-unstyled">
          {/* Se renderizan las badges obtenidas de la busqueda */}
          {filteredBadges.map(badge => {
            return (
              <li key={badge.id}>
                <Link className="text-reset text-decoration-none" to={`/badges/${badge.id}`}>
                  <BadgesListItem badge={badge} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
}

export default BadgesList;