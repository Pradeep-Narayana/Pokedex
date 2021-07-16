import React, {useState, useEffect} from "react";
import mockData from './mockData.js';
import {Typography, Link,Grid, CircularProgress, Button} from '@material-ui/core';
import {toFirstCharUpperCase} from './constants.js';
import axios from "axios";
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles({
    pokedexContainer : {
        paddingTop : '20px',
        paddingLeft : '50px',
        paddingRight : '50px'
    },   
});

const Pokemon = (props) => {
    const { history,match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);
    const classes = useStyles();

    // three satates are possible :
    //1. pokemon undefined - gettimg info - loading progress
    //2. good data - return pokemon
    //3. invalid data - return NOT FOUND

    useEffect(()=>{
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then(function (response){
            const {data} = response;
            setPokemon(data);
        })
        .catch(function(error){
            setPokemon(false);        
        });
    }, [pokemonId]);
    const generatePokemonJsx = (pokemon) =>{
        
       const {name, id, species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
       const {front_default} = sprites;
 
    return (   
        <>
        <Grid style = {{paddingLeft : '50px'}}>
        <Typography variant = "h1">
            {`${id}.`}{toFirstCharUpperCase(name)}
            { <img src = {front_default}/>}
        </Typography>
        <img style = {{width : "300px", height : "300px"}} src = {fullImageUrl} />
        <Typography variant ="h3">Pokemon Info</Typography> 
        <Typography>Species :
            <Link href = {species.url}>{species.name}</Link>
        </Typography>
    <Typography>Height : {height}</Typography>
    <Typography>Weight : {weight}</Typography>
    <Typography variant="h6">Types</Typography>
    { types.map((typeInfo) => {
        const {type} = typeInfo;
        const {name} = type;
        // can also display it as typeInfo.type.name. It is split now into each constant to make it more readable.
    return <Typography key = {name}>{`${name}`}</Typography> 

    })}
    </Grid>
        </>
    );
};
return (
<>
    {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJsx(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          back to pokedex
        </Button>
      )}
</>);
};
 
export default Pokemon;