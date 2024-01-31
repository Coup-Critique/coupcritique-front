// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntity from '@/hooks/useGetEntity';

/** @deprecated */
const TierContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [result, loading] = useGetEntity(id, 'tier', 'tiers');

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (result) {
		return <Component result={result} {...props} />;
	} else {
		return null;
	}
};

export default TierContainer;
