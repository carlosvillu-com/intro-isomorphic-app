import React from 'react';

const POKEAPI_HOST = "http://pokeapi.co";
const LOADING_POKEMON = {
  name: 'Cargando Pokemon',
  placeholder: 'http://placeholdit.imgix.net/~text?txtsize=33&txt=P&w=84&h=84'
};

const fetchJSON = (url) => fetch(url).then(resp => resp.json())

const pokemon = (id) => {
  return fetchJSON(`${POKEAPI_HOST}/api/v1/pokemon/${id}`)
          .then(pokemon => {
            return Promise.all(pokemon.sprites.map(sprite => {
              return fetchJSON(`${POKEAPI_HOST}${sprite.resource_uri}`)
                       .then(resource => resource.image)
            })).then(sprites => ({...pokemon, sprites}))
          });
};

export default class PokemonDetail extends React.Component {

  constructor(...args){
    super(...args);
    this.state = {pokemon: LOADING_POKEMON};
  }

  componentDidMount(){
    pokemon(this.props.params.pkdx_id).then(pokemon => this.setState({pokemon}));
  }

  componentWillReceiveProps(props){
    this.setState({pokemon: LOADING_POKEMON});
    pokemon(props.params.pkdx_id).then(pokemon => this.setState({pokemon}));
  }

  render(){
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
