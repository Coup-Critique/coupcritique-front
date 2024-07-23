// modules
import Link from 'next/link';
import { Tab } from 'semantic-ui-react';
import { useMemo } from 'react';
// components
import PageWrapper from '@/components/PageWrapper';
import TableTourResult from '@/components/table/TableTourResult';
import TableTourScore from '@/components/table/TableTourScore';
import CircuitTourContainer from '@/containers/CircuitTourContainer';
import { manageFetch } from '@/hooks/useFetch';

const CircuitTourResult = ({ circuitTour }) => {
	return (
		<CircuitTourContainer
			Component={Page}
			circuitTour={circuitTour}
			entityName="circuit-tours"
		/>
	);
};

const Page = ({ circuitTour }) => {
	const hasImage = circuitTour.images?.length > 0;

	const tabs = useMemo(() => {
		if (!circuitTour.rounds) return [];
		const tabs = [
			{
				menuItem: 'Scores',
				render: () => (
					<Tab.Pane>
						<TableTourScore scores={circuitTour.scores} />
					</Tab.Pane>
				),
			},
		];
		for (let i = 0; i < circuitTour.rounds.length; i++) {
			const { W, L } = circuitTour.rounds[i];
			tabs.push({
				menuItem: 'Round ' + (i + 1),
				render: () => (
					<Tab.Pane>
						{W.length > 0 && (
							<>
								<h3>Winner Bracket</h3>
								<TableTourResult rounds={W} />
							</>
						)}
						{W.length > 0 && L.length > 0 && (
							<div className="mt-4 mb-4" style={{ height: '1px' }}></div>
						)}
						{L.length > 0 && (
							<>
								<h3>Loser Bracket</h3>
								<TableTourResult rounds={L} />
							</>
						)}
					</Tab.Pane>
				),
			});
		}
		return tabs;
	}, [circuitTour.rounds]);

	return (
		<PageWrapper
			min
			title={'Résultat du ' + circuitTour.title}
			metadescription={circuitTour.shortDescription}
			metaimage={hasImage && `circuit-tours/${circuitTour.images[0]}`}
			goingBack={`/entity/circuit-tours/${circuitTour.id}`}
			action={
				<Link
					href={`/entity/circuit-tours/ranking`}
					className="btn btn-orange inverted"
				>
					Voir le classement complet
				</Link>
			}
		>
			{tabs.length > 0 ? (
				<Tab panes={tabs} />
			) : (
				<p>Les résultats ne sont pas encore disponibles.</p>
			)}
		</PageWrapper>
	);
};

export async function getServerSideProps({ query }) {
	const { id } = query;
	try {
		const { circuitTour } = await manageFetch(`circuit-tours/${id}`);
		return { props: { circuitTour } };
	} catch (e) {
		console.error(e);
		return { props: { circuitTour: null } };
	}
}

export default CircuitTourResult;
