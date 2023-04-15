// module
import React from 'react';
import usePager from '../../hooks/usePager';
import useTableSorter from '../../hooks/useTableSorter';
import Ability from '../elements/Ability';
import PaginationPrettier from '../PaginationPrettier';
import { TableBase, colorOddRows } from './Table';

const TableAbility = ({
	abilities = [],
	setAbilities,
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
	const [handleSort, { key: sortedCol, orderDirection }] = useTableSorter(
		abilities,
		setAbilities,
		{ nom: ({ nom, name }) => nom || name },
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
