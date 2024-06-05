import TeamArticle from '@/components/article/TeamArticle';
import TeamContainer from '@/containers/TeamContainer';
import useNotifChecker from '@/hooks/useNotifChecker';
import { manageFetch } from '@/hooks/useFetch';
import { rmUndefined } from '@/functions';

const TeamPage = ({ team }) => {
	useNotifChecker('team', team?.id);
	return <TeamContainer Component={TeamArticle} team={team} />;
};

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { team } = await manageFetch(`teams/${id}`);
		return { props: rmUndefined({ team }) };
	} catch (e) {
		console.error(e);
		return { props: { team: null } };
	}
}

export default TeamPage;
