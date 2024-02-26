// modules
// import Link from 'next/link';
import { Card } from 'semantic-ui-react';
import { formatDate } from '@/functions';
import ScrollReveal from '@/components/ScrollReveal';
import Tag from '@/components/elements/Tag';

const TournamentTeaser = ({ tournament, TitleAs = 'h3', btnProps = {} }) => (
	<ScrollReveal className="ui card actuality-teaser" animation="zoomIn" earlier>
		<Card.Content>
			<div className="image mb-4">
				<a href={`/entity/tournaments/${tournament.id}`}>
					<img
						className="img-fluid"
						src={
							tournament.images && tournament.images.length
								? `${process.env.NEXT_PUBLIC_API_URL}/images/uploads/tournaments/375px/${tournament.images[0]}`
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
				</a>
			</div>
			<TitleAs>
				<a href={`/entity/tournaments/${tournament.id}`}>{tournament.title}</a>
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
			<a
				className="underline"
				{...btnProps}
				href={`/entity/tournaments/${tournament.id}`}
			>
				Lire la suite
			</a>
		</Card.Content>
	</ScrollReveal>
);
export default TournamentTeaser;
