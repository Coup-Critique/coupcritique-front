// modules
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';
import { formatDate } from '../../functions';
import ScrollReveal from '../ScrollReveal';
import Tag from './Tag';

const GuideTeaser = ({ guide, TitleAs = 'h3', btnProps = {} }) => (
	<ScrollReveal className="ui card actuality-teaser" animation="zoomIn" earlier>
		<Card.Content>
			<TitleAs className="text-center">
				<Link to={`/entity/guides/${guide.id}`}>{guide.title}</Link>
			</TitleAs>
			<div className="image mb-3">
				<Link to={`/entity/guides/${guide.id}`}>
					<img
						className="img-fluid d-block"
						src={
							guide.images && guide.images.length
								? `/images/guides/375px/${guide.images[0]}`
								: '/images/default_actuality_colored.jpg'
						}
						onError={e => {
							e.target.onerror = null;
							e.target.src = '/images/default_actuality_colored.jpg';
						}}
						alt={guide.alt}
						// TODO gerer une taille fixe
					/>
					<span className="sr-only">Illustration du guide : {guide.title}</span>
				</Link>
			</div>
			{guide.tags.length > 0 && (
				<div className="mb-2 text-center">
					{guide.tags.map((guideTag, i) => (
						<Tag key={i} tag={guideTag} />
					))}
				</div>
			)}
			<p className="date mb-3">
				{guide.user.username} - {formatDate(guide.date_creation)}
			</p>
			{!!guide.shortDescription && (
				<p className="short-description">{guide.shortDescription}</p>
			)}
		</Card.Content>
		<Card.Content>
			<Button color="red" {...btnProps} as={Link} to={`/entity/guides/${guide.id}`}>
				Lire la suite
			</Button>
		</Card.Content>
	</ScrollReveal>
);
export default GuideTeaser;
