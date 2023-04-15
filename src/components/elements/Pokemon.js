// modules
import React from 'react';
import { Link } from 'react-router-dom';
import { formateName } from '../../functions';

const Pokemon = ({ pokemon }) => (
	<Link to={`/entity/pokemons/${pokemon.id}`}>
		{pokemon.nom || formateName(pokemon.name)}
	</Link>
);
export default Pokemon;
