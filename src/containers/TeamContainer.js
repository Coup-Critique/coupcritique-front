// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';

const TeamContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [team, loading] = useGetEntityWithUser(id, 'team', 'teams', props.team);

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (team) {
		return <Component {...props} team={team} />;
	} else {
		return null;
	}
};

export default TeamContainer;
