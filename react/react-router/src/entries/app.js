import React, { Fragment } from 'react';
import { render } from 'react-dom';
import Home from '../pages/components/home';
import Videos from '../pages/containers/videos';
import NotFound from '../pages/components/not-found';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/index';
import { Map as map } from 'immutable';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../pages/components/header';

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

const homeContainer = document.getElementById('home-container')

render(
  <BrowserRouter>
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
  </BrowserRouter>  
, homeContainer);

