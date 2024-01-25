import PokemonArticle from '@/components/article/PokemonArticle';
import gens from '@/constants/gens';
import { manageFetch } from '@/hooks/useFetch';
import { Loader } from 'semantic-ui-react';

const PokemonPage = props =>
	props.pokemon ? <PokemonArticle {...props} /> : <Loader active inline="centered" />;

export async function getStaticPaths() {
	try {
		const paths = await Promise.all(
			gens.map(async gen => {
				const response = await manageFetch(`pokemons?gen=${gen}`);
				return response.pokemons.map(({ id }) => ({ params: { id } }));
			})
		).flat();

		return { paths, fallback: false };
	} catch {
		return { paths: [], fallback: true };
	}
}

export const flatForms = (pokemon, children = null) => {
	if (!pokemon.forms.length) return [];
	let forms = pokemon.forms
		.map(form => (form ? (form.forms.length ? flatForms(form) : form) : children))
		.flat();
	forms.unshift(pokemon);
	return forms;
};

export const makeForms = (pokemon, children = null) => {
	let forms = flatForms(pokemon, children);
	if (pokemon.base_form) {
		forms = makeForms(pokemon.base_form, forms.length ? forms : pokemon);
	}
	return forms;
};

export const getMainUsage = (pokemon, usages) => {
	if (!usages) return null;
	const refTier = pokemon.tier.parent ? pokemon.tier.parent : pokemon.tier;
	return usages.find(usage => usage.tier.id === refTier.id);
};

export const getStaticProps = async ({ params }) => {
	const { id } = params;
	try {
		const response = await manageFetch(`pokemons/${id}`);
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

export default PokemonPage;
