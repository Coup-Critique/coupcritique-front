// modules

// components
import ArticleArticle from '@/components/article/ArticleArticle';
import CircuitTourContainer from '@/containers/CircuitTourContainer';
import { manageFetch } from '@/hooks/useFetch';
import useNotifChecker from '@/hooks/useNotifChecker';

const CircuitTourPage = ({ circuitTour }) => {
	useNotifChecker('circuitTour', circuitTour.id);
	return (
		<CircuitTourContainer
			Component={ArticleArticle}
			circuitTour={circuitTour}
			entityName="circuit-tours"
		/>
	);
};

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { circuitTour } = await manageFetch(`circuit-tours/${id}`);
		return { props: { circuitTour } };
	} catch (e) {
		console.error(e);
		return { props: { circuitTour: null } };
	}
}

export default CircuitTourPage;
