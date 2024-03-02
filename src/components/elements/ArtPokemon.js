// modules
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Loader } from 'semantic-ui-react';
import { DEFAULT_POKEMON_PICTURE } from '@/constants';
import { ART_ITM, ART_PKM, IMG_VERSION } from '@/constants/img';
import { formatFileName, makeClassName } from '@/functions';
// import Image from 'next/image';

const ArtPokemonImg = ({ pokemon, half, imgRef }) => {
	// TODO faire pareil avec les Items, faire un composant commun.
	const [loading, setLoading] = useState(false);

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
			const path = getImgPath(pokemon.name);
			if (path !== image) {
				setImage(path);
				setLoading(true);
			}
		}
	}, [pokemon.name]);

	return (
		<div className="position-relative">
			{loading && <Loader active size="big" />}
			<img
				src={image}
				onError={e => {
					e.target.onerror = null;
					e.target.src = '/images/picto/circle-question-solid.svg';
					setLoading(false);
				}}
				onLoad={e => setLoading(false)}
				alt={`Pokémon ${pokemon.nom || pokemon.name}`}
				className={makeClassName('art-pokemon img-fluid', loading && 'opacity-0')}
				ref={imgRef}
				height={half ? ART_ITM : ART_PKM}
				width={half ? ART_ITM : ART_PKM}
			/>
		</div>
	);
};

const ArtPokemon = ({ linked, ...props }) =>
	linked ? (
		<Link href={`/entity/pokemons/${props.pokemon.id}`}>
			<ArtPokemonImg {...props} />
			<span className="sr-only">{props.pokemon.nom || props.pokemon.name}</span>
		</Link>
	) : (
		<ArtPokemonImg {...props} />
	);
export default ArtPokemon;
