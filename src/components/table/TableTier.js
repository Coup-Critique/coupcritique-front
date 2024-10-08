import Link from 'next/link';
import useTableSorter from '@/hooks/useTableSorter';
import { TableBase } from '@/components/table/Table';

/**
 * Only used on research page
 */
const TableTier = ({ tiers = [], setTiers, ogTable }) => {
	const [handleSort, { key: sortedCol, orderDirection }] = useTableSorter({
		table: tiers,
		handleTable: setTiers,
		ogTable,
	});

	return (
		<TableBase
			className="table-tier"
			cols={[{ key: 'name', content: 'Tier', sortable: true }]}
			sortable
			sortedCol={sortedCol}
			orderDirection={orderDirection}
			handleSort={handleSort}
		>
			<tbody>
				{tiers.map((tier, i) => (
					<tr key={i}>
						<td>
							<Link href={`/entity/tiers/${tier.id}`}>{tier.name}</Link>
						</td>
					</tr>
				))}
			</tbody>
		</TableBase>
	);
};

export default TableTier;
