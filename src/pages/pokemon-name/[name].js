import PokemonArticle from '@/components/article/PokemonArticle';
import gens from '@/constants/gens';
import { manageFetch } from '@/hooks/useFetch';
import { redirect404 } from '../404';
import Page302 from '../302';

export async function getStaticPaths() {
	try {
		const paths = await Promise.all(
			gens.map(async gen => {
				const response = await manageFetch(`pokemons?gen=${gen}`);
				return response.pokemons.map(({ name }) => ({ params: { name } }));
			})
		).flat();

		return { paths, fallback: false };
	} catch {
		return { paths: [], fallback: true };
	}
}

export const getStaticProps = async ({ params }) => {
	const { name } = params;
	try {
		const response = await manageFetch(`pokemon-name/${name}`);
		const { pokemon } = response;
		if (!pokemon) throw new Error('Pokemon not found');
		return {
			redirect: {
				destination: `/entity/pokemons/${pokemon.id}`,
				permanent: true,
			},
		};
	} catch (e) {
		console.error(e);
		return redirect404;
	}
};

export default Page302;
