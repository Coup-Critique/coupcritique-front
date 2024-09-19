// module

import usePager from '@/hooks/usePager';
import useTableSorter from '@/hooks/useTableSorter';
import Ability from '@/components/elements/Ability';
import PaginationPrettier from '@/components/PaginationPrettier';
import { TableBase, colorOddRows } from '@/components/table/Table';

const TableAbility = ({
	abilities = [],
	setAbilities,
	ogTable,
	query,
	updateQuery,
	setQueryParam,
}) => {
	const [table, page, nbPages, handlePage] = usePager(
		100,
		abilities,
		query,
		setQueryParam
	);
	const [handleSort, { key: sortedCol, orderDirection }] = useTableSorter({
		table: abilities,
		handleTable: setAbilities,
		ogTable,
		surfaceSort: { nom: ({ nom, name }) => nom || name },
		query,
		updateQuery,
	});

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
				className={'table-ability'}
				cols={[
					{ key: 'nom', content: 'Talent', sortable: true },
					{
						key: 'description',
						content: 'Description',
						className: 'text-left',
					},
				]}
				sortable
				sortedCol={sortedCol}
				orderDirection={orderDirection}
				handleSort={handleSort}
			>
				<tbody>
					{table.map((ability, i) => (
						<tr key={i} /* className={colorOddRows(i)} */>
							<td className="text-left">
								<Ability ability={ability} noPopup />
							</td>
							<td className="text-left">{ability.description}</td>
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

export default TableAbility;
