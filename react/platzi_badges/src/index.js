import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './global.css';
import App from './components/App';

const container = document.getElementById('app');

// ReactDOM.render() toma dos argumentos: Qué queremos renderizar y dónde lo queremos renderizar.
ReactDOM.render(<App />, container);