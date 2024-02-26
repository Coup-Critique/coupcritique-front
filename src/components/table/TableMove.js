// module
// import Link from 'next/link';
import { TableBase } from '@/components/table/Table';
import { formateName } from '@/functions';
import Type from '@/components/elements/Type';
import Category from '@/components/elements/Category';
import useTableSorter from '@/hooks/useTableSorter';
import usePager from '@/hooks/usePager';
import PaginationPrettier from '@/components/PaginationPrettier';
import SectionAds from '@/components/sections/SectionAds';

const TableMove = ({ moves = [], setMoves, query, updateQuery, setQueryParam }) => {
	const [table, page, nbPages, handlePage] = usePager(100, moves, query, setQueryParam);
	const [handleSort, { key: sortedCol, orderDirection }] = useTableSorter(
		moves,
		setMoves,
		{
			nom: ({ nom, name }) => nom || name,
			type: ({ type }) => type.nom || type.name,
			power: ({ power }) => power || 0,
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
				className={'table-move table-sticky'}
				cols={[
					{ key: 'nom', content: 'Capacité', sortable: true },
					{ key: 'type', content: 'Type', sortable: true },
					{ key: 'category', content: 'Catégorie', sortable: true },
					{ key: 'power', content: 'Puissance', sortable: true },
					{ key: 'accuracy', content: 'Précision', sortable: true },
					{ key: 'pp', content: 'PP', sortable: true },
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
								<a href={`/entity/moves/${move.id}`}>
									{move.nom || formateName(move.name)}
								</a>
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
						</tr>
					))}
				</tbody>
			</TableBase>
			<SectionAds className="mt-4" />
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

export default TableMove;
