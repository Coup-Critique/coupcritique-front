// module
import React from 'react';
import { TableBase, colorOddRows } from './Table';
import SpritePokemon from '@/components/elements/SpritePokemon';
import Pokemon from '@/components/elements/Pokemon';
import Type from '@/components/elements/Type';
import Ability from '@/components/elements/Ability';
import Tier from '@/components/elements/Tier';
import useTableSorter from '@/hooks/useTableSorter';
import usePager from '@/hooks/usePager';
import PaginationPrettier from '../PaginationPrettier';
import { useSelector } from 'react-redux';

const TablePokemon = ({
	pokemons = [],
	setPokemons,
	query,
	updateQuery,
	setQueryParam,
}) => {
	const gen = useSelector(state => state.gen);
	const [table, page, nbPages, handlePage] = usePager(
		50,
		pokemons,
		query,
		setQueryParam
	);
	const [handleSort, { key: sortedCol, orderDirection }] = useTableSorter(
		pokemons,
		setPokemons,
		{
			nom: ({ nom, name }) => nom || name,
			type_1: ({ type_1 }) => type_1.nom || type_1.name,
			tier: ({ tier }) =>
				tier
					? tier.sortOrder || (tier.name === 'Untiered' ? null : tier.name)
					: null,
		},
		undefined,
		query,
		updateQuery
	);

	return (
		<>
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
			<TableBase
				className={'table-pokemon table-sticky'}
				cols={[
					' ',
					{ key: 'nom', content: 'Pokémon', sortable: true },
					{ key: 'type_1', content: 'Type', sortable: true },
					gen > 2 && { key: 'ability', content: 'Talent', sortable: false },
					{ key: 'tier', content: 'Tier', sortable: true },
					{ key: 'hp', content: 'PV', sortable: true },
					{ key: 'atk', content: 'Atq', sortable: true },
					{ key: 'def', content: 'Déf', sortable: true },
					{ key: 'spa', content: 'Atq\u00A0Spé', sortable: true },
					{ key: 'spd', content: 'Déf\u00A0Spé', sortable: true },
					{ key: 'spe', content: 'Vit', sortable: true },
					{ key: 'bst', content: 'BST', sortable: true },
				]}
				sortable
				sortedCol={sortedCol}
				orderDirection={orderDirection}
				handleSort={handleSort}
			>
				<tbody>
					{table.map((pokemon, i) => (
						<tr key={i} /* className={colorOddRows(i)} */>
							<td>
								<SpritePokemon pokemon={pokemon} />
							</td>
							<td>
								<Pokemon pokemon={pokemon} />
							</td>
							<td className="text-left">
								<Type type={pokemon.type_1} />
								{!!pokemon.type_2 && <Type type={pokemon.type_2} />}
							</td>
							{gen > 2 && (
								<td>
									{!!pokemon.ability_1 && (
										<Ability ability={pokemon.ability_1} />
									)}
									{!!pokemon.ability_2 && (
										<Ability ability={pokemon.ability_2} />
									)}
									{!!pokemon.ability_hidden && (
										<Ability ability={pokemon.ability_hidden} />
									)}
								</td>
							)}
							<td>
								{pokemon.tier ? (
									<Tier
										displayGen={false}
										tier={pokemon.tier}
										technically={pokemon.technically}
									/>
								) : (
									'-'
								)}
							</td>
							<td>{pokemon.hp}</td>
							<td>{pokemon.atk}</td>
							<td>{pokemon.def}</td>
							<td>{pokemon.spa}</td>
							<td>{pokemon.spd}</td>
							<td>{pokemon.spe}</td>
							<td>{pokemon.bst}</td>
						</tr>
					))}
				</tbody>
			</TableBase>
			{nbPages > 1 && (
				<PaginationPrettier
					activePage={page}
					totalPages={nbPages}
					onPageChange={handlePage}
				/>
			)}
		</>
	);
};

export default TablePokemon;
