import Link from 'next/link';
import { Card } from 'semantic-ui-react';

const CardCircuit = () => {
	return (
		<Card className="padded">
			<h2>Circuit Compétitif</h2>
			<div>
				<Link href="/entity/tournaments" className="btn btn-orange btn-outline">
					Détails du circuit
				</Link>
			</div>
		</Card>
	);
};

export default CardCircuit;
