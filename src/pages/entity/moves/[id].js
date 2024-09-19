import MoveArticle from '@/components/article/MoveArticle';
import gens from '@/constants/gens';
import { manageFetch } from '@/hooks/useFetch';
import { Loader } from 'semantic-ui-react';
import { redirect404 } from '@/pages/404';

const MovePage = props =>
	props.move ? <MoveArticle {...props} /> : <Loader active inline="centered" />;

export async function getStaticPaths() {
	try {
		const paths = await Promise.all(
			gens.map(async gen => {
				const response = await manageFetch(`moves?gen=${gen}`);
				return response.moves.map(({ id }) => ({ params: { id } }));
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
		const response = await manageFetch(`moves/${id}`);
		const { move, availableGens } = response;
		const response2 = await manageFetch(`pokemons/move/${id}`);
		const { pokemons } = response2;
		return { props: { move, pokemons, availableGens } };
	} catch (e) {
		console.error(e);
		return redirect404;
	}
};

export default MovePage;
