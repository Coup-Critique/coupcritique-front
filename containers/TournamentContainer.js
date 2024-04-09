// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';

const TournamentContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [tournament, loading] = useGetEntityWithUser(
		id,
		'tournament',
		'tournaments',
		props.tournament
	);

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (tournament) {
		return <Component {...props} tournament={tournament} />;
	} else {
		return null;
	}
};

export default TournamentContainer;
