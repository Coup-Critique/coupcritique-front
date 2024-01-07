// modules

// components
import ActualityArticle from '@/components/article/ActualityArticle';
import ActualityContainer from '@/containers/ActualityContainer';
import useNotifChecker from '@/hooks/useNotifChecker';
import { useGetParam } from '@/hooks/useGetParams';

const ActualityPage = ({ id }) => {
	useNotifChecker('actuality', id);
	return <ActualityContainer Component={ActualityArticle} />;
};

export async function getServerSideProps({ query }) {
	const { id } = query;

	return { props: { id } };
}

export default ActualityPage;
