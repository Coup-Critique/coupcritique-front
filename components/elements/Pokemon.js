// modules

import Link from 'next/link';
import { formateName } from '@/functions';

const Pokemon = ({ pokemon }) => (
	<Link href={`/entity/pokemons/${pokemon.id}`}>
		{pokemon.nom || formateName(pokemon.name)}
	</Link>
);
export default Pokemon;
