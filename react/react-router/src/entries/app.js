// Este entryPoint es el que nos servira para que se lea solo en el navegador
// por lo que solo debe configurarse en webpack.config.js y en webpack.dev.config.js de webpack
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../pages/containers/app';

const homeContainer = document.getElementById('home-container');

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>  
, homeContainer);

