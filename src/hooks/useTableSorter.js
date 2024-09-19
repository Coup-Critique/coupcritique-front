import { useEffect, useState } from 'react';
import { ASC, DESC } from '@/components/table/Table';

/**
 * @param {*} v1
 * @param {*} v2
 * @param {boolean} ascending
 * @return {number}
 */
export function compareValues(v1, v2, ascending = true) {
	if ((v1 === undefined || v1 === null) && (v2 === undefined || v2 === null)) {
		return 0; // both null
	}
	if (v1 === undefined || v1 === null) {
		return 1; // ASC OR DESC v1 null is last
	}
	if (v2 === undefined || v2 === null) {
		return -1; // ASC OR DESC v2 null is last
	}
	switch (typeof v1) {
		case 'boolean':
		case 'number':
			return ascending ? v1 - v2 : v2 - v1;
		case 'string':
			if (typeof v2 === 'number' || typeof v2 === 'boolean') {
				return ascending ? 1 : -1;
			}
			return ascending ? v1.localeCompare(v2) : v2.localeCompare(v1);
		default:
			return 0;
	}
}

const defaultOrder = { key: '', orderDirection: ASC };
const useTableSorter = ({
	table,
	handleTable,
	ogTable,
	surfaceSort = {},
	deepSort = {},
	query = null,
	updateQuery = null,
}) => {
	const defaultValue =
		query && query.key
			? { key: query.key, orderDirection: query.orderDirection }
			: defaultOrder;
	const [order, setOrder] = useState(defaultValue);

	useEffect(() => {
		if (defaultValue.key) {
			setOrder(defaultValue);
			handleSortTable(table, defaultValue);
		}
	}, [defaultValue.key, defaultValue.orderDirection]);

	const handleSortTable = (tableToSort, orderGiven = order) => {
		if (orderGiven.key) {
			const { key, orderDirection } = orderGiven;
			if (key in deepSort) {
				tableToSort = deepSort[key](tableToSort);
			}
			if (key in surfaceSort) {
				handleTable(sortTable(tableToSort, surfaceSort[key], orderDirection));
			} else {
				handleTable(sortTable(tableToSort, el => el[key], orderDirection));
			}
		} else {
			handleTable(tableToSort);
		}
	};

	const handleSort = (key, tableGiven = table) => {
		let nextOrder = order;
		if (key) {
			if (key === order.key) {
				if (order.orderDirection == DESC) {
					nextOrder = defaultOrder;
					handleTable(ogTable);
					setOrderBuffer(nextOrder);
					return;
				}

				nextOrder = {
					key,
					orderDirection: order.orderDirection === ASC ? DESC : ASC,
				};
			} else {
				nextOrder = { key, orderDirection: ASC };
			}
			setOrderBuffer(nextOrder);
		}
		handleSortTable(tableGiven, nextOrder);
	};

	const setOrderBuffer = order => {
		setOrder(order);
		if (updateQuery) {
			updateQuery(order);
		}
	};

	// prettier-ignore
	// const isSorted = key => order.key === key
	// 	? (order.orderDirection ? ASC : DESC)
	// 	: undefined;

	// prettier-ignore
	const sortTable = (table, callback, orderDirection = order.orderDirection) => table.slice().sort(
		(el1, el2) => compareValues(
			callback(el1),
			callback(el2),
			orderDirection === ASC ? true : false
		)
	);

	return [handleSort, order, sortTable];
};

export default useTableSorter;
