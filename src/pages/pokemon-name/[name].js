// modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import PokemonArticle from '@/components/article/PokemonArticle';
// hooks
import { manageFetch } from '@/hooks/useFetch';
// constants
import { setGenAction } from '@/reducers/gen';
import { lastGen } from '@/constants/gens';
import { getMainUsage, makeForms } from '../entity/pokemons/[id]';

const PokemonByNameContainer = props => {
	const dispatch = useDispatch();
	const gen = useSelector(state => state.gen);
	const name = useGetParam('name');

	useEffect(() => {
		// gen comes from name
		if (props.pokemon && props.pokemon.name === name && props.pokemon.gen != gen) {
			dispatch(setGenAction(props.pokemon.gen));
		}
	}, []);

	return props.pokemon ? (
		<PokemonArticle {...props} />
	) : (
		<Loader active inline="centered" />
	);
};

export async function getStaticPaths() {
	try {
		const response = await manageFetch(`pokemons?gen=${lastGen}`);
		const paths = response.pokemons.map(({ name }) => ({ params: { name } }));

		return { paths, fallback: false };
	} catch {
		return { paths: [], fallback: true };
	}
}

export const getStaticProps = async ({ params }) => {
	const { name } = params;
	try {
		const response = await manageFetch(`pokemon-name/${name}`);
		const { pokemon, usages, weaknesses, availableGens, inherit } =
			response;
			const { tiers } = await manageFetch('tiers-select');
		return {
			props: {
				pokemon,
				mainPokemon: inherit ? pokemon.base_form : pokemon,
				forms: pokemon ? makeForms(pokemon) : [],
				weaknesses,
				usage: getMainUsage(pokemon, usages),
				usages,
				availableGens,
				tiers,
			},
		};
	} catch (e) {
		console.error(e);
		return { props: { pokemon: null } };
	}
};

export default PokemonByNameContainer;
