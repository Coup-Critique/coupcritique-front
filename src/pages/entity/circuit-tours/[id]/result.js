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
import { makeClassName } from '@/functions';

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
		const tabs = [];
		if (circuitTour.scores) {
			tabs.push({
				menuItem: 'Scores',
				render: () => (
					<Tab.Pane>
						<TableTourScore
							scores={circuitTour.scores}
							circuitTour={circuitTour}
						/>
					</Tab.Pane>
				),
			});
		}
		Object.entries(circuitTour.rounds)
			.reverse()
			.forEach(([round, brackets]) => {
				const entries = Object.entries(brackets);
				tabs.push({
					menuItem: isNaN(round) ? round : 'Round ' + round,
					render: () => (
						<Tab.Pane>
							<div className="row">
								{entries.map(([bracket, values]) => (
									<div
										className={makeClassName(
											'col-12',
											entries.length > 1 && 'col-xl-6'
										)}
										key={bracket}
									>
										<h3>{bracket}</h3>
										<TableTourResult rounds={values} />
									</div>
								))}
							</div>
						</Tab.Pane>
					),
				});
			});
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
			more
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
