// modules
import React from 'react';
// components
import GuideArticle from '@/components/article/GuideArticle';
import GuideContainer from '@/containers/GuideContainer';
import useNotifChecker from '@/hooks/useNotifChecker';
import { useGetParam } from '@/hooks/useGetParams';

const GuidePage = () => {
	const id = useGetParam('id');
	useNotifChecker('guide', id);
	return <GuideContainer Component={GuideArticle} />;
};

export default GuidePage;
