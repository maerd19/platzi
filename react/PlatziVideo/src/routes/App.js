import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Layout from '../components/Layout';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Layout>
                {/* Home al ser el 1er elemento que hace render se conecta con React y redux para traer */}
                {/* la informacion de nuestro estado y hacer render de cada uno de los elementos */}
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route component={NotFound} />
            </Layout>            
        </Switch>        
    </BrowserRouter>
);

export default App;
