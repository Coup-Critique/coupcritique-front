import ItemArticle from '@/components/article/ItemArticle';
import gens from '@/constants/gens';
import { manageFetch } from '@/hooks/useFetch';
import { Loader } from 'semantic-ui-react';

const ItemPage = props =>
	props.item ? <ItemArticle {...props} /> : <Loader active inline="centered" />;

export async function getStaticPaths() {
	try {
		const paths = await Promise.all(
			gens.map(async gen => {
				const response = await manageFetch(`items?gen=${gen}`);
				return response.items.map(({ id }) => ({ params: { id } }));
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
		const response = await manageFetch(`items/${id}`);
		const { item, availableGens } = response;
		const response2 = await manageFetch(`pokemons/item/${id}`);
		const { pokemons } = response2;
		return { props: { item, pokemons, availableGens } };
	} catch (e) {
		console.error(e);
		return { props: { item: null } };
	}
};

export default ItemPage;