// modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';
// components
import FormActuality from '@/components/forms/FormActuality';
import PageWrapper from '@/components/PageWrapper';
import useFetch from '@/hooks/useFetch';
import { setActualityTags } from '@/reducers/actuality_tags';
import Page404 from '@/pages/404';

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

	if (user.loading) {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id || !user.is_modo) {
		return <Page404 />;
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
			<FormActuality
				actuality={result.actuality}
				tags={actuality_tags}
				handleSubmited={goBack}
			/>
		</PageWrapper>
	);
};
export default ActualityFormPage;
