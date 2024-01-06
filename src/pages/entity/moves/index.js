// modules
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
// hooks
import useFetch from '@/hooks/useFetch';
// components
import PageWrapper from '@/components/PageWrapper';
import TableMove from '@/components/table/TableMove';
import GenSelector from '@/components/GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';

const MovesList = () => {
	const gen = useSelector(state => state.gen);
	const [result, load, loading] = useFetch();
	const [moves, setMoves] = useState([]);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	useEffect(() => {
		load({ url: `moves?gen=${gen}` });
	}, [gen]);

	useEffect(() => {
		if (result?.moves) {
			setMoves(result.moves);
		}
	}, [result]);

	return (
		<PageWrapper
			title="Liste des Capacités"
			more
			metatitle="Capacités des Pokémon | Coup Critique Stratégie Pokémon"
			description="Liste de capacités dans Pokémon. Accédez la liste des Pokémon pouvant apprendre chaque capacité avec son taux d'utilisation. Retrouvez rapidement les données des capacités."
		>
			<GenSelector />
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
export default MovesList;
