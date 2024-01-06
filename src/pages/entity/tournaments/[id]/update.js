// modules
import React from 'react';
// components
import TournamentContainer from '@/containers/TournamentContainer';
import TournamentFormPage from '@/pages/entity/tournaments/create';

const TournamentUpdatePage = () => (
	<TournamentContainer Component={TournamentFormPage} update />
);

export default TournamentUpdatePage;
