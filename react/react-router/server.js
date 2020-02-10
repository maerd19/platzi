import express from 'express';
import React from 'react-dom';
import App from './dist/ssr/app';
import { StaticRouter } from 'react-router';
import ReactDOMServer from 'react-dom/server';

const app = express();

app.get('*', (req, res) => {
    const html = ReactDOMServer.renderToString(
        // StaticRouter necesita por lo menos un parametro (location)
        // Por eso se llama StaticRouter porque no es dinamico y tienes que indicarle a app 
        // la ruta que debe renderizar. Para generar dinamicamente la ruta es necesario meterlo
        // en algun lugar donde la ruta tambien sea variable.
        <StaticRouter
            location={req.url}
            // En el context se pueden pasar algunas variables que vayan desde el server hacia la app.
            context={{
                name: 'ivan'
            }}
        >
            <App />
        </StaticRouter>
    );
    res.write(
        `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>Platzi Video</title>
              <!-- <link rel="stylesheet" href="dist/css/home.7646f097e8e64cbf8f09.css"> -->
            </head>
            <body>
              <div id="home-container">Hola mundo ${html}</div>
              <div id="modal-container"></div>
              <script src="http://localhost:9000/js/app.js"></script>
              <!-- <script src="dist/js/home.7646f097e8e64cbf8f09.js"></script> -->
            </body>
            </html>`
    );
    res.end();
});

app.listen(3000);
console.log('el server prendio en el puerto 3000');