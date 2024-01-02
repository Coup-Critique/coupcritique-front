import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import useDarkMode from '@/hooks/useDarkMode';
import ScrollReveal from '@/components/ScrollReveal';
import gens from '@/constants/gens.json';
import { IMG_VERSION } from '@/constants/img';

const defaultGen = gens.length && gens[0] ? gens[0].value : 1;

const SectionTeams = ({ sectionRef }) => {
	const [darkMode] = useDarkMode();

	return (
		<section ref={sectionRef} className="section-teams" id="home-scroll-to">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-xl-5 propose-team text-center">
						<h2>
							<Link to="/entity/teams/create">Proposer une équipe</Link>
						</h2>
						<p>
							Partager vos équipes à la communauté pour avoir des avis
							dessus ou aider les débutants
						</p>
						<div className="img-wrapper">
							<ScrollReveal
								Tag="img"
								className="img-fluid"
								animation="zoomIn"
								src={`/images/propose-team${
									darkMode ? '-black' : ''
								}.png`}
								alt="Silhouette de pokemons"
								width="339"
								height="236"
							/>
						</div>
						<Link
							to="/entity/teams/create"
							className="btn btn-red team-button btn-icon"
						>
							<Icon name="add circle" />
							Proposer
						</Link>
					</div>
					<div className="col-12 col-xl-7 find-team">
						<div className="content">
							<h2>
								<Link to="/entity/teams">Trouver une équipe</Link>
							</h2>
							<p>Chercher une équipe par style de jeu, tier ou Pokémon</p>
							<div className="pictures">
								<div className="picture">
									<Link
										to={`/entity/teams?tags=1`}
										title="équipes Hyper Offense"
									>
										<ScrollReveal
											Tag="img"
											className="img-fluid"
											animation="zoomIn"
											src={`/images/ho.png?ver=${IMG_VERSION}`}
											alt="Tag : Hyper Offense"
											width="236"
											height="200"
										/>
									</Link>
								</div>
								<div className="picture">
									<Link
										to={`/entity/teams?tier=168&gen=${defaultGen}`}
										title="équipes OverUsed"
									>
										<ScrollReveal
											Tag="img"
											className="img-fluid"
											animation="zoomIn"
											src={`/images/ou.png?ver=${IMG_VERSION}`}
											alt="Tier : OverUsed"
											width="230"
											height="200"
										/>
									</Link>
								</div>
								<div className="picture">
									<Link
										to={`/entity/teams?tier=176&gen=${defaultGen}`}
										title="équipes"
									>
										<ScrollReveal
											Tag="img"
											className="img-fluid"
											animation="zoomIn"
											src={`/images/vgc.png?ver=${IMG_VERSION}`}
											alt="Tier : VGC"
											width="236"
											height="200"
										/>
									</Link>
								</div>
							</div>
							<Link
								to={`/entity/teams`}
								className="btn btn-red team-button btn-icon"
							>
								<Icon name="search" />
								Trouver
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default SectionTeams;
