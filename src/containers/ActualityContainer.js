// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';

const ActualityContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [actuality, loading] = useGetEntityWithUser(
		id,
		'actuality',
		'actualities',
		props.actuality
	);

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (actuality) {
		return <Component {...props} actuality={actuality} />;
	} else {
		return null;
	}
};

export default ActualityContainer;
