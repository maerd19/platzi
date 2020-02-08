import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest } from '../actions';
import '../assets/styles/components/Login.scss';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';

// Ya que tenemos la informacion de nuestro formulario, se conectara con redux para mandar esta informacion hacia nuestro estado

const Login = props => {
    const [form, setForm] = useState({
        email: ''
    });

    // Funcion que manejara los cambios cada vez que escribimos en los inputs
    const handleInput = event => {
        // Llamado para guardar la informacion
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    // Fubcion que enviara los elementos capturados a donde los necesitemos
    const handleSubmit = event => {
        event.preventDefault();
        // Con loginRequest enviaremos al estado principal la info del formulario
        props.loginRequest(form);
        // Si el usuario se loguea exitosamente lo enviaremos al home con history que es una propiedad de react-router-dom.
        // Se obtiene de los props por tener la aplicacion encapsulada dentro del BrowserRouter.
        // El metodo push nos permitira movernos a donde sea necesario
        props.history.push('/');
    }

    return (
        <section className="login">
            <section className="login__container">
            <h2>Inicia sesión</h2>
            <form className="login__container--form" onSubmit={handleSubmit}>
                <input 
                    name="email"
                    className="input" 
                    type="text" 
                    placeholder="Correo" 
                    onChange={handleInput}
                />
                <input 
                    name="password"
                    className="input" 
                    type="password" 
                    placeholder="Contraseña" 
                    onChange={handleInput}
                />
                <button className="button">Iniciar sesión</button>
                <div className="login__container--remember-me">
                <label>
                    <input type="checkbox" id="cbox1" value="first_checkbox" />Recuérdame
                </label>
                <a href="/">Olvidé mi contraseña</a>
                </div>
            </form>
            <section className="login__container--social-media">
                <div><img src={googleIcon} /> Inicia sesión con Google</div>
                <div><img src={twitterIcon} /> Inicia sesión con Twitter</div>
            </section>
            <p className="login__container--register">
                {/* Manejo de espacios en blanco en JSX */}
                No tienes ninguna cuenta {' '}
                <Link to="/register">Regístrate</Link>
            </p>
            </section>
        </section>
    );
}

const mapDispatchToProps = {
    loginRequest
}

export default connect(null, mapDispatchToProps)(Login);
