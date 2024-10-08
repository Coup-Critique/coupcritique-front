// modules

// components
import PageWrapper from '@/components/PageWrapper';
import TableTourRanking from '@/components/table/TableTourRanking';
import { manageFetch } from '@/hooks/useFetch';

const CircuitRanking = ({ players, circuitTours }) => {
	return (
		<PageWrapper
			more
			title={'Classement général du Circuit Compétitif'}
			metadescription={'Classement général du Circuit Compétitif de 2024.'}
			goingBack={`/entity/circuit-tours`}
		>
			{players.length > 0 ? (
				<TableTourRanking players={players} circuitTours={circuitTours} />
			) : (
				<p>Les résultats ne sont pas encore disponibles.</p>
			)}
		</PageWrapper>
	);
};

export async function getServerSideProps() {
	try {
		const { players = [], circuitTours = [] } = await manageFetch(`players`);
		return {
			props: {
				circuitTours,
				players: players.map((player, i) => ({ ...player, rank: i + 1 })),
			},
		};
	} catch (e) {
		console.error(e);
		return { props: { players: [], circuitTours: [] } };
	}
}

export default CircuitRanking;
