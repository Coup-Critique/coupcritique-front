// modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
// components
import PokemonArticle from '@/pages/article/PokemonArticle';
// hooks
import useFetch from '@/hooks/useFetch';
// constants
import { setGenAction } from '@/reducers/gen';

const PokemonByNameContainer = props => {
	const dispatch = useDispatch();
	const { ssrData, user, gen } = useSelector(state => state);
	const history = useHistory();
	const { name } = useParams();
	const { pathname } = useLocation();
	const [result, load, loading] = useFetch();
	const ssrPokemon = ssrData?.pokemon;

	useEffect(() => {
		// gen comes from name
		if (ssrPokemon && ssrPokemon.name === name && ssrPokemon.gen != gen) {
			dispatch(setGenAction(ssrPokemon.gen));
		}
	}, []);

	useEffect(() => {
		// gen comes from name
		if (
			!user.loading
			&& (!ssrPokemon
				|| (ssrPokemon.name !== name && ssrPokemon.usageName !== name))
		) {
			load({ url: `pokemon-name/${name}` });
		}
	}, [pathname, user.loading, user]);

	useEffect(() => {
		if (result) {
			if (result.success) {
				if (result.gen != gen) {
					dispatch(setGenAction(result.gen));
				}
			} else if (result.message === 'Aucun Pokémon recensé ne porte ce nom.') {
				history.push('/404');
			}
		}
	}, [result]);

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (
		(result && result.success)
		|| (ssrData && Object.keys(ssrData).length && ssrData.pokemon)
	) {
		return <PokemonArticle result={result || ssrData} {...props} />;
	} else {
		return null;
	}
};

export default PokemonByNameContainer;
