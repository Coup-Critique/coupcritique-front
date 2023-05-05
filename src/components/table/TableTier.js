import React from 'react';
import { Link } from 'react-router-dom';
import useTableSorter from '@/hooks/useTableSorter';
import { TableBase } from '@/components/table/Table';

/**
 * Only used on research page
 */
const TableTier = ({ tiers = [], setTiers }) => {
	const [handleSort, { key: sortedCol, orderDirection }] = useTableSorter(
		tiers,
		setTiers
	);

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
							<Link to={`/entity/tiers/${tier.id}`}>{tier.name}</Link>
						</td>
					</tr>
				))}
			</tbody>
		</TableBase>
	);
};

export default TableTier;
