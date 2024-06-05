// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';
import Page404 from '@/pages/404';

const CircuitArticleContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [circuitArticle, loading] = useGetEntityWithUser(
		id,
		'circuitArticle',
		'circuit-articles',
		props.circuitArticle
	);

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (circuitArticle) {
		return (
			<Component
				{...props}
				article={circuitArticle}
				circuitArticle={circuitArticle}
			/>
		);
	} else {
		return <Page404 />;
	}
};

export default CircuitArticleContainer;
