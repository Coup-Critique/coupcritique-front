// modules
import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
// components
import useGetEntity from '../hooks/useGetEntity';

const UserContainer = ({ Component, ...props }) => {
	const { id } = useParams();
	const [result, loading] = useGetEntity(id, 'user', 'users');

	if (loading) {
		return <Loader active inline="centered" />;
	} else if (result) {
		return <Component result={result} {...props} />;
	} else {
		return null;
	}
};

export default UserContainer;
