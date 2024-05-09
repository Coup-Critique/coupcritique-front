// modules
import { Loader } from 'semantic-ui-react';
// components
import PageWrapper from '@/components/PageWrapper';
import TableMove from '@/components/table/TableMove';
import GenSelector from '@/components/GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';
import useFetchListByGen from '@/hooks/useFetchListByGen';
import { manageFetch } from '@/hooks/useFetch';

const MovesList = props => {
	const [moves, setMoves, loading] = useFetchListByGen('moves', props.moves);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery({
		saveQueryToStore: true,
	});

	return (
		<PageWrapper
			title="Liste des Capacités"
			more
			metatitle="Capacités des Pokémon | Coup Critique Stratégie Pokémon"
			description="Liste de capacités dans Pokémon. Accédez la liste des Pokémon pouvant apprendre chaque capacité avec son taux d'utilisation. Retrouvez rapidement les données des capacités."
			action={<GenSelector />}
		>
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active inline="centered" />
				) : moves && moves.length ? (
					<TableMove
						moves={moves}
						setMoves={setMoves}
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				) : (
					<p>Aucune capacité trouvée.</p>
				)}
			</div>
		</PageWrapper>
	);
};

export const getStaticProps = async () => {
	try {
		const response = await manageFetch(`moves`);
		const moves = response.moves || [];
		return { props: { moves } };
	} catch (e) {
		console.error(e);
		return { props: { moves: [] } };
	}
};

export default MovesList;
