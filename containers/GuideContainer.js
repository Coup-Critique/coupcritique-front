// modules
import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';

const GuideContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [guide, loading] = useGetEntityWithUser(id, 'guide', 'guides', props.guide);

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (guide) {
		return <Component {...props} guide={guide} />;
	} else {
		return null;
	}
};

export default GuideContainer;
