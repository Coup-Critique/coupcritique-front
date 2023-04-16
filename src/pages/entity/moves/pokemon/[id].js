// modules
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
// hooks
import useFetch from '@/hooks/useFetch';
// functions
import { formateName } from '@/functions';
// components
import PageWrapper from '@/components/PageWrapper';
import GenSelector from '../../GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';
import { setSsrDataAction } from '@/reducers/ssrData';
import { setGenAction } from '@/reducers/gen';
import GoBackButton from '../../GoBackButton';
import SectionAds from '@/components/sections/SectionAds';
import TableMoveUsage from '@/components/table/TableMoveUsage';

const MovePool = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const { ssrData, user, gen } = useSelector(state => state);
	const [resultPokemon, loadPokemon, loadingPokemon] = useFetch();
	const [result, load, loading] = useFetch();
	const [pokemon, setPokemon] = useState();
	const [table, setTable] = useState([]);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);
	const ssrEntity = ssrData?.pokemon;

	useEffect(() => {
		// Void ssr on pokemon change
		if (ssrEntity) {
			if (ssrEntity.id != id) {
				dispatch(setSsrDataAction(null));
			} else if (ssrEntity.gen != gen) {
				dispatch(setGenAction(ssrEntity.gen));
			}
		}
	}, [id]);

	useEffect(() => {
		if (isNaN(id)) return history.push('/404');
		// gen comes from id
		if (!user.loading) {
			if (ssrEntity && ssrEntity.id == id) {
				setPokemon(ssrEntity);
			} else {
				loadPokemon({ url: `pokemons/${id}` });
			}
		}
	}, [id, user.loading, user.id]);

	useEffect(() => {
		if (!user.loading) {
			load({ url: `moves/pokemon/${id}` });
		}
	}, [id, gen, user, user.loading]);

	useEffect(() => {
		if (resultPokemon) {
			if (resultPokemon.success) {
				setPokemon(resultPokemon.pokemon);
				if (resultPokemon.gen != gen) {
					dispatch(setGenAction(resultPokemon.gen));
				}
			} else if (resultPokemon.message === 'Mauvais identifiant') {
				history.push('/404');
			}
		}
	}, [resultPokemon]);

	useEffect(() => {
		if (result && result.moves) {
			setTable(result.moves);
		}
	}, [result]);

	return (
		<PageWrapper
			title={
				<>
					<span>Liste des capacités de </span>
					{pokemon ? (
						<span>{pokemon.nom || formateName(pokemon.name)}</span>
					) : (
						loadingPokemon && (
							<span style={{ fontSize: '1rem', verticalAlign: 'middle' }}>
								<Loader active size="small" inline inverted />
							</span>
						)
					)}
				</>
			}
			metatitle={
				`Liste des capacités de `
				+ (pokemon ? pokemon.nom || formateName(pokemon.name) : '')
			}
			metadescription={`Accédez la liste des des capacités de ${
				pokemon ? pokemon.nom || formateName(pokemon.name) : ''
			} avec leur taux d'utilisation. Retrouvez rapidement les données des capacités.`}
			more
		>
			<GoBackButton defaultUrl={`/entity/pokemon/${id}`} />
			<GenSelector
				availableGens={resultPokemon?.availableGens}
				redirectOnChange={`/entity/pokemon/${id}`}
			/>
			<SectionAds className="mt-4" />
			<div id="pagination-scroll-ref">
				{loading || loadingPokemon || user.loading ? (
					<Loader active inline="centered" />
				) : table.length ? (
					<TableMoveUsage
						tier={pokemon?.tier}
						moves={table}
						setMoves={setTable}
						usageKey="usageMove"
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
export default MovePool;
