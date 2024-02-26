import Link from 'next/link';
import { Card } from 'semantic-ui-react';

const CardCircuit = () => {
	return (
		<Card className="padded">
			<h2>Circuit Compétitif</h2>

			<Link href="/entity/tournaments" className="btn btn-outline">
				Détails du circuit
			</Link>
		</Card>
	);
};

export default CardCircuit;
