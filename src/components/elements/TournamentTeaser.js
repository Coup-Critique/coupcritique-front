// modules
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';
import { formatDate } from '@/functions';
import ScrollReveal from '../ScrollReveal';
import Tag from './Tag';

const TournamentTeaser = ({ tournament, TitleAs = 'h3', btnProps = {} }) => (
	<ScrollReveal className="ui card actuality-teaser" animation="zoomIn" earlier>
		<Card.Content>
			<TitleAs className="text-center">
				<Link to={`/entity/tournaments/${tournament.id}`}>
					{tournament.title}
				</Link>
			</TitleAs>
			<div className="image mb-3">
				<Link to={`/entity/tournaments/${tournament.id}`}>
					<img
						className="img-fluid d-block"
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
			{tournament.tags.length > 0 && (
				<div className="mb-2 text-center">
					{tournament.tags.map((tag, i) => (
						<Tag key={i} tag={tag} />
					))}
				</div>
			)}
			<p className="date mb-3">
				{tournament.user && tournament.user.username + ' - '}{' '}
				{formatDate(tournament.date_creation)}
			</p>
			{!!tournament.shortDescription && (
				<p className="short-description">{tournament.shortDescription}</p>
			)}
		</Card.Content>
		<Card.Content>
			<Button
				color="red"
				{...btnProps}
				as={Link}
				to={`/entity/tournaments/${tournament.id}`}
			>
				Lire la suite
			</Button>
		</Card.Content>
	</ScrollReveal>
);
export default TournamentTeaser;
