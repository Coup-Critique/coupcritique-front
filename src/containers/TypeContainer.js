// modules

import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntity from '@/hooks/useGetEntity';

/** @deprecated */
const TypeContainer = ({ Component, ...props }) => {
	const id = useGetParam('id');
	const [result, loading] = useGetEntity(id, 'type', 'types');

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (result) {
		return <Component result={result} {...props} />;
	} else {
		return null;
	}
};

export default TypeContainer;
