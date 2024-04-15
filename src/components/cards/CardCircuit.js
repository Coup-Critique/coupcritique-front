import Link from 'next/link';
import { memo } from 'react';
import { Card } from 'semantic-ui-react';
import ArticleRowTeaser from '../teasers/ArticleRowTeaser';

const CardCircuit = ({ currentTour }) => {
	return (
		<Card className="padded">
			<h2>Circuit Compétitif</h2>
			<div>
				{!!currentTour && (
					<ArticleRowTeaser article={currentTour} entityName="circuit-tours" />
				)}
				<Link href="/entity/circuit-tours" className="btn btn-orange btn-outline">
					Détails du circuit
				</Link>
			</div>
		</Card>
	);
};

export default memo(CardCircuit);
