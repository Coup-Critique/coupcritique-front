// modules
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { Loader } from 'semantic-ui-react';
// components
import FormTournament from '@/components/forms/FormTournament';
import PageWrapper from '@/components/PageWrapper';

const TournamentFormPage = ({ result = {}, update = false }) => {
	const history = useHistory();
	const user = useSelector(state => state.user);

	const goBack = () => {
		history.replace(
			update ? `/entity/tournaments/${result.tournament.id}` : '/entity/tournaments'
		);
	};

	if (!user.loading && !user.is_modo) {
		return <Redirect to="/404" />;
	}

	return (
		<PageWrapper
			title={
				update
					? 'Modifier le tournoi '
					  + (result.tournament ? result.tournament.title : '')
					: 'Ajouter une tournoi'
			}
			nofollow
		>
			{user.loading ? (
				<Loader active={true} inline="centered" />
			) : !user.token ? (
				<Redirect to="/404" />
			) : (
				<FormTournament tournament={result.tournament} handleSubmited={goBack} />
			)}
		</PageWrapper>
	);
};
export default TournamentFormPage;
