import React from 'react';
import styles from './App.css';

import Pokemons from '../components/pokemons'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.app}>
        <div className="Pokemons">
          <Pokemons />
        </div>
        <div>
          {this.props.children || "Selecciona un pokemon!!"}
        </div>
      </div>
    );
  }
}
