import useTableSorter from '@/hooks/useTableSorter';
import Type from '@/components/elements/Type';
import { TableBase } from '@/components/table/Table';

const TableType = ({ types = [], setTypes, ogTable }) => {
	const [handleSort, { key: sortedCol, orderDirection }] = useTableSorter({
		table: types,
		handleTable: setTypes,
		ogTable,
		surfaceSort: { nom: ({ nom, name }) => nom || name },
	});

	return (
		<TableBase
			className="table-type"
			cols={[{ key: 'name', content: 'Type', sortable: true }]}
			sortable
			sortedCol={sortedCol}
			orderDirection={orderDirection}
			handleSort={handleSort}
		>
			<tbody>
				{types.map((type, i) => (
					<tr key={i}>
						<td>
							<Type type={type} />
						</td>
					</tr>
				))}
			</tbody>
		</TableBase>
	);
};

export default TableType;
