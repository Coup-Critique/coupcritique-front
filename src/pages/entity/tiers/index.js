import React from 'react';
import { Link } from 'react-router-dom';
import Tier from '../../elements/Tier';
import { Card } from 'semantic-ui-react';
import ScrollReveal from '../../ScrollReveal';
import SectionAds from '../../sections/SectionAds';
import { ART_ITM } from '../../../constants/img';

const TierList = ({ tiers = [] }) => (
	<>
		<div className="list-tier">
			{tiers.map(tier => (
				<ScrollReveal
					key={tier.id}
					className="ui card tier-art"
					animation="zoomIn"
				>
					<Link className="image" to={`/entity/tiers/${tier.id}`}>
						<img
							src={`/images/tiers/${tier.gen}-${
								tier.shortName || tier.name
							}.png`}
							alt={tier.name}
							width={ART_ITM}
							height={ART_ITM}
						/>
						<span className="sr-only">{tier.name}</span>
					</Link>
					<Card.Content>
						<Link to={`/entity/tiers/${tier.id}`}>
							<Tier
								tier={tier}
								displayGen={false}
								className="mr-2"
								noLink
							/>{' '}
							<span>{tier.name}</span>
						</Link>
					</Card.Content>
				</ScrollReveal>
			))}
		</div>
		<SectionAds className="mt-4" />
	</>
);

export default TierList;
