// module
import React from 'react';
import { TableBase, colorOddRows } from './Table';
import Type from '@/components/elements/Type';
import Tier from '@/components/elements/Tier';
import useTableSorter from '@/hooks/useTableSorter';
import { formateName, formatNumbers } from '@/functions';
import PaginationPrettier from '../PaginationPrettier';
import usePager from '@/hooks/usePager';
import { Link } from 'react-router-dom';
import Category from '@/components/elements/Category';

const TableMoveUsage = ({
	tier,
	moves = [],
	setMoves,
	usageKey,
	query,
	updateQuery,
	setQueryParam,
}) => {
	const usageKeyVgc = usageKey + 'Vgc';
	const usageKeyBss = usageKey + 'Bss';

	const [table, page, nbPages, handlePage] = usePager(50, moves, query, setQueryParam);
	const [handleSort, { key: sortedCol, orderDirection }] = useTableSorter(
		moves,
		setMoves,
		{
			nom: ({ nom, name }) => nom || name,
			type: ({ type }) => type.nom || type.name,
			power: ({ power }) => power || 0,
			tier: ({ tier }) =>
				tier
					? tier.sortOrder || (tier.name === 'Untiered' ? null : tier.name)
					: null,
			percent: move => (move[usageKey] ? move[usageKey].percent : null),
			percentVgc: move => (move[usageKeyVgc] ? move[usageKeyVgc].percent : null),
			percentBss: move => (move[usageKeyBss] ? move[usageKeyBss].percent : null),
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
				className={'table-move'}
				cols={[
					{ key: 'nom', content: 'Capacité', sortable: true },
					{ key: 'type', content: 'Type', sortable: true },
					{ key: 'category', content: 'Catégorie', sortable: true },
					{ key: 'power', content: 'Puissance', sortable: true },
					{ key: 'accuracy', content: 'Précision', sortable: true },
					{ key: 'pp', content: 'PP', sortable: true },
					{
						key: 'percent',
						content:
							'Usage '
							+ (!tier || tier.name === 'Untiered'
								? '-'
								: tier.shortName || tier.name),
						sortable: true,
					},
					{ key: 'percentVgc', content: 'Usage VGC', sortable: true },
					{ key: 'percentBss', content: 'Usage BSS', sortable: true },
				]}
				sortable
				sortedCol={sortedCol}
				orderDirection={orderDirection}
				handleSort={handleSort}
			>
				<tbody>
					{table.map((move, i) => (
						<tr key={i} /* className={colorOddRows(i)} */>
							<td>
								<Link to={`/entity/moves/${move.id}`}>
									{move.nom || formateName(move.name)}
								</Link>
							</td>
							<td>
								<Type type={move.type} />
							</td>
							<td>
								<Category category={move.category} />
							</td>
							<td>{!move.power || move.power == 1 ? '-' : move.power}</td>
							<td>
								{!move.accuracy || move.accuracy == 1
									? '-'
									: move.accuracy}
							</td>
							<td>{move.pp ? Math.floor((move.pp * 8) / 5) : '-'}</td>
							<td>
								{!!move[usageKey] && (
									<em className="percent">
										{formatNumbers(move[usageKey].percent, 3)}
										&nbsp;%
									</em>
								)}
							</td>
							<td>
								{!!move[usageKeyVgc] && (
									<em className="percent">
										{formatNumbers(move[usageKeyVgc].percent, 3)}
										&nbsp;%
									</em>
								)}
							</td>
							<td>
								{!!move[usageKeyBss] && (
									<em className="percent">
										{formatNumbers(move[usageKeyBss].percent, 3)}
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

export default TableMoveUsage;
