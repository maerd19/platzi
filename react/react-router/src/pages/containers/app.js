// Este sera el archivo que se renderizara en el server
// osea desde webpack.server.config.js
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Map as map } from 'immutable';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Route, Switch, Redirect } from 'react-router-dom';

import reducer from '../../reducers/index';
import Home from '../components/home';
import Header from '../components/header';
import Videos from './videos';
import NotFound from '../components/not-found';

const store = createStore(
  reducer,
  map(),
  composeWithDevTools(
    applyMiddleware(
      logger,
      thunk
    )
  )
);

const App = () => (
    <Provider store={store}>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/videos" component={Videos} />
          <Redirect from="/v" to="/videos" />
          <Route component={NotFound} />
        </Switch>                
      </Fragment>
    </Provider>
);

export default App;