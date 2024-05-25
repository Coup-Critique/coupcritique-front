import Link from 'next/link';
import { memo } from 'react';
import { Card } from 'semantic-ui-react';
import ArticleRowTeaser from '../teasers/ArticleRowTeaser';
import { makeClassName } from '@/functions';

const CardCircuit = ({ currentTours }) => {
	return (
		<Card className="padded">
			<h2>Circuit Compétitif</h2>
			<div>
				<div className="row">
					{currentTours.map((tour, i) => (
						<div
							key={tour.id}
							className={makeClassName(
								'col-12 col-sm-6 col-xl-12 align-items-center',
								i > 0 && 'd-none d-sm-flex d-xl-none'
							)}
						>
							<ArticleRowTeaser article={tour} entityName="circuit-tours" />
						</div>
					))}
				</div>
				<Link href="/entity/circuit-tours" className="btn btn-orange btn-outline">
					Détails du circuit
				</Link>
			</div>
		</Card>
	);
};

export default memo(CardCircuit);
