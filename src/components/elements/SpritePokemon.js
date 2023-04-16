// modules
import React from 'react';
import { Link } from 'react-router-dom';
import { IMG_VERSION, SPRITE_PKM } from '@/constants/img';
import { formatFileName, makeClassName } from '@/functions';

const SpritePokemonImg = ({ pokemon, ...props }) => (
	<img
		src={`/images/pokemons/sprites/${formatFileName(pokemon.name)}.png?ver=${IMG_VERSION}`}
		onError={e => {
			e.target.onerror = null;
			e.target.src = `/images/items/sprites/unknown.png?ver=${IMG_VERSION}`;
		}}
		alt={`Pokémon ${pokemon.nom || pokemon.name}`}
		width={SPRITE_PKM}
		height={SPRITE_PKM}
		{...props}
	/>
);

const SpritePokemon = ({ pokemon, isLink = true, className }) =>
	isLink ? (
		<Link
			to={`/entity/pokemons/${pokemon.id}`}
			className={makeClassName('sprite', className)}
			title={pokemon.nom || pokemon.name}
		>
			<SpritePokemonImg pokemon={pokemon} className="link" />
			<span className="sr-only">{pokemon.nom || pokemon.name}</span>
		</Link>
	) : (
		<SpritePokemonImg
			pokemon={pokemon}
			className={makeClassName('sprite', className)}
		/>
	);
export default SpritePokemon;
