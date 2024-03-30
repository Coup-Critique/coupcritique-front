// modules

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Loader } from 'semantic-ui-react';
// components
import Page404 from '@/pages/404';
import FormArticle from '@/components/forms/FormArticle';
import PageWrapper from '@/components/PageWrapper';
import { useRef } from 'react';

const CircuitTourFormPage = ({ circuitTour, update = false }) => {
	const router = useRouter();
	const reinitiRef = useRef();
	const user = useSelector(state => state.user);

	const goBack = () => {
		router.replace('/entity/circuit-tours' + (update ? `/${circuitTour.id}` : ''));
	};

	const handleReinit = e => reinitiRef.current.ref.current.click();

	if (user.loading || window === undefined) {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id || !user.is_modo) {
		return <Page404 />;
	}
	return (
		<PageWrapper
			title={
				update
					? 'Modifier le tournoi ' + (circuitTour ? circuitTour.title : '')
					: 'Ajouter une tournoi'
			}
			action={
				<Button
					icon="refresh"
					onClick={handleReinit}
					color="blue"
					content="Réinitialiser"
				/>
			}
			nofollow
		>
			<FormArticle
				entityName="circuit-tours"
				article={circuitTour}
				handleSubmited={goBack}
				reinitiRef={reinitiRef}
			/>
		</PageWrapper>
	);
};
export default CircuitTourFormPage;
