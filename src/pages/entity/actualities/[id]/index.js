// modules
import React from 'react';
// components
import ActualityArticle from '@/components/article/ActualityArticle';
import ActualityContainer from '@/containers/ActualityContainer';
import useNotifChecker from '@/hooks/useNotifChecker';
import { useGetParam } from '@/hooks/useGetParams';

const ActualityPage = () => {
	const id = useGetParam('id');
	useNotifChecker('actuality', id);
	return <ActualityContainer Component={ActualityArticle} />;
};

export default ActualityPage;
