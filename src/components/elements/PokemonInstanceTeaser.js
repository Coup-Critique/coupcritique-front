// modules
import React, { useRef } from 'react';
import ArtPokemon from './ArtPokemon';
import Type from './Type';
import Pokemon from './Pokemon';
import ScrollReveal from '../ScrollReveal';

const PokemonInstanceTeaser = ({ instance }) => {
	const ref = useRef();

	return (
		<ScrollReveal
			className="pokemon-instance-teaser"
			animation="zoomIn"
			outterRef={ref}
		>
			<div className="d-flex flex-grow-1 align-items-center">
				<ArtPokemon pokemon={instance.pokemon} half imgRef={ref} />
			</div>
			<h3 className="pokemon-name">
				<Pokemon pokemon={instance.pokemon} />
			</h3>
			<div className="type-wrapper">
				<Type type={instance.pokemon.type_1} />
				{!!instance.pokemon.type_2 && <Type type={instance.pokemon.type_2} />}
			</div>
		</ScrollReveal>
	);
};
export default PokemonInstanceTeaser;
