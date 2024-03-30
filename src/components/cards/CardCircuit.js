import Link from 'next/link';
import { Card } from 'semantic-ui-react';

const CardCircuit = () => {
	return (
		<Card className="padded">
			<h2>Circuit Compétitif</h2>
			<div>
				{/* TODO mettre un teaser du circuit en cours */}
				<Link href="/entity/circuit-tours" className="btn btn-orange btn-outline">
					Détails du circuit
				</Link>
			</div>
		</Card>
	);
};

export default CardCircuit;
