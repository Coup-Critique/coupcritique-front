// modules

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Loader, Placeholder } from 'semantic-ui-react';
// components
import Page404 from '@/pages/404';
import FormArticle from '@/components/forms/FormArticle';
import PageWrapper from '@/components/PageWrapper';
import { useRef } from 'react';

const addtionalFields = [
	{ name: 'startDate', type: 'date', label: 'Date de début' },
	{ name: 'endDate', type: 'date', label: 'Date de fin' },
	{ name: 'color', placeholder: '#000000', label: 'Couleur' },
];

const CircuitTourFormPage = ({ circuitTour, update = false }) => {
	const router = useRouter();
	const reinitiRef = useRef();
	const user = useSelector(state => state.user);

	const defaultGoBack = '/entity/circuit-tours' + (update ? `/${circuitTour.id}` : '');

	const goBack = () => router.replace(defaultGoBack);

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
					: 'Ajouter un tournoi'
			}
			goingBack={defaultGoBack}
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
				addtionalFields={addtionalFields}
				addtionalWidths={3}
			/>
		</PageWrapper>
	);
};
export default CircuitTourFormPage;
