// modules

// custom
import { manageFetch } from '@/hooks/useFetch';
import CircuitArticleList from '../..';

// TODO ajouter une props tour
const CircuitArticleListByTour = props => <CircuitArticleList {...props} />;

export async function getServerSideProps() {
	try {
		const { circuitArticles } = await manageFetch(`circuit-articles`);
		return { props: { circuitArticles } };
	} catch (e) {
		console.error(e);
		return { props: { circuitArticles: null } };
	}
}

export default CircuitArticleListByTour;
