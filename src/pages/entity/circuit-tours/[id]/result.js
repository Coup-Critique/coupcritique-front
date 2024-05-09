// modules

// components
import PageWrapper from '@/components/PageWrapper';
import TableTourResult from '@/components/table/TableTourResult';
import TableTourScore from '@/components/table/TableTourScore';
import CircuitTourContainer from '@/containers/CircuitTourContainer';
import { manageFetch } from '@/hooks/useFetch';
import { useMemo } from 'react';
import { Tab } from 'semantic-ui-react';

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
		for (let i = 0; i < circuitTour.results.length; i++) {
			tabs.push({
				menuItem: 'Round ' + (i + 1),
				render: () => (
					<Tab.Pane>
						<TableTourResult results={circuitTour.results[i]} />
					</Tab.Pane>
				),
			});
		}
		return tabs;
	}, [circuitTour.results]);

	return (
		<PageWrapper
			min
			title={'Résultat du ' + circuitTour.title}
			metadescription={circuitTour.shortDescription}
			metaimage={hasImage && `circuit-tours/${circuitTour.images[0]}`}
			goingBack={`/entity/circuit-tours/${circuitTour.id}`}
		>
			<Tab panes={tabs} />
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
