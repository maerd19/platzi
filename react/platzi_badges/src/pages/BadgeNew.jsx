import React, { Component, Fragment } from 'react';

import './styles/BadgeNew.css';
import header from '../images/platziconf-logo.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import PageLoading from '../components/PageLoading';
import api from '../api';

class BadgeNew extends Component {
  // LiftingUpState: Hay ocasiones en las cuales hay un estado que tenemos que compartir con dos o más componentes.
  //                 El estado se levanta al componente en comun mas cercano a los componentes que lo usan.
  // Se coloca el estado en una ubicacion en la que este disponible para pasarse como props a los componentes.
  state = {
	loading: false,
  error: null,
  // Inicializar los valores del estado para evitar errores.
        form: {
            firstName: '',
            lastName: '',
            email: '',
            jobTitle: '',
            twitter: '',
	      }
  };

  handleChange = e => {
    // setState en un metodo de la clase component
    this.setState({
      form: {
        // Agregamos al state todos los valores que tenia anteriormente usando el spread operator
        ...this.state.form,
        // Se modifica el valor del state que corresponda al input que llamo este metodo en BadgeForm
        // El input que llame a esta funcion reemplazara el valor en los corchetes por su nombre.
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      await api.badges.create(this.state.form);
      this.setState({ loading: false });      

      this.props.history.push('/badges');
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    return (
      <Fragment>
        <div className="BadgeNew__hero">
          <img
            className="BadgeNew__hero-image img-fluid"
            src={header}
            alt="Logo"
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || 'FIRST_NAME'}
                lastName={this.state.form.lastName || 'LAST_NAME'}
                twitter={this.state.form.twitter || 'twitter'}
                jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}
                email={this.state.form.email || 'EMAIL'}
                avatarUrl="https://www.gravatar.com/avatar/21594ed15d68ace3965642162f8d2e84?d=identicon"
              />
            </div>

            <div className="col-6">
              <h1>New Attendant</h1>            
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default BadgeNew;