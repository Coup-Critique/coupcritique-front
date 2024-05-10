// modules

// components
import ArticleArticle from '@/components/article/ArticleArticle';
import CircuitArticleContainer from '@/containers/CircuitArticleContainer';
import { manageFetch } from '@/hooks/useFetch';
import useNotifChecker from '@/hooks/useNotifChecker';

const CircuitArticlePage = ({ circuitArticle }) => {
	useNotifChecker('circuitArticle', circuitArticle.id);
	return (
		<CircuitArticleContainer
			Component={ArticleArticle}
			circuitArticle={circuitArticle}
			entityName="circuit-articles"
			path="circuit-tours/articles"
			link={
				// prettier-ignore
				circuitArticle.tour ? {
					href: `/entity/circuit-tours/${circuitArticle.tour.id}`,
					children: "Tournoi : " +circuitArticle.tour.title,
				} : undefined
			}
		/>
	);
};

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { circuitArticle } = await manageFetch(`circuit-articles/${id}`);
		return { props: { circuitArticle } };
	} catch (e) {
		console.error(e);
		return { props: { circuitArticle: null } };
	}
}

export default CircuitArticlePage;
