// modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';
// components
import FormGuide from '@/components/forms/FormGuide';
import PageWrapper from '@/components/PageWrapper';
import { manageFetch } from '@/hooks/useFetch';
//reducers
import { setGuideTags } from '@/reducers/guide_tags';
import { setTiers } from '@/reducers/tiers';
import Page404 from '@/pages/404';

const GuideFormPage = props => {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector(state => state.user);
	const guide_tags = useSelector(state => props.tags || state.guide_tags);
	const tiers = useSelector(state => props.tiers || state.tiers);
	const { guide, update = false } = props;

	const goBack = () => {
		router.replace(update ? `/entity/guides/${guide.id}` : '/entity/guides');
	};

	useEffect(() => {
		if (!Object.keys(tiers).length) {
			dispatch(setTiers(props.tiers));
		}
		if (!guide_tags.length) {
			dispatch(setGuideTags(props.tags));
		}
	}, []);

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
					? 'Modifier le guide ' + (guide ? guide.title : '')
					: 'Ajouter un guide'
			}
		>
			<FormGuide
				guide={guide}
				tags={guide_tags}
				tiers={tiers}
				handleSubmited={goBack}
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
