// modules
import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';
import LoadingPage from '@/pages/loading';

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
		return <Component {...props} actuality={actuality} article={actuality} />;
	} else {
		return <LoadingPage />;
	}
};

export default ActualityContainer;
