import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Card } from 'semantic-ui-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useSelector } from 'react-redux';

const CardProposeTeam = () => {
	const router = useRouter();
	const darkMode = useSelector(state => state.darkMode);

	return (
		<Card className="padded">
			<h2>Proposer une équipe</h2>
			<p>
				Partager vos équipes à la communauté pour
				<br />
				avoir des avis dessus ou aider les débutants
			</p>
			<div>
				<Link href="/entity/teams/create" className="btn btn-orange">
					Proposer mon équipe
				</Link>
			</div>
			<div className="img-wrapper">
				<ScrollReveal
					Tag={Image}
					className="img-fluid clickable main-img"
					animation="zoomIn"
					src={`/images/propose-team${darkMode ? '-black' : ''}.png`}
					alt="Silhouette de pokemons"
					width="339"
					height="236"
					onClick={e => router.push('/entity/teams/create')}
				/>
			</div>
		</Card>
	);
};

export default CardProposeTeam;
