import React from 'react';
import { Link } from 'react-router'

export default class Pokemons extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {pokemons: []};
  }

  componentDidMount(){
    fetch('http://pokeapi.co/api/v1/pokemon/?limit=50')
      .then(resp => resp.json())
      .then(pokemons => {
        this.setState({
          pokemons: pokemons.objects
        });
      });
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
