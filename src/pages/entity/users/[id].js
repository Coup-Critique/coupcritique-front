// modules

// components
import UserArticle from '@/components/article/UserArticle';
import UserContainer from '@/containers/UserContainer';
import { rmUndefined } from '@/functions';
import { manageFetch } from '@/hooks/useFetch';
import { redirect404 } from '@/pages/404';

const UserPage = props => <UserContainer {...props} Component={UserArticle} />;

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { user, nbComments } = await manageFetch(`users/${id}`);
		const { teams } = await manageFetch(`teams/user/${user.id}`);
		const { players, circuitTours } = await manageFetch(`players/user/${user.id}`);
		return { props: rmUndefined({ user, nbComments, teams, players, circuitTours }) };
	} catch (e) {
		console.error(e);
		return redirect404;
	}
}

export default UserPage;
