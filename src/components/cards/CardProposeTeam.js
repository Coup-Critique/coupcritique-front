import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card, Icon } from 'semantic-ui-react';
import useDarkMode from '@/hooks/useDarkMode';
import ScrollReveal from '@/components/ScrollReveal';

const CardProposeTeam = () => {
	const router = useRouter();
	const [darkMode] = useDarkMode();

	return (
		<Card className="padded">
			<h2>
				<Link href="/entity/teams/create">Proposer une équipe</Link>
			</h2>
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
					Tag="img"
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
