// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';
import LoadingPage from '@/pages/loading';

const CircuitTourContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [circuitTour, loading] = useGetEntityWithUser(
		id,
		'circuitTour',
		'circuit-tours',
		props.circuitTour
	);

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (circuitTour) {
		return <Component {...props} article={circuitTour} circuitTour={circuitTour} />;
	} else {
		return <LoadingPage />;
	}
};

export default CircuitTourContainer;
