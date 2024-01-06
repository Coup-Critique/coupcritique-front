// modules
import React from 'react';
// components
import ActualityContainer from '@/containers/ActualityContainer';
import ActualityFormPage from '@/pages/entity/actualities/create';

const ActualityUpdatePage = () => (
	<ActualityContainer Component={ActualityFormPage} update />
);

export default ActualityUpdatePage;
