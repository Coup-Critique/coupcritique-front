// modules

// components
import GuideArticle from '@/components/article/GuideArticle';
import GuideContainer from '@/containers/GuideContainer';
import useNotifChecker from '@/hooks/useNotifChecker';
import { useGetParam } from '@/hooks/useGetParams';

const GuidePage = ({ id }) => {
	useNotifChecker('guide', id);
	return <GuideContainer Component={GuideArticle} />;
};

export async function getServerSideProps({ query }) {
	const { id } = query;

	return { props: { id } };
}

export default GuidePage;
