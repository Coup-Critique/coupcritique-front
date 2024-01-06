// modules
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetParam } from '@/hooks/useGetParams';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
// hooks
import useFetch from '@/hooks/useFetch';
// functions
import { formateName } from '@/functions';
// components
import PageWrapper from '@/components/PageWrapper';
import GenSelector from '@/components/GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';
import { setSsrDataAction } from '@/reducers/ssrData';
import { setGenAction } from '@/reducers/gen';
import GoBackButton from '@/components/GoBackButton';
import SectionAds from '@/components/sections/SectionAds';
import TableMove from '@/components/table/TableMove';

const MoveByType = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const id = useGetParam('id');
	const ssrData = useSelector(state => state.ssrData);
	const gen = useSelector(state => state.gen);
	const [resultType, loadType, loadingType] = useFetch();
	const [result, load, loading] = useFetch();
	const [type, setType] = useState();
	const [table, setTable] = useState([]);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);
	const ssrEntity = ssrData?.type;

	useEffect(() => {
		// Void ssr on type change
		if (ssrEntity) {
			if (ssrEntity.id != id) {
				dispatch(setSsrDataAction(null));
			} else if (ssrEntity.gen != gen) {
				dispatch(setGenAction(ssrEntity.gen));
			}
		}
	}, [id]);

	useEffect(() => {
		if (isNaN(id)) return router.push('/404');
		// gen comes from id
		if (!ssrEntity || ssrEntity.id != id) {
			loadType({ url: `types/${id}` });
		}
	}, [id]);

	useEffect(() => {
		load({ url: `moves/type/${id}` });
	}, [id, gen]);

	useEffect(() => {
		if (resultType) {
			if (resultType.success) {
				setType(resultType.type);
				if (resultType.gen != gen) {
					dispatch(setGenAction(resultType.gen));
				}
			} else if (resultType.message === 'Mauvais identifiant') {
				router.push('/404');
			}
		}
	}, [resultType]);

	useEffect(() => {
		if (result?.moves) {
			setTable(result.moves);
		}
	}, [result]);

	return (
		<PageWrapper
			title={
				<>
					<span>Liste des capacités du type </span>
					{type ? (
						<span>{type.nom || type.name}</span>
					) : (
						<span style={{ fontSize: '1rem', verticalAlign: 'middle' }}>
							<Loader active size="small" inline inverted />
						</span>
					)}
				</>
			}
			metatitle={
				'Liste des capacités du type ' + (type ? type.nom || type.name : '')
			}
			metadescription={
				'Accédez la liste des des capacités du type ' +
				(type ? type.nom || type.name : '')
			}
			more
		>
			<GoBackButton defaultUrl={`/entity/types/${id}`} />
			<GenSelector
				availableGens={resultType?.availableGens}
				redirectOnChange={`/entity/types/`}
			/>
			<SectionAds className="mt-4" />
			<div id="pagination-scroll-ref">
				{loading || loadingType ? (
					<Loader active inline="centered" />
				) : table.length ? (
					<TableMove
						moves={table}
						setMoves={setTable}
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
export default MoveByType;
