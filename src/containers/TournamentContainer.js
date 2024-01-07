// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';

const TournamentContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [result, loading] = useGetEntityWithUser(id, 'tournament', 'tournaments');

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (result) {
		return <Component result={result} {...props} />;
	} else {
		return null;
	}
};

export default TournamentContainer;
