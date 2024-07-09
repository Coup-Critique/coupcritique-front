// modules
import MetaData from '@/components/MetaData';
import SectionActuality from '@/components/sections/SectionActuality';
import SectionAdsHome from '@/components/sections/SectionAdsHome';
import SectionTopUsages from '@/components/sections/SectionTopUsages';
import SectionWeeklyTeam from '@/components/sections/SectionWeeklyTeam';
import SectionCircuitCalendar from '@/components/sections/SectionCircuitCalendar';
import { manageFetch } from '@/hooks/useFetch';
import CardHomeTitle from '@/components/cards/CardHomeTitle';
import CardFindTeam from '@/components/cards/CardFindTeam';
import CardProposeTeam from '@/components/cards/CardProposeTeam';
import CardCircuit from '@/components/cards/CardCircuit';

// use default meta tags
const Home = props => {
	return (
		<div className="home">
			<MetaData />
			<section className="title-section">
				<div className="grid">
					<div className="one title-col">
						<CardHomeTitle />
					</div>
					<div className="two">
						<CardFindTeam />
					</div>
					<div className="three">
						<CardProposeTeam />
					</div>
					<div className="four">
						<CardCircuit currentTours={props.currentTours} />
					</div>
				</div>
			</section>
			<SectionAdsHome />
			<SectionActuality actualities={props.actualities} />
			<SectionCircuitCalendar calendar={props.calendar} />
			<SectionWeeklyTeam team={props.team} />
			<SectionAdsHome />
			<SectionTopUsages
				usages={props.usages}
				guides={props.guides}
				videos={props.videos}
			/>
		</div>
	);
};

export const getServerSideProps = async () => {
	try {
		const responses = await Promise.all([
			manageFetch(`teams/top`),
			manageFetch(`actualities?maxLength=3`),
			manageFetch(`guides?maxLength=3`),
			manageFetch(`videos?maxLength=2`),
			manageFetch(`tiers/usages/top`),
			manageFetch(`tiers/usages/top?official=true`),
			manageFetch(`tiers/usages/top?isDouble=true&official=true`),
			manageFetch(`circuit-tours/calendar`),
		]);
		const { team } = responses[0];
		const { actualities } = responses[1];
		const { guides } = responses[2];
		const { videos } = responses[3];
		const { tier: ou, usage: usageOu } = responses[4];
		const { tier: bss, usage: usageBss } = responses[5];
		const { tier: vgc, usage: usageVgc } = responses[6];
		const { calendar, currentTours } = responses[7];
		const props = {
			actualities,
			team: team || null,
			videos,
			guides,
			usages: [],
			calendar,
			currentTours,
		};
		if (ou) {
			props.usages.push({ tier: ou, usage: usageOu });
		}
		if (bss) {
			props.usages.push({ tier: bss, usage: usageBss });
		}
		if (vgc) {
			props.usages.push({ tier: vgc, usage: usageVgc });
		}
		return { props };
	} catch (e) {
		console.error(e);
		return { props: {} };
	}
};

export default Home;
