// modules
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import useDarkMode from '@/hooks/useDarkMode';
import Ad from '../Ad';
// components
import MainSearch from '@/components/forms/MainSearch';
import MetaData from '../MetaData';
import ScrollReveal from '../ScrollReveal';
import SectionActuality from '@/components/sections/SectionActuality';
import SectionAdsHome from '@/components/sections/SectionAdsHome';
import SectionTeams from '@/components/sections/SectionTeams';
import SectionTopUsages from '@/components/sections/SectionTopUsages';
import SectionWeeklyTeam from '@/components/sections/SectionWeeklyTeam';

// use default meta tags
const Home = () => {
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
					<Link to="/entity/tournaments" className="btn btn-light">
						Voir les tournois
					</Link>
				</div>
			</section>
			<SectionAdsHome />
			<SectionActuality />
			<SectionWeeklyTeam />
			<SectionAdsHome />
			<SectionTopUsages />
		</div>
	);
};

export default Home;
