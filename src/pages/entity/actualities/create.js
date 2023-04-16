// modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { Loader } from 'semantic-ui-react';
// components
import FormActuality from '@/components/forms/FormActuality';
import PageWrapper from '@/components/PageWrapper';
import useFetch from '@/hooks/useFetch';
import { setActualityTags } from '@/reducers/actuality_tags';

const ActualityFormPage = ({ result = {}, update = false }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { user, actuality_tags } = useSelector(state => state);
	const [resultTags, loadTags] = useFetch();

	const goBack = () => {
		history.replace(
			update ? `/entity/actualities/${result.actuality.id}` : '/entity/actualities'
		);
	};

	useEffect(() => {
		if (!actuality_tags.length) {
			loadTags({ url: 'actuality_tags' });
		}
	}, []);

	useEffect(() => {
		if (resultTags && resultTags.success) {
			dispatch(setActualityTags(resultTags.tags));
		}
	}, [resultTags]);

	if (!user.loading && !user.is_modo) {
		return <Redirect to="/404" />;
	}

	return (
		<PageWrapper
			title={
				update
					? "Modifier l'actualité "
					  + (result.actulity ? result.actulity.title : '')
					: 'Ajouter une actualité'
			}
			nofollow
		>
			{user.loading ? (
				<Loader active={true} inline="centered" />
			) : !user.token ? (
				<Redirect to="/404" />
			) : (
				<FormActuality
					actuality={result.actuality}
					tags={actuality_tags}
					handleSubmited={goBack}
				/>
			)}
		</PageWrapper>
	);
};
export default ActualityFormPage;
