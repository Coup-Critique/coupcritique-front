// modules

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';
// components
import Page404 from '@/pages/404';
import FormTournament from '@/components/forms/FormTournament';
import PageWrapper from '@/components/PageWrapper';

const TournamentFormPage = ({ tournament, update = false }) => {
	const router = useRouter();
	const user = useSelector(state => state.user);

	const goBack = () => {
		router.replace(
			update ? `/entity/tournaments/${tournament.id}` : '/entity/tournaments'
		);
	};

	if (user.loading) {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id || !user.is_modo) {
		return <Page404 />;
	}
	return (
		<PageWrapper
			title={
				update
					? 'Modifier le tournoi ' + (tournament ? tournament.title : '')
					: 'Ajouter une tournoi'
			}
			nofollow
		>
			<FormTournament tournament={tournament} handleSubmited={goBack} />
		</PageWrapper>
	);
};
export default TournamentFormPage;
