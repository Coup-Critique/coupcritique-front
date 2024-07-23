// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';
import LoadingPage from '@/pages/loading';

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
		return <Component {...props} article={tournament} tournament={tournament} />;
	} else {
		return <LoadingPage />;
	}
};

export default TournamentContainer;
