// modules

import Link from 'next/link';
import { Card, Button } from 'semantic-ui-react';
import { formatDate } from '@/functions';
import ScrollReveal from '@/components/ScrollReveal';
import Tag from '@/components/elements/Tag';

const TournamentTeaser = ({ tournament, TitleAs = 'h3', btnProps = {} }) => (
	<ScrollReveal className="ui card actuality-teaser" animation="zoomIn" earlier>
		<Card.Content>
			<div className="image mb-4">
				<Link href={`/entity/tournaments/${tournament.id}`}>
					<img
						className="img-fluid"
						src={
							tournament.images && tournament.images.length
								? `/images/tournaments/375px/${tournament.images[0]}`
								: '/images/default_actuality_colored.jpg'
						}
						onError={e => {
							e.target.onerror = null;
							e.target.src = '/images/default_actuality_colored.jpg';
						}}
						alt={tournament.alt}
						// TODO gerer une taille fixe
					/>
					<span className="sr-only">
						Illustration du tournoi : {tournament.title}
					</span>
				</Link>
			</div>
			<TitleAs>
				<Link href={`/entity/tournaments/${tournament.id}`}>
					{tournament.title}
				</Link>
			</TitleAs>
			{tournament.tags.length > 0 && (
				<div className="mb-2">
					{tournament.tags.map((tag, i) => (
						<Tag key={i} tag={tag} />
					))}
				</div>
			)}
			<p className="date mb-3">{formatDate(tournament.date_creation)}</p>
			{!!tournament.shortDescription && (
				<p className="short-description">{tournament.shortDescription}</p>
			)}
		</Card.Content>
		<Card.Content>
			<Link
				className="underline"
				{...btnProps}
				href={`/entity/tournaments/${tournament.id}`}
			>
				Lire la suite
			</Link>
		</Card.Content>
	</ScrollReveal>
);
export default TournamentTeaser;
