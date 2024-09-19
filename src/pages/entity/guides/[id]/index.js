// modules

// components
import ArticleArticle from '@/components/article/ArticleArticle';
import GuideContainer from '@/containers/GuideContainer';
import { manageFetch } from '@/hooks/useFetch';
import useNotifChecker from '@/hooks/useNotifChecker';
import { redirect404 } from '@/pages/404';

const GuidePage = ({ guide }) => {
	useNotifChecker('guide', guide.id);
	return (
		<GuideContainer Component={ArticleArticle} guide={guide} entityName="guides" />
	);
};

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { guide } = await manageFetch(`guides/${id}`);
		return { props: { guide } };
	} catch (e) {
		console.error(e);
		return redirect404;
	}
}

export default GuidePage;
