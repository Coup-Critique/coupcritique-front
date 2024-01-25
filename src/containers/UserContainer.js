// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntity from '@/hooks/useGetEntity';

const UserContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [user, loading] = useGetEntity(id, 'user', 'users', props.user);

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (user) {
		return <Component user={user} {...props} />;
	} else {
		return null;
	}
};

export default UserContainer;
