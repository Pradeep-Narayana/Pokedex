import React from 'react';
import Pokedex from './pokedex.js';
import Pokemon from './pokemon.js';
import {Route, Switch } from 'react-router-dom';

function App() {
  return (
   <Switch>
     <Route exact path = "/" render = {(props) => <Pokedex {...props}/>} />
     <Route exact path = "/:pokemonId" render = {(props => <Pokemon {...props}/>)}/>  
   </Switch>
  );
}

export default App;
