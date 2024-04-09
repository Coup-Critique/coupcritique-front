// modules
import SectionActuality from '@/components/sections/SectionActuality';
import SectionAdsHome from '@/components/sections/SectionAdsHome';
import SectionTopUsages from '@/components/sections/SectionTopUsages';
import SectionWeeklyTeam from '@/components/sections/SectionWeeklyTeam';
import { manageFetch } from '@/hooks/useFetch';
import CardHomeTitle from '@/components/cards/CardHomeTitle';
import CardFindTeam from '@/components/cards/CardFindTeam';
import CardProposeTeam from '@/components/cards/CardProposeTeam';
import CardCircuit from '@/components/cards/CardCircuit';
import { ISR, SSG } from '@/constants/methods';

const getData = async () => {
	try {
		const responses = await Promise.all([
			manageFetch(`teams/top`, ISR),
			manageFetch(`actualities?maxLength=3`, ISR),
			manageFetch(`guides?maxLength=3`, ISR),
			manageFetch(`videos?maxLength=2`, ISR),
			manageFetch(`tiers/usages/top`, SSG),
			manageFetch(`tiers/usages/top?official=true`, SSG),
			manageFetch(`tiers/usages/top?isDouble=true&official=true`, SSG),
		]);
		const { team } = responses[0];
		const { actualities } = responses[1];
		const { guides } = responses[2];
		const { videos } = responses[3];
		const { tier: ou, usage: usageOu } = responses[4];
		const { tier: bss, usage: usageBss } = responses[5];
		const { tier: vgc, usage: usageVgc } = responses[6];
		const props = { actualities, team: team || null, videos, guides, usages: [] };
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

export default async function Home() {
	const data = await getData();
	return (
		<div className="home">
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
						<CardCircuit />
					</div>
				</div>
			</section>
			<SectionAdsHome />
			<SectionActuality actualities={data.actualities} />
			<SectionWeeklyTeam team={data.team} />
			<SectionAdsHome />
			<SectionTopUsages
				usages={data.usages}
				guides={data.guides}
				videos={data.videos}
			/>
		</div>
	);
}
