import Link from 'next/link';
import Image from 'next/image';
import { Card } from 'semantic-ui-react';
import { IMG_VERSION } from '@/constants/img';
import { lastGen } from '@/constants/gens';
import ScrollReveal from '../ScrollReveal';
import LinkButton from '../buttons/LinkButton';

const CardFindTeam = () => (
	<Card className="padded">
		<div className="d-flex justify-content-between flex-wrap">
			<h2 className="mb-4">Trouver une équipe</h2>
			<LinkButton href={`/entity/teams`} color="orange" className="mb-4">
				Je trouve mon équipe
			</LinkButton>
		</div>
		<p>Chercher une équipe par style de jeu, tier ou Pokémon</p>
		<div className="row">
			<div className="col-12 col-md-4 col-lg-12 col-xl-4 mb-3 mb-md-0 mb-lg-3 mb-xl-0">
				<div className="card outline">
					<Link href={`/entity/teams?tags=1`} title="équipes Hyper Offense">
						<ScrollReveal
							Tag={Image}
							className="img-fluid"
							animation="zoomIn"
							src={`/images/ho.png?ver=${IMG_VERSION}`}
							alt="Des pokémon représentant le tag Hyper Offense"
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
							Tag={Image}
							className="img-fluid"
							animation="zoomIn"
							src={`/images/ou.png?ver=${IMG_VERSION}`}
							alt="Des pokémon représentant le tier OverUsed"
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
							Tag={Image}
							className="img-fluid"
							animation="zoomIn"
							src={`/images/vgc.png?ver=${IMG_VERSION}`}
							alt="Des pokémon représentant le tier VGC"
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
