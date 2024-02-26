// modules
// import Link from 'next/link';
import { formateName } from '@/functions';

const Pokemon = ({ pokemon }) => (
	<a href={`/entity/pokemons/${pokemon.id}`}>
		{pokemon.nom || formateName(pokemon.name)}
	</a>
);
export default Pokemon;
