import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from 'semantic-ui-react';
import useDarkMode from '@/hooks/useDarkMode';
import ScrollReveal from '@/components/ScrollReveal';
import { lastGen } from '@/constants/gens';
import { IMG_VERSION } from '@/constants/img';
// import Image from 'next/image';

const SectionTeams = ({ sectionRef }) => {
	const router = useRouter();
	const [darkMode] = useDarkMode();

	return (
		<section ref={sectionRef} className="section-teams" id="home-scroll-to">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-xl-5 propose-team text-center">
						<h2>
							<Link href="/entity/teams/create">Proposer une équipe</Link>
						</h2>
						<p>
							Partager vos équipes à la communauté pour avoir des avis
							dessus ou aider les débutants
						</p>
						<div className="img-wrapper">
							<ScrollReveal
								Tag="img"
								className="img-fluid clickable"
								animation="zoomIn"
								src={`/images/propose-team${
									darkMode ? '-black' : ''
								}.png`}
								alt="Silhouette de pokemons"
								width="339"
								height="236"
								onClick={e => router.push('/entity/teams/create')}
							/>
						</div>
						<Link
							href="/entity/teams/create"
							className="btn btn-red team-button btn-icon"
						>
							<Icon name="add circle" />
							Proposer
						</Link>
					</div>
					<div className="col-12 col-xl-7 find-team">
						<div className="content">
							<h2>
								<Link href="/entity/teams">Trouver une équipe</Link>
							</h2>
							<p>Chercher une équipe par style de jeu, tier ou Pokémon</p>
							<div className="pictures">
								<div className="picture">
									<Link
										href={`/entity/teams?tags=1`}
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
										href={`/entity/teams?tier=168&gen=${lastGen}`}
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
										href={`/entity/teams?tier=176&gen=${lastGen}`}
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
								href={`/entity/teams`}
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
