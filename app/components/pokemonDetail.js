import React from 'react';
import Transmit from "react-transmit";

const POKEAPI_HOST = "http://pokeapi.co";
const LOADING_POKEMON = {
  name: 'Cargando Pokemon',
  placeholder: 'http://placeholdit.imgix.net/~text?txtsize=33&txt=P&w=84&h=84'
};

const fetchJSON = (url) => fetch(url).then(resp => resp.json())

const pokemonAPI = ({id}) => {
  return fetchJSON(`${POKEAPI_HOST}/api/v1/pokemon/${id}`)
          .then(pokemon => {
            return Promise.all(pokemon.sprites.map(sprite => {
              return fetchJSON(`${POKEAPI_HOST}${sprite.resource_uri}`)
                       .then(resource => resource.image)
            })).then(sprites => ({...pokemon, sprites}))
          });
};

class PokemonDetail extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {pokemon: this.props.pokemon || LOADING_POKEMON};
  }

  componentWillReceiveProps(props){
    console.log('componentWillReceiveProps', props);
    //this.setState({pokemon: LOADING_POKEMON});
    //pokemonAPI({id: props.params.pkdx_id}).then(pokemon => this.setState({pokemon}));
  }

  render(){
    console.log('PokemonDetail Render')
    return(
      <div className="">
        <div>
          {!this.state.pokemon.sprites
              ? <img src="http://placeholdit.imgix.net/~text?txtsize=33&txt=P&w=84&h=84" width="84" height="84"/>
              : this.state.pokemon.sprites.map((sprite, index) => <img key={index} src={`${POKEAPI_HOST}${sprite}`} width="84" height="84"/>)
          }
        </div>
        <div>
          {this.state.pokemon.name}
        </div>
      </div>
    );
  }
}

export default Transmit.createContainer(PokemonDetail, {
  initialVariables: {
		oPokemon: {},
    id: null
	},
	fragments: {
    pokemon: function({oPokemon, id}){
      console.log('Pokemon fragment', id);
      return pokemonAPI({id})
              .then(pokemon => {
                return pokemon;
              })
              .catch(error => {
                console.error('Error', error);
              })
    }
  }
});
