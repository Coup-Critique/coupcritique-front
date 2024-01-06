// modules
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
// hooks
import useFetch from '@/hooks/useFetch';
// components
import PageWrapper from '@/components/PageWrapper';
import TablePokemon from '@/components/table/TablePokemon';
import GenSelector from '@/components/GenSelector';
import useStoreQuery from '@/hooks/useStoreQuery';

const PokemonList = () => {
	const gen = useSelector(state => state.gen);
	const [result, load, loading] = useFetch();
	const [pokemons, setPokemons] = useState([]);
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	useEffect(() => {
		load({ url: `pokemons?gen=${gen}` });
	}, [gen]);

	useEffect(() => {
		if (result?.pokemons) {
			setPokemons(result.pokemons);
		}
	}, [result]);

	return (
		<PageWrapper
			title="Liste des Pokémon"
			more
			metatitle="Pokedex | Coup Critique Stratégie Pokémon"
			description="Liste de Pokémon dans l'ordre du Pokédex avec toutes leurs formes. Accédez à leur fiche stratégique. Retrouvez rapidement les informations concernant leur tier ou statistiques."
		>
			<GenSelector />
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
export default PokemonList;
