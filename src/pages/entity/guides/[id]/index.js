// modules

// components
import GuideArticle from '@/components/article/GuideArticle';
import { manageFetch } from '@/hooks/useFetch';
import useNotifChecker from '@/hooks/useNotifChecker';

const GuidePage = ({ guide }) => {
	useNotifChecker('guide', guide.id);
	return <GuideArticle guide={guide} />;
};

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { guide } = await manageFetch(`guides/${id}`);
		return { props: { guide } };
	} catch (e) {
		console.error(e);
		return { props: { item: null } };
	}
}

export default GuidePage;
