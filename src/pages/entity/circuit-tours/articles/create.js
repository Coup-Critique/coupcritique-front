// modules
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Loader } from 'semantic-ui-react';
// components
import Page404 from '@/pages/404';
import FormArticle from '@/components/forms/FormArticle';
import PageWrapper from '@/components/PageWrapper';

const addtionalFields = [
	{ name: 'tour', placeholder: 'Nom du tournoi', label: 'Tournoi du Circuit' },
];

const CircuitArticleFormPage = ({ circuitArticle, update = false }) => {
	const router = useRouter();
	const reinitiRef = useRef();
	const user = useSelector(state => state.user);
	// init values
	const article = useMemo(
		() =>
			circuitArticle
				? { ...circuitArticle, tour: circuitArticle.tour?.name }
				: undefined,
		[circuitArticle]
	);

	const defaultGoBack =
		'/entity/circuit-tours/articles' + (update ? `/${circuitArticle.id}` : '');

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
					? "Modifier l'article " + (circuitArticle ? circuitArticle.title : '')
					: 'Ajouter un article'
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
				entityName="circuit-articles"
				path="circuit-tours/articles"
				article={article}
				handleSubmited={goBack}
				reinitiRef={reinitiRef}
				addtionalFields={addtionalFields}
			/>
		</PageWrapper>
	);
};
export default CircuitArticleFormPage;
