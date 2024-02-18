import Link from 'next/link';
import ScrollReveal from '../ScrollReveal';
import { IMG_VERSION } from '@/constants/img';
import { lastGen } from '@/constants/gens';
import { Card } from 'semantic-ui-react';

const CardFindTeam = () => (
	<Card className="padded">
		<div className="d-flex justify-content-between flex-wrap mb-4">
			<h2 className="mb-0">
				<Link href="/entity/teams">Trouver une équipe</Link>{' '}
			</h2>
			<Link href={`/entity/teams`} className="btn btn-orange">
				Je trouve mon équipe
			</Link>
		</div>
		<p>Chercher une équipe par style de jeu, tier ou Pokémon</p>
		<div className="row">
			<div className="col-12 col-md-4 col-lg-12 col-xl-4 mb-3 mb-md-0 mb-lg-3 mb-xl-0">
				<div className="card outline">
					<Link href={`/entity/teams?tags=1`} title="équipes Hyper Offense">
						<ScrollReveal
							Tag="img"
							className="img-fluid"
							animation="zoomIn"
							src={`/images/ho.png?ver=${IMG_VERSION}`}
							alt="Tag : Hyper Offense"
							width="236"
							height="200"
						/>
						<span>Hyper Offense</span>
					</Link>
				</div>
			</div>
			<div className="col-12 col-md-4 col-lg-12 col-xl-4 mb-3 mb-md-0 mb-lg-3 mb-xl-0">
				<div className="card outline">
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
						<span>Over Used</span>
					</Link>
				</div>
			</div>
			<div className="col-12 col-md-4 col-lg-12 col-xl-4 mb-3 mb-md-0 mb-lg-3 mb-xl-0">
				<div className="card outline">
					<Link href={`/entity/teams?tier=176&gen=${lastGen}`} title="équipes">
						<ScrollReveal
							Tag="img"
							className="img-fluid"
							animation="zoomIn"
							src={`/images/vgc.png?ver=${IMG_VERSION}`}
							alt="Tier : VGC"
							width="236"
							height="200"
						/>
						<span>VGC</span>
					</Link>
				</div>
			</div>
		</div>
	</Card>
);

export default CardFindTeam;
