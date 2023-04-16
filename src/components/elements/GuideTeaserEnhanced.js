// modules
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/functions';
import ScrollReveal from '../ScrollReveal';
import Tag from './Tag';

const GuideTeaserEnhanced = ({ guide }) => (
	<ScrollReveal className="row guide-teaser-enhanced mb-3" animation="zoomIn" earlier>
		<div className="col-12 col-lg-6">
			<Link to={`/entity/guides/${guide.id}`}>
				<img
					className="img-fluid d-block mb-2"
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
		<div className="col-12 col-lg-6">
			<h4>
				<Link to={`/entity/guides/${guide.id}`}>{guide.title}</Link>
			</h4>
			<p className="description">{guide.shortDescription}</p>
			<h5>
				{guide.user.username} - {formatDate(guide.date_creation)}
			</h5>
			{guide.tags.map((guideTag, i) => (
				<Tag key={i} tag={guideTag} />
			))}
		</div>
	</ScrollReveal>
);
export default GuideTeaserEnhanced;
