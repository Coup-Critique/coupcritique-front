// modules
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Loader } from 'semantic-ui-react';
// components
import FormGuide from '@/components/forms/FormGuide';
import PageWrapper from '@/components/PageWrapper';
import { manageFetch } from '@/hooks/useFetch';
//reducers
import { setGuideTags } from '@/reducers/guide_tags';
import { setTiers as _setTiers } from '@/reducers/tiers';
import Page404 from '@/pages/404';
import useActions from '@/hooks/useActions';

const GuideFormPage = props => {
	const dispatch = useDispatch();
	const router = useRouter();
	const reinitiRef = useRef();
	const user = useSelector(state => state.user);
	const guide_tags = useSelector(state => props.tags || state.guide_tags);
	const tiers = useSelector(state => props.tiers || state.tiers);
	const { guide, update = false } = props;
	const [setTiers, setTags] = useActions(dispatch, [_setTiers, setGuideTags]);

	useEffect(() => {
		if (!Object.keys(tiers).length) {
			setTiers(props.tiers);
		}
		if (!guide_tags.length) {
			setTags(props.tags);
		}
	}, [guide.id]);

	const goBack = () => {
		router.replace(update ? `/entity/guides/${guide.id}` : '/entity/guides');
	};

	const handleReinit = e => reinitiRef.current.ref.current.click();

	if (user.loading || typeof window === 'undefined') {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id || !user.is_modo) {
		return <Page404 />;
	}
	return (
		<PageWrapper
			min
			title={
				update
					? 'Modifier le guide ' + (guide ? guide.title : '')
					: 'Ajouter un guide'
			}
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
