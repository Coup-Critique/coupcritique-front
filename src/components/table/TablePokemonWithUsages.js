// module
import React from 'react';
import { TableBase, colorOddRows } from '@/components/table/Table';
import SpritePokemon from '@/components/elements/SpritePokemon';
import Pokemon from '@/components/elements/Pokemon';
import Type from '@/components/elements/Type';
import Tier from '@/components/elements/Tier';
import useTableSorter from '@/hooks/useTableSorter';
import { formatNumbers } from '@/functions';
import PaginationPrettier from '@/components/PaginationPrettier';
import usePager from '@/hooks/usePager';

const TablePokemonWithUsages = ({
	pokemons = [],
	setPokemons,
	usageKey,
	query,
	updateQuery,
	setQueryParam,
}) => {
	const usageKeyVgc = usageKey + 'Vgc';
	const usageKeyBss = usageKey + 'Bss';

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
			percent: pokemon => (pokemon[usageKey] ? pokemon[usageKey].percent : null),
			percentVgc: pokemon =>
				pokemon[usageKeyVgc] ? pokemon[usageKeyVgc].percent : null,
			percentBss: pokemon =>
				pokemon[usageKeyBss] ? pokemon[usageKeyBss].percent : null,
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
					{ key: 'tier', content: 'Tier', sortable: true },
					{ key: 'percent', content: 'Usage', sortable: true },
					{ key: 'percentVgc', content: 'Usage VGC', sortable: true },
					{ key: 'percentBss', content: 'Usage BSS', sortable: true },
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
							<td>
								{!!pokemon[usageKey] && (
									<em className="percent">
										{formatNumbers(pokemon[usageKey].percent, 3)}
										&nbsp;%
									</em>
								)}
							</td>
							<td>
								{!!pokemon[usageKeyVgc] && (
									<em className="percent">
										{formatNumbers(pokemon[usageKeyVgc].percent, 3)}
										&nbsp;%
									</em>
								)}
							</td>
							<td>
								{!!pokemon[usageKeyBss] && (
									<em className="percent">
										{formatNumbers(pokemon[usageKeyBss].percent, 3)}
										&nbsp;%
									</em>
								)}
							</td>
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

export default TablePokemonWithUsages;
