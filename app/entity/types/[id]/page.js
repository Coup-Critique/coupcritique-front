import TypeArticle from '@/components/article/TypeArticle';
import gens from '@/constants/gens';
import { manageFetch } from '@/hooks/useFetch';
import { Loader } from 'semantic-ui-react';

const TypePage = props =>
	props.type ? <TypeArticle {...props} /> : <Loader active inline="centered" />;

export async function getStaticPaths() {
	try {
		const paths = await Promise.all(
			gens.map(async gen => {
				const response = await manageFetch(`types?gen=${gen}`);
				return response.types.map(({ id }) => ({ params: { id } }));
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
		const { type, weaknesses, efficiencies, availableGens } = await manageFetch(
			`types/${id}`
		);
		const { pokemons } = await manageFetch(`pokemons/type/${id}`);
		return { props: { type, weaknesses, efficiencies, pokemons, availableGens } };
	} catch (e) {
		console.error(e);
		return { props: { type: null } };
	}
};

export default TypePage;
