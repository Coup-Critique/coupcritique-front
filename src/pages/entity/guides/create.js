// modules
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';
// components
import FormGuide from '@/components/forms/FormGuide';
import PageWrapper from '@/components/PageWrapper';
import useFetch from '@/hooks/useFetch';
//reducers
import { setGuideTags } from '@/reducers/guide_tags';
import { setTiers } from '@/reducers/tiers';

const GuideFormPage = ({ result = {}, update = false }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector(state => state.user);
	const guide_tags = useSelector(state => state.guide_tags);
	const tiers = useSelector(state => state.tiers);
	const [resultTags, loadTags] = useFetch();
	const [resultTiers, loadTiers, loadingTiers] = useFetch();

	const goBack = () => {
		router.replace(update ? `/entity/guides/${result.guide.id}` : '/entity/guides');
	};

	useEffect(() => {
		if (!guide_tags.length) {
			loadTags({ url: 'guide_tags' });
		}
		if (!Object.keys(tiers).length) {
			loadTiers({ url: 'tiers-select' });
		}
	}, []);

	useEffect(() => {
		if (resultTiers && resultTiers.success) {
			dispatch(setTiers(resultTiers.tiers));
		}
	}, [resultTiers]);

	useEffect(() => {
		if (resultTags && resultTags.success) {
			dispatch(setGuideTags(resultTags.tags));
		}
	}, [resultTags]);

	if (!user.loading && !user.is_modo) {
		return redirect('/404');
	}

	return (
		<PageWrapper
			title={
				update
					? 'Modifier le guide ' + (result.guide ? result.guide.title : '')
					: 'Ajouter un guide'
			}
		>
			{user.loading ? (
				<Loader active={true} inline="centered" />
			) : !user.token ? (
				redirect('/404')
			) : (
				<FormGuide
					guide={result.guide}
					tags={guide_tags}
					loadingTiers={loadingTiers}
					tiers={tiers}
					handleSubmited={goBack}
				/>
			)}
		</PageWrapper>
	);
};
export default GuideFormPage;
