
import TeamArticle from '@/components/article/TeamArticle';
import TeamContainer from '@/containers/TeamContainer';
import useNotifChecker from '@/hooks/useNotifChecker';
import { useGetParam } from '@/hooks/useGetParams';

const TeamPage = ({ id }) => {
	useNotifChecker('team', id);
	return <TeamContainer Component={TeamArticle} />;
};

export async function getServerSideProps({ query }) {
	const { id } = query;

	return { props: { id } };
}

export default TeamPage;
