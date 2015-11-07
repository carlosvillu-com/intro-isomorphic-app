import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route } from 'react-router'

import App from './pages/App.js';
import PokemonDetail from './components/pokemonDetail'

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="pokemon/:pkdx_id" component={PokemonDetail}/>
    </Route>
  </Router>    
, document.getElementById('root'));
