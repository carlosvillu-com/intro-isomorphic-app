import 'isomorphic-fetch';
import React from 'react';

import Pokemons from '../components/pokemons'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //const children = React.cloneElement(this.props.children, {variables: {id: this.props.params.pkdx_id}});
    return (
      <div className="App" style={{display: 'flex'}}>
        <div className="Pokemons">
          <Pokemons _onFetch={(data) => console.log('onFetch', data)}/>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
