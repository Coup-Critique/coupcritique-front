// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';
import LoadingPage from '@/pages/loading';

const UserContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [user, loading] = useGetEntityWithUser(id, 'user', 'users', props.user);

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (user) {
		return <Component {...props} user={user} />;
	} else {
		return <LoadingPage />;
	}
};

export default UserContainer;
