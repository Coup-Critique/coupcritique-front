// modules
import { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { DEFAULT_POKEMON_PICTURE } from '@/constants';
import { ART_ITM, ART_PKM, IMG_VERSION } from '@/constants/img';
import { formatFileName, makeClassName } from '@/functions';
import ImageLoader from './ImageLoader';

export const defaultSrc = '/images/picto/circle-question-solid.svg';

const ArtPokemonImg = ({ pokemon, half, imgRef, className, wrapperClassName }) => {
	const getImgPath = useCallback(
		name => {
			if (!name) {
				return DEFAULT_POKEMON_PICTURE;
			} else {
				return (
					`/images/pokemons/${half ? '220px/' : ''}` +
					`${formatFileName(name).toLowerCase()}.png?ver=${IMG_VERSION}`
				);
			}
		},
		[half]
	);

	const src = useMemo(() => getImgPath(pokemon.name), [pokemon.name, getImgPath]);

	return (
		<ImageLoader
			src={src}
			defaultSrc={defaultSrc}
			alt={`Pokémon ${pokemon.nom || pokemon.name}`}
			wrapperClassName={wrapperClassName}
			className={makeClassName('art-pokemon img-fluid', className)}
			height={half ? ART_ITM : ART_PKM}
			width={half ? ART_ITM : ART_PKM}
			imgRef={imgRef}
		/>
	);
};

const ArtPokemon = ({ linked, wrapperClassName, ...props }) =>
	linked ? (
		<Link href={`/entity/pokemons/${props.pokemon.id}`} className={wrapperClassName}>
			<ArtPokemonImg {...props} />
			<span className="sr-only">{props.pokemon.nom || props.pokemon.name}</span>
		</Link>
	) : (
		<ArtPokemonImg {...props} wrapperClassName={wrapperClassName} />
	);
export default ArtPokemon;
