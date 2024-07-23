// modules

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Loader } from 'semantic-ui-react';
// components
import LoadingPage from '@/pages/loading';
import PageWrapper from '@/components/PageWrapper';
import FormArticle from '@/components/forms/FormArticle';
import { useRef } from 'react';

const TournamentFormPage = ({ tournament, update = false }) => {
	const router = useRouter();
	const reinitiRef = useRef();
	const user = useSelector(state => state.user);

	const defaultGoBack = update
		? `/entity/tournaments/${tournament.id}`
		: '/entity/tournaments';

	const goBack = () => router.replace(defaultGoBack);

	const handleReinit = e => reinitiRef.current.ref.current.click();

	if (user.loading || typeof window === 'undefined') {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id || !user.is_modo) {
		return <LoadingPage />;
	}
	return (
		<PageWrapper
			min
			title={
				update
					? 'Modifier le tournoi ' + (tournament ? tournament.title : '')
					: 'Ajouter un tournoi'
			}
			nofollow
			goingBack={defaultGoBack}
			action={
				<Button
					icon="refresh"
					onClick={handleReinit}
					color="blue"
					content="Réinitialiser"
				/>
			}
		>
			<FormArticle
				article={tournament}
				entityName="tournaments"
				handleSubmited={goBack}
				reinitiRef={reinitiRef}
			/>
		</PageWrapper>
	);
};
export default TournamentFormPage;
