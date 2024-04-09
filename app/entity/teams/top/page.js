import { manageFetch } from '@/hooks/useFetch';
import TeamArticle from '@/components/article/TeamArticle';

const TopWeek = ({ team }) => <TeamArticle team={team} />;

export async function getServerSideProps() {
	try {
		const { team } = await manageFetch(`teams/top`);
		return { props: { team } };
	} catch (e) {
		console.error(e);
		return { props: { team: null } };
	}
}

export default TopWeek;
