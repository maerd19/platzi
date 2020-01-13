import React, { Fragment } from 'react';

import Navbar from './Navbar';

const Layout = props => 
    (
        <Fragment>
            <Navbar />
            {props.children}
        </Fragment>
    );


export default Layout;
