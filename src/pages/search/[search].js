// modules
import { useState, useEffect, Fragment } from 'react';
import { useGetParam } from '@/hooks/useGetParams';
import { Loader } from 'semantic-ui-react';
// components
import TablePokemon from '@/components/table/TablePokemon';
import TableAbility from '@/components/table/TableAbility';
import TableMove from '@/components/table/TableMove';
import TableItem from '@/components/table/TableItem';
import TableType from '@/components/table/TableType';
// functions
import useFetch from '@/hooks/useFetch';
import PageWrapper from '@/components/PageWrapper';
import TableUser from '@/components/table/TableUser';
import TableTier from '@/components/table/TableTier';
import { useSelector } from 'react-redux';
import GenSelector from '@/components/GenSelector';
import SectionAds from '@/components/sections/SectionAds';

const SearchResult = ({ isUser = false }) => {
	const gen = useSelector(state => state.gen);
	const search = useGetParam('search');
	const [pokemons, setPokemons] = useState();
	const [abilities, setAbilities] = useState();
	const [moves, setMoves] = useState();
	const [items, setItems] = useState();
	const [types, setTypes] = useState();
	const [tiers, setTiers] = useState();
	const [users, setUsers] = useState();
	// const [message, setMessage] = useState();
	const [result, load, loading] = useFetch();

	useEffect(() => {
		if (search) {
			let trimedSearch = search.trim();
			if (trimedSearch) {
				load({
					url: isUser
						? `users/search/${trimedSearch}`
						: `search/${trimedSearch}?gen=${gen}`,
				});
			}
		}
	}, [search, gen, isUser]);

	useEffect(() => {
		if (result?.success) {
			setPokemons(result.pokemons);
			setAbilities(result.abilities);
			setMoves(result.moves);
			setItems(result.items);
			setTypes(result.types);
			setTiers(result.tiers);
			setUsers(result.users);
			// setMessage(result.message);
		}
	}, [result]);

	return (
		<PageWrapper
			title="Resultat de la recherche"
			metadescription="Rechercher des données statégiques sur les Pokémon"
			nofollow
			className="search-result"
			more
			goingBack
			action={!isUser && <GenSelector />}
		>
			<div id="pagination-scroll-ref">
				{/* At least one of the 5 entities should have a result */}
				{loading ? (
					<Loader active inline="centered" />
				) : (
					<Fragment>
						{pokemons?.length ||
						abilities?.length ||
						moves?.length ||
						items?.length ||
						types?.length ||
						tiers?.length ||
						users?.length ? (
							<Fragment>
								{types?.length > 0 && (
									<TableType
										types={types}
										setTypes={setTypes}
										ogTable={result.types}
									/>
								)}
								{users?.length > 0 && (
									<TableUser
										users={users}
										setUsers={setUsers}
										ogTable={result.users}
									/>
								)}
								{tiers?.length > 0 && (
									<TableTier
										tiers={tiers}
										setTiers={setTiers}
										ogTable={result.tiers}
									/>
								)}
								{pokemons?.length > 0 && (
									<TablePokemon
										pokemons={pokemons}
										setPokemons={setPokemons}
										ogTable={result.pokemons}
									/>
								)}
								{abilities?.length > 0 && (
									<TableAbility
										abilities={abilities}
										setAbilities={setAbilities}
										ogTable={result.abilities}
									/>
								)}
								{moves?.length > 0 && (
									<TableMove
										moves={moves}
										setMoves={setMoves}
										ogTable={result.moves}
									/>
								)}
								{items?.length > 0 && (
									<TableItem
										items={items}
										setItems={setItems}
										ogTable={result.items}
									/>
								)}
							</Fragment>
						) : (
							<p>Aucun résultat.</p>
						)}
					</Fragment>
				)}
			</div>
			<SectionAds className="mt-4" />
		</PageWrapper>
	);
};
export default SearchResult;
