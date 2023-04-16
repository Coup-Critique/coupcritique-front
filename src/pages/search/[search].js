// modules
import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
// components
import TablePokemon from '@/components/table/TablePokemon';
import TableAbility from '@/components/table/TableAbility';
import TableMove from '@/components/table/TableMove';
import TableItem from '@/components/table/TableItem';
import TableType from '@/components/table/TableType';
// functions
import useFetch from '@/hooks/useFetch';
import PageWrapper from '../../PageWrapper';
import TableUser from '@/components/table/TableUser';
import TableTier from '@/components/table/TableTier';
import { useSelector } from 'react-redux';
import GenSelector from '../../GenSelector';
import SectionAds from '@/components/sections/SectionAds';

const SearchResult = ({ isUser = false }) => {
	const gen = useSelector(state => state.gen);
	const { search } = useParams();
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
		if (result && result.success) {
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
		>
			{!isUser && <GenSelector />}
			<div id="pagination-scroll-ref">
				{/* At least one of the 5 entities should have a result */}
				{loading ? (
					<Loader active inline="centered" />
				) : (
					<Fragment>
						{(pokemons && pokemons.length) ||
						(abilities && abilities.length) ||
						(moves && moves.length) ||
						(items && items.length) ||
						(types && types.length) ||
						(tiers && tiers.length) ||
						(users && users.length) ? (
							<Fragment>
								{types && types.length > 0 && (
									<TableType types={types} setTypes={setTypes} />
								)}
								{users && users.length > 0 && (
									<TableUser users={users} setUsers={setUsers} />
								)}
								{tiers && tiers.length > 0 && (
									<TableTier tiers={tiers} setTiers={setTiers} />
								)}
								{pokemons && pokemons.length > 0 && (
									<TablePokemon
										pokemons={pokemons}
										setPokemons={setPokemons}
									/>
								)}
								{abilities && abilities.length > 0 && (
									<TableAbility
										abilities={abilities}
										setAbilities={setAbilities}
									/>
								)}
								{moves && moves.length > 0 && (
									<TableMove moves={moves} setMoves={setMoves} />
								)}
								{items && items.length > 0 && (
									<TableItem items={items} setItems={setItems} />
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
