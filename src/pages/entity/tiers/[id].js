// modules

// components
import TierArticle from '@/components/article/TierArticle';
import TierContainer from '@/containers/TierContainer';
import { manageFetch } from '@/hooks/useFetch';

const TierPage = () => <TierContainer Component={TierArticle} />;

export async function getStaticPaths() {
	try {
		const response = await manageFetch(`tiers`);
		if (!response.tiers) return { paths: [], fallback: true };

		const paths = response.tiers.map(({ id }) => ({ params: { id } }));
		return { paths, fallback: false };
	} catch {
		return { paths: [], fallback: true };
	}
}

export const getStaticProps = async ({ params }) => {
	const { id } = params;
	try {
		const response = await manageFetch(`tiers/${id}`);
		const {
			tier,
			usages,
			usagesTechnically,
			pokemons,
			pokemonsTechnically,
			pokemonsBl,
			availableGens,
		} = response;
		return {
			props: {
				tier,
				usages,
				usagesTechnically,
				pokemons,
				pokemonsTechnically,
				pokemonsBl,
				availableGens,
			},
		};
	} catch (e) {
		console.error(e);
		return { props: { tier: null } };
	}
};

export default TierPage;
