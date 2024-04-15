// modules

// components
import ArticleArticle from '@/components/article/ArticleArticle';
import TournamentContainer from '@/containers/TournamentContainer';
import { manageFetch } from '@/hooks/useFetch';
import useNotifChecker from '@/hooks/useNotifChecker';

const TournamentPage = ({ tournament }) => {
	useNotifChecker('tournament', tournament.id);
	return (
		<TournamentContainer
			Component={ArticleArticle}
			tournament={tournament}
			entityName="tournaments"
		/>
	);
};

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { tournament } = await manageFetch(`tournaments/${id}`);
		return { props: { tournament } };
	} catch (e) {
		console.error(e);
		return { props: { tournament: null } };
	}
}

export default TournamentPage;
