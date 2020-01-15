import React, { Fragment } from 'react';

import Navbar from './Navbar';

const Layout = props => 
    (
        <Fragment>
            <Navbar />
            {console.log('props', props)}
            {props.children}
        </Fragment>
    );


export default Layout;
