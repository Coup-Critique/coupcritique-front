// modules
import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';
import Page404 from '@/pages/404';

const GuideContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [guide, loading] = useGetEntityWithUser(id, 'guide', 'guides', props.guide);

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (guide) {
		return <Component {...props} article={guide} guide={guide} />;
	} else {
		return <Page404 />;
	}
};

export default GuideContainer;
