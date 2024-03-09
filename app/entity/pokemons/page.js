// modules
import { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
// components
import PageWrapper from '@/components/PageWrapper';
import TablePokemon from '@/components/table/TablePokemon';
import GenSelector from '@/components/GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';
import useFetchListByGen from '@/hooks/useFetchListByGen';
import { manageFetch } from '@/hooks/useFetch';

const PokemonList = props => {
	const [pokemons, setPokemons, loading] = useFetchListByGen(
		'pokemons',
		props.pokemons
	);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	return (
		<PageWrapper
			title="Liste des Pokémon"
			more
			metatitle="Pokedex | Coup Critique Stratégie Pokémon"
			description="Liste de Pokémon dans l'ordre du Pokédex avec toutes leurs formes. Accédez à leur fiche stratégique. Retrouvez rapidement les informations concernant leur tier ou statistiques."
			action={<GenSelector />}
		>
			<div id="pagination-scroll-ref">
				{loading ? (
					<Loader active inline="centered" />
				) : pokemons && pokemons.length ? (
					<TablePokemon
						pokemons={pokemons}
						setPokemons={setPokemons}
						query={query}
						updateQuery={updateQuery}
						setQueryParam={setQueryParam}
					/>
				) : (
					<p>Aucun Pokémon trouvé.</p>
				)}
			</div>
		</PageWrapper>
	);
};

export const getStaticProps = async () => {
	try {
		const response = await manageFetch('pokemons');
		const pokemons = response.pokemons || [];
		return { props: { pokemons } };
	} catch (e) {
		console.error(e);
		return { props: { pokemons: [] } };
	}
};

export default PokemonList;
