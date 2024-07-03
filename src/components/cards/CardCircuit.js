import Link from 'next/link';
import { memo } from 'react';
import { Card } from 'semantic-ui-react';
import ArticleRowTeaser from '../teasers/ArticleRowTeaser';
import { makeClassName } from '@/functions';

const CardCircuit = ({ currentTours }) => {
	return (
		<Card className="padded">
			<h2 className="sr-only">Circuit Compétitif</h2>
			<img
				className="img-fluid mr-lg-0 ml-lg-0 mb-4"
				width={345}
				height={84}
				alt="Circuit Compétitif"
				src="/images/logo_circuit.png"
			/>
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
							<ArticleRowTeaser
								article={tour}
								entityName="circuit-tours"
								noCover
							/>
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
