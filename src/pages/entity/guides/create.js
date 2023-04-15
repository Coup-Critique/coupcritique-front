// modules
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { Loader } from 'semantic-ui-react';
// components
import FormGuide from '../../forms/FormGuide';
import PageWrapper from '../../PageWrapper';
import useFetch from '../../../hooks/useFetch';

//reducers
import { setGuideTags } from '../../../reducers/guide_tags';
import { setTiers } from '../../../reducers/tiers';

const GuideFormPage = ({ result = {}, update = false }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { user, guide_tags } = useSelector(state => state);
	const tiers = useSelector(state => state.tiers);
	const [resultTags, loadTags] = useFetch();
	const [resultTiers, loadTiers, loadingTiers] = useFetch();

	const goBack = () => {
		history.replace(update ? `/entity/guides/${result.guide.id}` : '/entity/guides');
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
		return <Redirect to="/404" />;
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
				<Redirect to="/404" />
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
