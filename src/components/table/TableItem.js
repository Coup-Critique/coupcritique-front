// module
import React from 'react';
import { TableBase, colorOddRows } from '@/components/table/Table';
import SpriteItem from '@/components/elements/SpriteItem';
import Item from '@/components/elements/Item';
import useTableSorter from '@/hooks/useTableSorter';
import usePager from '@/hooks/usePager';
import PaginationPrettier from '@/components/PaginationPrettier';

const TableItem = ({ items = [], setItems, query, updateQuery, setQueryParam }) => {
	const [table, page, nbPages, handlePage] = usePager(100, items, query, setQueryParam);
	const [handleSort, { key: sortedCol, orderDirection }] = useTableSorter(
		items,
		setItems,
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
				className={'table-item'}
				cols={[
					' ',
					{ key: 'nom', content: 'Objet', sortable: true },
					{
						key: 'description',
						className: 'text-left',
						content: 'Description',
					},
				]}
				sortable
				sortedCol={sortedCol}
				orderDirection={orderDirection}
				handleSort={handleSort}
			>
				<tbody>
					{table.map((item, i) => (
						<tr key={i} /* className={colorOddRows(i)} */>
							<td>
								<SpriteItem item={item} noPopup />
							</td>
							<td>
								<Item item={item} noPopup />
							</td>
							<td className="text-left">{item.description}</td>
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

export default TableItem;
