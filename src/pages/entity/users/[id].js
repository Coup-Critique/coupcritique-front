// modules

// components
import UserArticle from '@/components/article/UserArticle';
import UserContainer from '@/containers/UserContainer';
import { manageFetch } from '@/hooks/useFetch';

const UserPage = props => <UserContainer {...props} Component={UserArticle} />;

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { user, nbComments } = await manageFetch(`users/${id}`);
		const { teams } = await manageFetch(`teams/user/${user.id}`);
		return { props: { user, nbComments, teams } };
	} catch (e) {
		console.error(e);
		return { props: { item: null } };
	}
}

export default UserPage;
