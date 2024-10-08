import PageWrapper from '@/components/PageWrapper';
import GenSelector from '@/components/GenSelector';
import SectionAds from '@/components/sections/SectionAds';
import TableMoveUsage from '@/components/table/TableMoveUsage';
import useStateProps from '@/hooks/useStateProps';
import useStoreQuery from '@/hooks/useStoreQuery';
import { manageFetch } from '@/hooks/useFetch';
import { formateName } from '@/functions';
import gens from '@/constants/gens';
import { redirect404 } from '@/pages/404';

const MovePool = ({ pokemon, moves = [], availableGens }) => {
	const [table, setTable] = useStateProps(moves);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery({
		saveQueryToStore: true,
	});

	if (!pokemon) return null;
	const pokemonName = pokemon.nom || formateName(pokemon.name);
	return (
		<PageWrapper
			title={
				<>
					<span>Liste des capacités de </span>
					{pokemon ? <span>{pokemonName}</span> : null}
				</>
			}
			metatitle={`Liste des capacités de ` + (pokemon ? pokemonName : '')}
			metadescription={`Accédez la liste des des capacités de ${
				pokemon ? pokemonName : ''
			} avec leur taux d'utilisation. Retrouvez rapidement les données des capacités.`}
			more
			goingBack={`/entity/pokemon/${pokemon.id}`}
			action={
				<GenSelector
					availableGens={availableGens}
					redirectOnChange={`/entity/moves/pokemon/`}
				/>
			}
		>
			<SectionAds className="mt-4" />
			<div id="pagination-scroll-ref">
				{table.length ? (
					<TableMoveUsage
						tier={pokemon?.tier}
						moves={table}
						ogTable={moves}
						setMoves={setTable}
						usageKey="usageMove"
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				) : !pokemon?.tier || pokemon.tier.name === 'Untiered' ? (
					<p>
						Ce Pokémon n'est pas disponible dans cette génération, veuillez
						sélectionner une autre génération pour obtenir la liste de ces
						capacités.
					</p>
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
				const response = await manageFetch(`pokemons?gen=${gen}`);
				return response.pokemons.map(({ id }) => ({ params: { id } }));
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
		const { moves } = await manageFetch(`moves/pokemon/${id}`);
		const { pokemon, availableGens } = await manageFetch(`pokemons/${id}`);
		return { props: { moves, pokemon, availableGens } };
	} catch (e) {
		console.error(e);
		return redirect404;
	}
};

export default MovePool;
