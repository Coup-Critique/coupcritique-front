import React from 'react';
import TeamArticle from '@/components/article/TeamArticle';
import TeamContainer from '@/containers/TeamContainer';
import useNotifChecker from '@/hooks/useNotifChecker';
import { useGetParam } from '@/hooks/useGetParams';

const TeamPage = () => {
	const id = useGetParam('id');
	useNotifChecker('team', id);
	return <TeamContainer Component={TeamArticle} />;
};
export default TeamPage;
