// modules

// components
import ActualityArticle from '@/components/article/ActualityArticle';
import { manageFetch } from '@/hooks/useFetch';
import useNotifChecker from '@/hooks/useNotifChecker';

const ActualityPage = ({ actuality }) => {
	useNotifChecker('actuality', actuality.id);
	return <ActualityArticle actuality={actuality} />;
};

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { actuality } = await manageFetch(`actualities/${id}`);
		return { props: { actuality } };
	} catch (e) {
		console.error(e);
		return { props: { item: null } };
	}
}

export default ActualityPage;
