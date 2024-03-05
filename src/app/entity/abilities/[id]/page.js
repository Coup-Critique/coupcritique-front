// modules
// components
import AbilityArticle from '@/components/article/AbilityArticle';
import gens from '@/constants/gens';
import { manageFetch } from '@/hooks/useFetch';
import { Loader } from 'semantic-ui-react';

const AbilityPage = props =>
	props.ability ? <AbilityArticle {...props} /> : <Loader active inline="centered" />;

export async function getStaticPaths() {
	try {
		const paths = await Promise.all(
			gens.map(async gen => {
				const response = await manageFetch(`abilities?gen=${gen}`);
				return response.abilities.map(({ id }) => ({ params: { id } }));
			})
		).flat();

		return { paths, fallback: false };
	} catch {
		return { paths: [], fallback: true };
	}
}

export const getStaticProps = async ({ params }) => {
	const { id } = params;
	try {
		const response = await manageFetch(`abilities/${id}`);
		const { ability, availableGens } = response;
		const response2 = await manageFetch(`pokemons/ability/${id}`);
		const { pokemons } = response2;
		return { props: { ability, pokemons, availableGens } };
	} catch (e) {
		console.error(e);
		return { props: { ability: null } };
	}
};

export default AbilityPage;
