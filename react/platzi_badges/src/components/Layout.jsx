import React, { Fragment } from 'react';

import Navbar from './Navbar';

const Layout = props => 
    (
        <Fragment>
            {/* Gracias al layout podemos hacer persistente el navbar en todas las paginas de la aplicacion */}
            <Navbar />
            {/* children permite renderizar lo que pasa como contenido dentro de Layout */}
            {props.children}
        </Fragment>
    );


export default Layout;