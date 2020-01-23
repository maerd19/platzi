import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// React Router nos da las herramientas para hacer SPA's mediante 4 componentes:
// BrowserRouter
// Route
// Switch
// Link

import Layout from './Layout';
import Home from '../pages/Home';
import Badges from '../pages/Badges';
import BadgeNew from '../pages/BadgeNew';
import BadgeDetailsContainer from '../pages/BadgeDetailsContainer';
import BadgeEdit from '../pages/BadgeEdit';
import NotFound from '../pages/NotFound';

const App = () => 
    (
        // BrowserRouter habilita la aplicacion como una SPA.
        <BrowserRouter>
            <Layout>
                {/* Switch se asegura que solamente un Route se renderice. Dentro de Switch solamente van elementos de Route.*/}
                <Switch>
                    {/* route hace render del component al haber un match exacto de la url con el path. Recibe tres props: match, history, location. */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/badges" component={Badges} />
                    <Route exact path="/badges/new" component={BadgeNew} />
                    {/* badgeId es una variable. Sera un valor definido en la url de forma generica */}
                    <Route exact path="/badges/:badgeId" component={BadgeDetailsContainer} />
                    <Route exact path="/badges/:badgeId/edit" component={BadgeEdit} />
                    <Route component={NotFound} />
                </Switch> 
            </Layout>                       
        </BrowserRouter>
    )

export default App;