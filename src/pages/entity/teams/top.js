import { manageFetch } from '@/hooks/useFetch';
import TeamArticle from '@/components/article/TeamArticle';
import { redirect404 } from '@/pages/404';

const TopWeek = ({ team }) => <TeamArticle team={team} />;

export async function getServerSideProps() {
	try {
		const { team } = await manageFetch(`teams/top`);
		return { props: { team } };
	} catch (e) {
		console.error(e);
		return redirect404;
	}
}

export default TopWeek;
