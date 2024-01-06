// modules
import React from 'react';
// components
import TournamentArticle from '@/components/article/TournamentArticle';
import TournamentContainer from '@/containers/TournamentContainer';
import useNotifChecker from '@/hooks/useNotifChecker';
import { useGetParam } from '@/hooks/useGetParams';

const TournamentPage = () => {
	const id = useGetParam('id');
	useNotifChecker('tournament', id);
	return <TournamentContainer Component={TournamentArticle} />;
};

export default TournamentPage;
