// modules
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Loader } from 'semantic-ui-react';
// components
import FormArticle from '@/components/forms/FormArticle';
import PageWrapper from '@/components/PageWrapper';
import useFetch, { manageFetch } from '@/hooks/useFetch';
import { setActualityTags } from '@/reducers/actuality_tags';
import LoadingPage from '@/pages/loading';
import useActions from '@/hooks/useActions';

const defaultObject = {};

const ActualityFormPage = ({ actuality = defaultObject, tags, update = false }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const reinitiRef = useRef();
	const user = useSelector(state => state.user);
	const actuality_tags = useSelector(state => state.actuality_tags || tags);
	const [setTags] = useActions(dispatch, [setActualityTags]);
	const [resultTags, loadTags, loadingTags] = useFetch();

	useEffect(() => {
		if (tags?.length) {
			setTags(tags);
		} else {
			loadTags({ url: 'actuality_tags' });
		}
	}, [actuality.id]);

	useEffect(() => {
		if (resultTags && resultTags.success) {
			dispatch(setTags(resultTags.tags));
		}
	}, [resultTags]);

	const defaultGoBack = update
		? `/entity/actualities/${actuality.id}`
		: '/entity/actualities';

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
					? "Modifier l'actualité " + (actuality ? actuality.title : '')
					: 'Ajouter une actualité'
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
				article={actuality}
				entityName="actualities"
				tags={actuality_tags}
				handleSubmited={goBack}
				reinitiRef={reinitiRef}
			/>
		</PageWrapper>
	);
};

export async function getServerSideProps() {
	try {
		const { tags } = await manageFetch(`actuality_tags`);
		return { props: { tags } };
	} catch (e) {
		console.error(e);
		return { props: {} };
	}
}

export default ActualityFormPage;
