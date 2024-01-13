// modules

// components
import TournamentArticle from '@/components/article/TournamentArticle';
import { manageFetch } from '@/hooks/useFetch';
import useNotifChecker from '@/hooks/useNotifChecker';

const TournamentPage = ({ tournament }) => {
	useNotifChecker('tournament', tournament.id);
	return <TournamentArticle tournament={tournament} />;
};

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { tournament } = await manageFetch(`tournaments/${id}`);
		return { props: { tournament } };
	} catch (e) {
		console.error(e);
		return { props: { item: null } };
	}
}

export default TournamentPage;
