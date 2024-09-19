// modules

// components
import TierArticle from '@/components/article/TierArticle';
import gens from '@/constants/gens';
import { manageFetch } from '@/hooks/useFetch';
import { Loader } from 'semantic-ui-react';
import { redirect404 } from '@/pages/404';

const TierPage = props =>
	props.tier ? <TierArticle {...props} /> : <Loader active inline="centered" />;

export async function getStaticPaths() {
	try {
		const paths = await Promise.all(
			gens.map(async gen => {
				const response = await manageFetch(`tiers?gen=${gen}`);
				return response.tiers.map(({ id }) => ({
					params: { id: id.toString() },
				}));
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
		const response = await manageFetch(`tiers/${id}`);
		return {
			props: {
				tier: response.tier,
				usages: response.usages || null,
				usagesTechnically: response.usagesTechnically || null,
				pokemons: response.pokemons || null,
				pokemonsTechnically: response.pokemonsTechnically || null,
				pokemonsBl: response.pokemonsBl || null,
				availableGens: response.availableGens || null,
			},
		};
	} catch (e) {
		console.error(e);
		return redirect404;
	}
};

export default TierPage;
