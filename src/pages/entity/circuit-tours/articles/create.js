// modules

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Loader, Placeholder } from 'semantic-ui-react';
// components
import Page404 from '@/pages/404';
import FormArticle from '@/components/forms/FormArticle';
import PageWrapper from '@/components/PageWrapper';
import { useRef } from 'react';

const CircuitArticleFormPage = ({ circuitArticle, update = false }) => {
	const router = useRouter();
	const reinitiRef = useRef();
	const user = useSelector(state => state.user);

	const goBack = () => {
		router.replace(
			'/entity/circuit-tours/articles' + (update ? `/${circuitArticle.id}` : '')
		);
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
					? "Modifier l'article " + (circuitArticle ? circuitArticle.title : '')
					: 'Ajouter un article'
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
				entityName="circuit-articles"
				path="circuit-tours/articles"
				article={circuitArticle}
				handleSubmited={goBack}
				reinitiRef={reinitiRef}
				addtionalWidths={3}
			/>
		</PageWrapper>
	);
};
export default CircuitArticleFormPage;
