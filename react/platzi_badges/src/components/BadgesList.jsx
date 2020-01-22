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

// customHook
function useSearchBadges(badges) {
    const [ query, setQuery ] = useState('');
    const [ filteredBadges, setFilteredBadges ] = useState(badges);

    // useMemo Devuelve un valor memorizado.
    // useMemo solo volverá a calcular el valor memorizado cuando una de las dependencias haya cambiado. 
    // Esta optimización ayuda a evitar cálculos costosos en cada render.
    // El primer argumento de useMemo es una funcion; el segundo argumento es una lista. 
    // En la lista se almacenaran los argumentos que siempre que sean iguales, la contestacion si ya esta memorizada, la regresa de inmediato sino la calcula por primer vez
    useMemo(() => {
        const result = badges.filter(badge => {
          // si la cadena formada por nombre y apellido incluye lo que buscamos (query) regresara true
          return `${badge.firstName} ${badge.lastName}`
            // Se convertira el nombre y el query a lowerCase para hacer la busqueda independientemente de que se usen o no mayusculas. (normalizar)
            .toLowerCase()
            .includes(query.toLowerCase());
      });

      // el valor del filtro se almacena en una variable que pueda usarse fuera de useMemo.
      setFilteredBadges(result);
    }, [badges, query]);

    return { query, setQuery, filteredBadges };
  }

function BadgesList(props) {
    const badges = props.badges;

    const { query, setQuery, filteredBadges } = useSearchBadges(badges);

    // Estaremos pendientes a los badges que estan filtrados; no a todos los badges ya
    // if (badges.length === 0) {
    if (filteredBadges.length === 0) {
      return (
        <div>
          <div className="form-group">
            <label>Filter Badges</label>
            {/* Cada vez que haya un cambio en el input se guaradara el nuevo valor en value */}
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