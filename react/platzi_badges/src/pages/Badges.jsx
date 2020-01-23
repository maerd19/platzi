import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import MiniLoader from '../components/MiniLoader';
import api from '../api';

// Existen 3 fases en el ciclo de vida de un componente:
// Montaje: Insercion del código del componente en el DOM. Se llaman tres métodos: 
//    constructor: Es el lugar perfecto para inicializar valores o el estado.
//    render: En render React pinta los elementos que formaran parte del componente. 
//            Es el primer método que se ejecuta cuando se monta un componente.
//    componentDidMount: Cuando este metodo se llama el codigo del componente ya esta listo. 
//                       Es el mejor lugar para comenzar una peticion a una API externa ya que los datos estan listos para recibirse.
// Actualizacion: Cuando los props y/o el estado del componente cambian se llaman dos métodos: 
//    render: El componente se vuelve a renderizar porque su informacion cambio. 
//            Esto tambien aplica para cualquier componente descendiente.
//    componentDidUpdate: Este metodo recibe 2 argumentos: prevProps y prevState. 
//                        Esto nos servira para comparar entre la version anterior del componente y la version actual.
// Desmontaje: Quitamos el contenido actual para mostrar nuevo contenido. Por ejemplo, al navegar de una pagina a otra. Se llama un método: 
//    componentWillUnmount: Es el lugar ideal para liberar memoria. 
//                          Los componentes pueden alentarse en caso de no hacerse la liberacion.

class Badges extends Component {
    // Las llamadas a una API siguen un patrón de tres estados:
    // Loading: La petición se envía y esperamos una respuesta. 
    //          Para proveer una buena experiencia de usuario hay que dejar un loader como indicador.
    // Error: La peticion responde con un error. 
    //        Para proveer una buena experiencia de usuario dejamos un mensaje indicando el error. 
    // Data: Tiene 2 subestados: 
    //    Vacio: La peticion a la API no envio una respuesta. Por ejemplo, si se usa la aplicacion por primera vez no habra datos para mostrar.  
    //           Para proveer una buena experiencia de usuario se indica que no se ha añadido ningun dato.
    //    Con datos: La peticion a la API responde con los datos solicitados por el usuario.
    state = {
        loading: true,
        error: null,
        data: undefined,
    };

    componentDidMount() {
        this.fetchData();

        // Polling consiste en que cada cierto tiempo que es definido por nosotros se buscan los datos y se actualizan automáticamente. Esto se hará hasta que el usuario se vaya de la página.
        // this.intervalId se usara como parametro en la funcion clearInterval para cancelar la ejecucion del intervalo.
        this.intervalId = setInterval(this.fetchData, 5000);
    }

    // componentDidUpdate(prevProps, prevState) {
    //   console.log({
    //     prevProps: prevProps,
    //     prevState: prevState
    //   });

    //   console.log({
    //     props: this.props,
    //     state: this.state
    //   });      
    // }

    componentWillUnmount() {
      // El intervalo se debe limpiar ya que aunque la pagina se desmonte el setInterval seguira trabajando causando cambios de estado en un componente que ya no esta.
      // Para limpiar el intervalo se necesita un id.
      clearInterval(this.intervalId);
    }

    // La función que hace una llamada a una API sera asíncrona. Esta llamada hace una petición a una dirección de internet y recibira una respuesta.
    fetchData = async () => {
        // Cada vez que se hace una peticion a la API se mostrara el loader y se eliminaran los errores almacenados previamente si es que los hubo.
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

        // Si la respuesta a la peticion fue un error se mostrara el mismo.
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