// modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import { Loader } from 'semantic-ui-react';
// components
import FormActuality from '@/components/forms/FormActuality';
import PageWrapper from '@/components/PageWrapper';
import useFetch from '@/hooks/useFetch';
import { setActualityTags } from '@/reducers/actuality_tags';

const ActualityFormPage = ({ result = {}, update = false }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector(state => state.user);
	const actuality_tags = useSelector(state => state.actuality_tags);
	const [resultTags, loadTags] = useFetch();

	const goBack = () => {
		router.replace(
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
		return redirect('/404');
	}

	return (
		<PageWrapper
			title={
				update
					? "Modifier l'actualité " +
					  (result.actulity ? result.actulity.title : '')
					: 'Ajouter une actualité'
			}
			nofollow
		>
			{user.loading ? (
				<Loader active={true} inline="centered" />
			) : !user.token ? (
				redirect('/404')
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
