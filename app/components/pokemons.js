import React from 'react';
import { Link } from 'react-router'
import Transmit from "react-transmit";

class Pokemons extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {pokemons: this.props.pokemons || [] }
  }

  render(){
    return(
      <ul>
        { 
          !this.state.pokemons.length ? <p>Cargando lista de pokemons</p>
                                      : this.state.pokemons.map((pokemon, index) => {
                                          return(
                                            <li key={index}>
                                              <Link to={`/pokemon/${pokemon.pkdx_id}`}>{pokemon.name}</Link>
                                            </li>
                                          );
                                        })
        }
      </ul>
    );
  }
}

export default Transmit.createContainer(Pokemons, {
  initialVariables: {
		aPokemons: [],
	},
	fragments: {
    pokemons: function({aPokemons}){
      console.log('Pokemons fragment');
      return fetch('http://pokeapi.co/api/v1/pokemon/?limit=10')
              .then(resp => resp.json())
              .then( pokemonsList => {
                return aPokemons.concat(pokemonsList.objects)
              })
              .catch(console.error.bind(console));
    }
  }
});
