// modules
import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
// hooks
import useFetch from '@/hooks/useFetch';
// functions
import { capitalize } from '@/functions';
// constants
import { entities, entitiesTranslation, entitiesWithGen } from '@/constants/entities';
// components
import PageWrapper from '../PageWrapper';
import TablePokemon from '@/components/table/TablePokemon';
import TableMove from '@/components/table/TableMove';
import TableAbility from '@/components/table/TableAbility';
import TableItem from '@/components/table/TableItem';
// import TableType from '@/components/table/TableType';
// import TableUser from '@/components/table/TableUser';
import TierList from '@/pages/list/TierList';
import GenSelector from '../GenSelector';
import TypeList from '@/pages/list/TypeList';
import useStoreQuery from '@/hooks/useStoreQuery';
import MetaData from '../MetaData';

const ListRouter = () => {
	const history = useHistory();
	const { user, gen } = useSelector(state => state);
	const { type } = useParams();
	const [result, load, loading] = useFetch();
	const [table, setTable] = useState({});
	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(true);

	useEffect(() => {
		if (!entities[type]) return history.push('/404');
		if (!user.loading)
			load({
				url: entities[type] + (entitiesWithGen[type] ? `?gen=${gen}` : ''),
			});
	}, [type, gen, user, user.loading]);

	useEffect(() => {
		if (result && result[type]) {
			setTable(result);
		}
	}, [result]);

	const handleTable = nextTable => setTable({ [type]: nextTable });

	if (!entities[type]) return <Redirect to={'/404'} />;
	return (
		<PageWrapper
			title={`Liste des ${capitalize(entitiesTranslation[type])}`}
			more
			metatitle={null}
		>
			{!!entitiesWithGen[type] && <GenSelector />}
			<div id="pagination-scroll-ref">
				{loading || user.loading ? (
					<Loader active inline="centered" />
				) : table[type] && table[type].length ? (
					<Switch>
						<Route path="/entity/pokemons" exact>
							<MetaData
								title="Pokedex | Coup Critique Stratégie Pokémon"
								description="Liste de Pokémon dans l'ordre du Pokédex avec toutes leurs formes. Accédez à leur fiche stratégique. Retrouvez rapidement les informations concernant leur tier ou statistiques."
							/>
							<TablePokemon
								pokemons={table[type]}
								setPokemons={handleTable}
								query={query}
								updateQuery={updateQuery}
								setQueryParam={setQueryParam}
							/>
						</Route>
						<Route path="/entity/moves" exact>
							<MetaData
								title="Capacités des Pokémon | Coup Critique Stratégie Pokémon"
								description="Liste de capacités dans Pokémon. Accédez la liste des Pokémon pouvant apprendre chaque attaque avec son taux d'utilisation. Retrouvez rapidement les données des capacités."
							/>
							<TableMove
								moves={table[type]}
								setMoves={handleTable}
								query={query}
								updateQuery={updateQuery}
								setQueryParam={setQueryParam}
							/>
						</Route>
						<Route path="/entity/abilities" exact>
							<MetaData
								title="Talents des Pokémons | Coup Critique Stratégie Pokémon"
								description="Liste des talents dans Pokémon. Accédez la liste des Pokémon possédant chaque capacité spéciale avec son taux d'utilisation."
							/>
							<TableAbility
								abilities={table[type]}
								setAbilities={handleTable}
								query={query}
								updateQuery={updateQuery}
								setQueryParam={setQueryParam}
							/>
						</Route>
						<Route path="/entity/items" exact>
							<MetaData
								title="Objets des Pokémon | Coup Critique Stratégie Pokémon"
								description="Liste de objets portables dans Pokémon. Accédez à la liste des Pokémon utilisant chaque objet avec son taux d'utilisation."
							/>
							<TableItem
								items={table[type]}
								setItems={handleTable}
								query={query}
								updateQuery={updateQuery}
								setQueryParam={setQueryParam}
							/>
						</Route>
						<Route path="/entity/tiers" exact>
							<MetaData
								title="Tiers Smogon et des formats officiels Pokémon | Coup Critique Stratégie Pokémon"
								description="Liste des tiers Smogon et des formats officiels de Pokémon. Retrouvez-y la liste des Pokémon viables dans chaque tier ainsi que des ressources associées."
							/>
							<TierList tiers={table[type]} setTiers={handleTable} />
						</Route>
						<Route path="/entity/types" exact>
							<MetaData
								title="Types des Pokémon | Coup Critique Stratégie Pokémon"
								description="Liste des types des Pokémon. Filtrer les Pokémons par leur type."
							/>
							{/* <TableType types={table[type]} setTypes={handleTable} /> */}
							<TypeList types={table[type]} setTypes={handleTable} />
						</Route>
						{/* <Route path="/entity/users" exact>
						<TableUser users={table[type]} setUsers={handleTable} />
					</Route> */}
					</Switch>
				) : (
					<p>Aucun {entitiesTranslation[type]} trouvé.</p>
				)}
			</div>
		</PageWrapper>
	);
};
export default ListRouter;
