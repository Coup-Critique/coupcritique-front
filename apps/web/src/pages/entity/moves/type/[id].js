// modules
import { useState } from 'react';
import { Loader } from 'semantic-ui-react';
// components
import PageWrapper from '@/components/PageWrapper';
import GenSelector from '@/components/GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';
import GoBackButton from '@/components/GoBackButton';
import SectionAds from '@/components/sections/SectionAds';
import TableMove from '@/components/table/TableMove';
import { manageFetch } from '@/hooks/useFetch';
import gens from '@/constants/gens';
import useStateProps from '@/hooks/useStateProps';

const MoveByType = ({ type, moves = [], availableGens }) => {
	const [table, setTable] = useStateProps(moves);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	if (!type) return null;
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
			<GoBackButton defaultUrl={`/entity/types/${type.id}`} />
			<GenSelector
				availableGens={availableGens}
				redirectOnChange={`/entity/types/`}
			/>
			<SectionAds className="mt-4" />
			<div id="pagination-scroll-ref">
				{table.length ? (
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

export async function getStaticPaths() {
	try {
		const paths = await Promise.all(
			gens.map(async gen => {
				const response = await manageFetch(`types?gen=${gen}`);
				return response.types.map(({ id }) => ({ params: { id } }));
			})
		).flat();

		return { paths, fallback: false };
	} catch {
		return { paths: [], fallback: true };
	}
}

export const getStaticProps = async ({ params }) => {
	const { id } = params;
	try {
		const { moves } = await manageFetch(`moves/type/${id}`);
		const { type, availableGens } = await manageFetch(`types/${id}`);
		return { props: { moves, type, availableGens } };
	} catch (e) {
		console.error(e);
		return { props: { type: null } };
	}
};

export default MoveByType;
