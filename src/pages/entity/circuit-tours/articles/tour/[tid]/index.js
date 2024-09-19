// modules

// custom
import { manageFetch } from '@/hooks/useFetch';
import CircuitArticleList from '../..';
import { redirect404 } from '@/pages/404';

// TODO ajouter une props tour
const CircuitArticleListByTour = props => <CircuitArticleList {...props} />;

export async function getServerSideProps({ query }) {
	const { tid } = query;
	try {
		const { circuitArticles } = await manageFetch(`circuit-articles/tour/${tid}`);
		return { props: { circuitArticles } };
	} catch (e) {
		console.error(e);
		return redirect404;
	}
}

export default CircuitArticleListByTour;
