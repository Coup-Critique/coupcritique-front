// modules
import { useRef } from 'react';
import Link from 'next/link';
import { Icon } from 'semantic-ui-react';
import useDarkMode from '@/hooks/useDarkMode';
// components
import MainSearch from '@/components/forms/MainSearch';
import MetaData from '@/components/MetaData';
import ScrollReveal from '@/components/ScrollReveal';
import SectionActuality from '@/components/sections/SectionActuality';
import SectionAdsHome from '@/components/sections/SectionAdsHome';
import SectionTeams from '@/components/sections/SectionTeams';
import SectionTopUsages from '@/components/sections/SectionTopUsages';
import SectionWeeklyTeam from '@/components/sections/SectionWeeklyTeam';
import { manageFetch } from '@/hooks/useFetch';
// import Image from 'next/image';

// use default meta tags
const Home = props => {
	const scrollRef = useRef();
	const [darkMode] = useDarkMode();

	const scrollTo = e => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView();
		}
	};

	return (
		<div className="home">
			<MetaData
				title="Coup Critique | Votre référence en stratégie Pokémon"
				description="Le site de référence en stratégie Pokémon française. Vous pourrez y trouver et partager des équipes efficaces en combat classé sur des tiers Smogon comme l'OverUsed ou sur console avec le VGC et le BSS."
				image="keldeo-landorus.png"
			/>
			<section className="banner-title-home">
				<div className="container">
					<div className="row">
						<div className="col-12 col-xl-6 title-col">
							<h1>
								<strong>Coup Critique</strong>{' '}
								<span>
									Votre référence en stratégie Pokémon française.
									<br />
									Trouvez les meilleures équipes de la communauté.
									{/* TODO plus de texte */}
								</span>
							</h1>
							<MainSearch />
							<div className="down-arrow-wrapper">
								<Icon
									name="angle down"
									className={darkMode ? 'black' : 'text-white'}
									size="huge"
									onClick={scrollTo}
								/>
							</div>
						</div>
						<div className="col-12 col-xl-6 image-col">
							<ScrollReveal
								Tag="img"
								className="img-fluid"
								animation="zoomIn"
								src="/images/keldeo-landorus.png"
								alt="Démétéros et Keldeo"
								height="522"
								width="498"
							/>
						</div>
					</div>
				</div>
			</section>
			<SectionTeams sectionRef={scrollRef} />
			<section className="section-tournament">
				<div className="container">
					<div>
						<h2>Participer aux prochains tournois</h2>
					</div>
					<Link href="/entity/tournaments" className="btn btn-light">
						Voir les tournois
					</Link>
				</div>
			</section>
			<SectionAdsHome />
			<SectionActuality actualities={props.actualities} />
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

export const getStaticProps = async () => {
	try {
		const responses = await Promise.all([
			manageFetch(`actualities?maxLength=3`),
			manageFetch(`teams/top`),
			manageFetch(`videos?maxLength=1`),
			manageFetch(`guides?maxLength=1`),
			manageFetch(`tiers/usages/top`),
			manageFetch(`tiers/usages/top?official=true`),
			manageFetch(`tiers/usages/top?isDouble=true&official=true`),
		]);
		const { actualities } = responses[0];
		const { team } = responses[1];
		const { videos } = responses[2];
		const { guides } = responses[3];
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

export default Home;
