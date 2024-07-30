import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from 'semantic-ui-react';
import ArticleRowTeaser from '../teasers/ArticleRowTeaser';
import { makeClassName } from '@/functions';
import LinkButton from '../buttons/LinkButton';

const CardCircuit = ({ currentTours }) => {
	return (
		<Card className="padded">
			<Link href="/entity/circuit-tours">
				<h2 className="sr-only">Circuit Compétitif</h2>
				<Image
					className="img-fluid mr-lg-0 ml-lg-0 mb-4"
					width={345}
					height={84}
					alt="Logo du circuit"
					src="/images/logo_circuit.png"
				/>
			</Link>
			<div>
				<div className="row">
					{currentTours.map((tour, i) => (
						<div
							key={tour.id}
							className={makeClassName(
								'col-12 col-sm-6 col-home-xxl-12 align-items-center',
								i > 0 && 'd-none d-sm-flex d-home-xxl-none'
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
				<LinkButton href="/entity/circuit-tours" color="orange" outline inverted>
					Détails du circuit
				</LinkButton>
			</div>
		</Card>
	);
};

export default memo(CardCircuit);
