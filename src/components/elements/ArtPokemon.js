// modules
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { DEFAULT_POKEMON_PICTURE } from '../../constants';
import { ART_ITM, ART_PKM, IMG_VERSION } from '../../constants/img';
import { formatFileName } from '../../functions';

const getImgPath = (name, half) =>
	`/images/pokemons/${half ? '220px/' : ''}${name.toLowerCase()}.png?ver=${IMG_VERSION}`;

const ArtPokemonImg = ({ pokemon, half, imgRef }) => {
	const unmounted = useRef(false);
	const [image, setImage] = useState(getImgPath(formatFileName(pokemon.name, half)));

	useEffect(() => {
		getTheRightImage(formatFileName(pokemon.name));

		return () => (unmounted.current = true);
	}, []);

	const getTheRightImage = name => {
		if (!name) {
			// prevent infinite loop (base case)
			if (!unmounted.current) {
				setImage(DEFAULT_POKEMON_PICTURE);
			}
		} else {
			const src = getImgPath(name, half);
			fetch(src).then(res => {
				if (res.status === 200 && !unmounted.current) {
					setImage(src);
				} else {
					let nextName = name.split('-');
					nextName.pop();
					nextName = nextName.join('-');
					getTheRightImage(nextName);
				}
			});
		}
	};

	if (!image) return <Loader active size="big" />;
	return (
		<img
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
		<Link to={`/entity/pokemons/${props.pokemon.id}`}>
			<ArtPokemonImg {...props} />
			<span className="sr-only">{props.pokemon.nom || props.pokemon.name}</span>
		</Link>
	) : (
		<ArtPokemonImg {...props} />
	);
export default ArtPokemon;
