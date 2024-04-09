// module

import { makeClassName } from '@/functions';

export const ASC = 'ascending';
export const DESC = 'descending';

export function colorOddRows(k) {
	// Set backgroundcolor to odd rows
	if (k === undefined || k % 2 === 0) return;
	return 'tr-colored';
}
export function colorEvenRows(k) {
	// Set backgroundcolor to even rows
	if (k === undefined || k % 2 === 1) return;
	return 'tr-colored';
}

function displayValue(value) {
	switch (typeof value) {
		case 'boolean':
			return value ? 'Oui' : 'Non';
		case 'string':
		case 'number':
			return value;
		default:
			return null;
	}
}

export const TableBase = ({
	className = '',
	cols,
	children,
	sortable = false,
	orderDirection,
	sortedCol,
	handleSort,
}) => (
	<div className="table-wrapper">
		<table className={makeClassName('table', sortable && 'sortable', className)}>
			<thead>
				<tr>
					{cols.map((col, i) => {
						if (!col) return null;
						if (typeof col !== 'object') {
							return <th key={i}>{col}</th>;
						}
						const { key, content, sortable, className, ...props } = col;

						return (
							<th
								key={key}
								{...props}
								className={makeClassName(
									sortable && 'sortable',
									sortedCol === key && orderDirection,
									className
								)}
								onClick={sortable ? e => handleSort(key) : undefined}
							>
								{content}
							</th>
						);
					})}
				</tr>
			</thead>
			{children}
		</table>
	</div>
);

const Table = ({ table, cols, className }) => (
	<TableBase className={className} cols={cols}>
		<tbody>
			{table.map((el, i) => (
				<tr
					key={
						i
					} /* className={cols.length ? colorOddRows(i) : colorEvenRows(i)} */
				>
					{cols.map((col, i) => {
						if (!col) return null;
						if (typeof col !== 'object') {
							return <td key={i}>{displayValue(el[i])}</td>;
						}
						return <td key={col.key}>{displayValue(el[col.key])}</td>;
					})}
				</tr>
			))}
		</tbody>
	</TableBase>
);

export default Table;
