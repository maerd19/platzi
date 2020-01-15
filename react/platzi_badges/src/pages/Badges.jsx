import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import api from '../api';

class Badges extends Component {
    // Las llamadas a una API siguen un patrón de tres estados:
    // Loading: La petición se envía y esperamos una respuesta.
    // Error: Se deja un mensaje para el usuario con el error.
    // Data: Los datos requeridos llegan.
    state = {
        loading: true,
        error: null,
        data: undefined,
    };

    componentDidMount() {
        this.fetchData();
    }

    // La función que hace una llamada a una API sera asíncrona.
    // Esta llamada hace una petición GET a una dirección de internet y lo que sea que exista ahí será devuelto.
    fetchData = async () => {
        this.setState({ loading: true, error: null });

        try {
            const data = await api.badges.list();
            this.setState({ loading: false, data: data });
        } catch (error) {
            this.setState({ loading: false, error: error });          
        }
    };

    render() {
        if(this.state.loading === true) {
            return <PageLoading />;
        }

        if(this.state.error) {
            return <PageError error={this.state.error} />;
        }

        return (
            <Fragment>
              <div className="Badges">
                <div className="Badges__hero">
                  <div className="Badges__container">
                    <img
                      className="Badges_conf-logo"
                      src={confLogo}
                      alt="Conf Logo"
                    />
                  </div>
                </div>
              </div>
      
              <div className="Badges__container">
                <div className="Badges__buttons">
                  <Link to="/badges/new" className="btn btn-primary">
                    New Badge
                  </Link>
                </div>
      
                <BadgesList badges={this.state.data} />
              </div>
            </Fragment>
          );
    }
}

export default Badges;