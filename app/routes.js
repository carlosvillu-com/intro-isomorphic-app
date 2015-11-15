import React from 'react';
import { Router, Route, IndexRoute} from 'react-router'

import App from './pages/App.js';
import PokemonDetail from './components/pokemonDetail';
import Index from './components/default';
import NotFound from './components/notFound';


class PokemonDetailRoute extends React.Component {
    constructor(...args){
      super(...args);
    }

    render () {
        // Pass `variables` prop with `pkdx_id` to the Transmit Container.
        return <PokemonDetail variables={{id: this.props.params.pkdx_id}} />;
    }
};

export default (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="pokemon/:pkdx_id" component={PokemonDetailRoute}/>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>    
);
