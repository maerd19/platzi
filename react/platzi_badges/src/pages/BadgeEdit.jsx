import React, { Component, Fragment } from 'react';

import './styles/BadgeEdit.css';
import header from '../images/platziconf-logo.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import PageLoading from '../components/PageLoading';
import api from '../api';

class BadgeEdit extends Component {
  state = {
    // Como esta pagina comienza con una peticion el loading se inicializa en true
    loading: true,
    error: null,
    form: {
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        twitter: '',
    },
  };

  componentDidMount(){
    // Al ocurrir el componentDidMount buscare los datos
    this.fetchData()
  }

  // Al momento de pedir datos se utiliza una funcion asincrona
  fetchData = async e => {
    this.setState({ loading: true, error: null });

    try {
        // read tomara el ID del badge que se desea modificar
      const data = await api.badges.read(
        // read se encuentra en la url. React router permite leerlo usando uno de los props que los routes le pasa a los componentes (this.props.match)
        // Cada una de las variables insertadas en el path que se declaro en la ruta puede accederse dentro del objeto params.
        this.props.match.params.badgeId
      )
      // Si se recuperan los datos exitosamente se almacenaran dentro del form.
      this.setState({ loading: false, form: data })
    } catch (error) {
      // Si hay un error se detiene el loading y se almacena el error para mostrase.
      this.setState({ loading: false, error: error });      
    }
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      await api.badges.update(this.props.match.params.badgeId, this.state.form);
      this.setState({ loading: false });      
      // Despues de hacer la actualizacion nos moveremos a la vista de badges donde veremos los cambios ya hechos
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
        <div className="BadgeEdit__hero">
          <img
            className="BadgeEdit__hero-image img-fluid"
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
              <h1>Edit Attendant</h1>
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

export default BadgeEdit;
