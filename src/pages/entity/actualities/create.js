// modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';
// components
import FormActuality from '@/components/forms/FormActuality';
import PageWrapper from '@/components/PageWrapper';
import { manageFetch } from '@/hooks/useFetch';
import { setActualityTags } from '@/reducers/actuality_tags';
import Page404 from '@/pages/404';
import useActions from '@/hooks/useActions';

const ActualityFormPage = ({ actuality, tags, update = false }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector(state => state.user);
	const actuality_tags = useSelector(state => state.actuality_tags || tags);
	const [setTags] = useActions(dispatch, [setActualityTags]);

	useEffect(() => {
		if (tags?.length) {
			setTags(tags);
		}
	}, []);

	const goBack = () => {
		router.replace(
			update ? `/entity/actualities/${actuality.id}` : '/entity/actualities'
		);
	};

	if (user.loading || typeof window === 'undefined') {
		return <Loader active={true} inline="centered" />;
	}
	if (!user.id || !user.is_modo) {
		return <Page404 />;
	}
	return (
		<PageWrapper
			title={
				update
					? "Modifier l'actualité " + (actuality ? actuality.title : '')
					: 'Ajouter une actualité'
			}
			nofollow
		>
			<FormActuality
				actuality={actuality}
				tags={actuality_tags}
				handleSubmited={goBack}
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
