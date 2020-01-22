import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import MiniLoader from '../components/MiniLoader';
import api from '../api';

class Badges extends Component {
    // Las llamadas a una API siguen un patrón de tres estados:
    // Loading: La petición se envía y esperamos una respuesta. Para proveer una buena experiencia de usuario hay que dar un indicador.
    // Error: Se deja un mensaje para el usuario con el error. 
    // Data: Los datos requeridos llegan. Dentro de la categoria de los datos hay 2 subestados: 
    // Vacio: Si se usa la aplicacion por primera vez, no habra ningun dato para mostrar por lo que se debe indicar al usuario que no se ha anadido ningun dato
    // Con datos: Se muestras los datos obtenidos mediante la API al usuario
    state = {
        loading: true,
        error: null,
        data: undefined,
    };

    // El mejor lugar para comenzar una peticion a una API es en el componentDidMount. Esto nos aseguramos que el codigo del componente ya esta listo.
    // Cualquier llamada exterior a una API se puede hacer con seguridad de que los datos estan listos para recibirse.
    componentDidMount() {
        this.fetchData();

        // Polling consiste en que cada cierto tiempo que es definido por nosotros se buscan los datos y se actualizan automáticamente. 
        // Esto se hará constantemente hasta que el usuario se vaya de la página.
        // La funcion fetchData sera ejecutada cada 5 segundos.
        // this.intervalId se usara como parametro en la funcion clearInterval para cancelar la ejecucion del intervalo.
        this.intervalId = setInterval(this.fetchData, 5000);
    }

    componentWillUnmount() {
      // El intervalo se debe limpiar ya que aunque la pagina se vaya el setInterval seguira trabajando causando cambios de estado en un componente que ya no esta.
      // Para limpiar el intervalo se necesita un id.
      clearInterval(this.intervalId);
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
        // El loader solo se ejecutara durante la primera carga de la pagina
        // if(this.state.loading === true && this.state.data === undefined) {
        if(this.state.loading === true && !this.state.data) {
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

                {this.state.loading && <MiniLoader />}
              </div>
            </Fragment>
          );
    }
}

export default Badges;