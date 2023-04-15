// modules
import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntity from '../hooks/useGetEntity';

const AbilityContainer = ({ Component, ...props }) => {
	const { id } = useParams();
	const [result, loading] = useGetEntity(id, 'ability', 'abilities');

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (result) {
		return <Component result={result} {...props} />;
	} else {
		return null;
	}
};

export default AbilityContainer;
