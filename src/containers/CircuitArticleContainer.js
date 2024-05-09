// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntityWithUser from '@/hooks/useGetEntityWithUser';

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
		return null;
	}
};

export default CircuitArticleContainer;
