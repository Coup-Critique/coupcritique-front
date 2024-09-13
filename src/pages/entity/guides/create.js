// modules
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Loader } from 'semantic-ui-react';
// components
import FormGuide from '@/components/forms/FormGuide';
import PageWrapper from '@/components/PageWrapper';
import useFetch, { manageFetch } from '@/hooks/useFetch';
//reducers
import { setGuideTags } from '@/reducers/guide_tags';
import { setTiers as _setTiers } from '@/reducers/tiers';
import LoadingPage from '@/pages/loading';
import useActions from '@/hooks/useActions';

const defaultObject = {};

const GuideFormPage = props => {
	const dispatch = useDispatch();
	const router = useRouter();
	const reinitiRef = useRef();
	const user = useSelector(state => state.user);
	const guide_tags = useSelector(state => props.tags || state.guide_tags);
	const tiers = useSelector(state => props.tiers || state.tiers);
	const { guide = defaultObject, update = false } = props;
	const [setTiers, setTags] = useActions(dispatch, [_setTiers, setGuideTags]);
	const [resultTiers, loadTiers, loadingTiers] = useFetch();
	const [resultTags, loadTags, loadingTags] = useFetch();

	useEffect(() => {
		if (!Object.keys(tiers).length) {
			if (props.tiers) {
				dispatch(setTiers(props.tiers));
			} else {
				loadTiers({ url: 'tiers-select' });
			}
		}
		if (!guide_tags.length) {
			if (props.tags) {
				dispatch(setTags(props.tags));
			} else {
				loadTags({ url: 'tags' });
			}
		}
	}, [guide.id]);

	useEffect(() => {
		if (resultTiers && resultTiers.success) {
			dispatch(setTiers(resultTiers.tiers));
		}
	}, [resultTiers]);

	useEffect(() => {
		if (resultTags && resultTags.success) {
			dispatch(setTags(resultTags.tags));
		}
	}, [resultTags]);

	const defaultGoBack = update ? `/entity/guides/${guide.id}` : '/entity/guides';

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
					? 'Modifier le guide ' + (guide ? guide.title : '')
					: 'Ajouter un guide'
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
		>
			<FormGuide
				guide={guide}
				tags={guide_tags}
				tiers={tiers}
				loadingTiers={loadingTiers}
				handleSubmited={goBack}
				reinitiRef={reinitiRef}
			/>
		</PageWrapper>
	);
};

export async function getServerSideProps() {
	try {
		const { tags } = await manageFetch(`guide_tags`);
		const { tiers } = await manageFetch('tiers-select');
		return { props: { tags, tiers } };
	} catch (e) {
		console.error(e);
		return { props: {} };
	}
}

export default GuideFormPage;
