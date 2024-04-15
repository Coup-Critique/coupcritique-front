// modules

// components
import ArticleArticle from '@/components/article/ArticleArticle';
import ActualityContainer from '@/containers/ActualityContainer';
import { rmUndefined } from '@/functions';
import { manageFetch } from '@/hooks/useFetch';
import useNotifChecker from '@/hooks/useNotifChecker';

const ActualityPage = ({ actuality }) => {
	useNotifChecker('actuality', actuality.id);
	return <ActualityContainer Component={ArticleArticle} actuality={actuality} entityName="actualities" />;
};

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { actuality } = await manageFetch(`actualities/${id}`);
		return { props: rmUndefined({ actuality }) };
	} catch (e) {
		console.error(e);
		return { props: { actuality: null } };
	}
}

export default ActualityPage;
