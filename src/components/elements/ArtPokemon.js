// modules
import { useEffect, useRef, useState } from 'react';
// import Link from 'next/link';
import { Loader } from 'semantic-ui-react';
import { DEFAULT_POKEMON_PICTURE } from '@/constants';
import { ART_ITM, ART_PKM, IMG_VERSION } from '@/constants/img';
import { formatFileName } from '@/functions';
import Image from 'next/image';

const ArtPokemonImg = ({ pokemon, half, imgRef }) => {
	const getImgPath = name => {
		if (!name) {
			return DEFAULT_POKEMON_PICTURE;
		} else {
			return (
				`/images/pokemons/${half ? '220px/' : ''}` +
				`${formatFileName(name).toLowerCase()}.png?ver=${IMG_VERSION}`
			);
		}
	};

	const [image, setImage] = useState(getImgPath(pokemon.name));

	useEffect(() => {
		if (pokemon) {
			setImage(getImgPath(pokemon.name));
		}
	}, [pokemon.name]);

	if (!image) return <Loader active size="big" />;
	return (
		<Image
			src={image}
			onError={e => {
				e.target.onerror = null;
				e.target.src = '/images/picto/circle-question-solid.svg';
			}}
			alt={`Pokémon ${pokemon.nom || pokemon.name}`}
			className="art-pokemon img-fluid"
			ref={imgRef}
			height={half ? ART_ITM : ART_PKM}
			width={half ? ART_ITM : ART_PKM}
		/>
	);
};

const ArtPokemon = ({ linked, ...props }) =>
	linked ? (
		<a href={`/entity/pokemons/${props.pokemon.id}`}>
			<ArtPokemonImg {...props} />
			<span className="sr-only">{props.pokemon.nom || props.pokemon.name}</span>
		</a>
	) : (
		<ArtPokemonImg {...props} />
	);
export default ArtPokemon;
