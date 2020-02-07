import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Layout from '../components/Layout';

const App = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                {/* 1.- Home se conecta con redux. */}
                {/* 2.- Trae la informacion del estado inicial */}
                {/* 3.- Hace render de cada uno de los elementos del estado inicial */}
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route component={NotFound} />
            </Switch>            
        </Layout>        
    </BrowserRouter>
);

export default App;
