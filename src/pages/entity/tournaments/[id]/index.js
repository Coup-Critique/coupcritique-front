// modules

// components
import TournamentArticle from '@/components/article/TournamentArticle';
import TournamentContainer from '@/containers/TournamentContainer';
import useNotifChecker from '@/hooks/useNotifChecker';
import { useGetParam } from '@/hooks/useGetParams';

const TournamentPage = ({ id }) => {
	useNotifChecker('tournament', id);
	return <TournamentContainer Component={TournamentArticle} />;
};

export async function getServerSideProps({ query }) {
	const { id } = query;

	return { props: { id } };
}

export default TournamentPage;
