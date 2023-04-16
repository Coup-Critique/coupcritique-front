// modules
import { useEffect, useState } from 'react';
import { objectToGETparams } from '@/functions';
// components
import useStoreQuery from './useStoreQuery';
import { ASC, DESC } from '@/components/table/Table';
import useFetch from './useFetch';

/**
 *
 * @param {string} entityName
 * @param {{
 * 		loadUrl: string,
 * 		saveQueryToStore: bool,
 * 		defaultQuery: object
 * }} parameters
 */
const useTableFetch = (entityName, parameters = {}) => {
	const { loadUrl, saveQueryToStore = true, defaultQuery } = parameters;
	const [result, load, loading] = useFetch(false);
	const [table, setTable] = useState([]);
	const [nbPages, setNbPages] = useState(0);

	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery(
		saveQueryToStore,
		defaultQuery
	);

	useEffect(() => {
		if (loadUrl !== null) {
			handleLoad();
		}
	}, [query, loadUrl]);

	useEffect(() => {
		if (result) {
			if (result.success) {
				setTable(result[entityName]);
				setNbPages(result.nbPages);
				// reset page scroll after load
				const scrollRef = document.getElementById('pagination-scroll-ref');
				setTimeout(() => {
					if (scrollRef && window.scrollY > scrollRef.offsetTop) {
						scrollRef.scrollIntoView({ behavior: 'instant' });
					}
				}, 100);
			} else {
				setTable([]);
				setNbPages(0);
			}
		}
	}, [result]);

	const handleLoad = () =>
		load({ url: (loadUrl || entityName) + objectToGETparams(query) });

	const handleSort = order => {
		if (order && updateQuery) {
			updateQuery({
				order,
				orderDirection:
					order === query.order && query.orderDirection === ASC ? DESC : ASC,
			});
		}
	};

	const handlePage = (e, { activePage }) => {
		// Not working with loaders
		// reset scroll
		// const scrollRef = document.getElementById('pagination-scroll-ref');
		// if (scrollRef && window.scrollY > scrollRef.offsetTop) {
		// 	scrollRef.scrollIntoView({ behavior: 'instant' });
		// }
		if (query) {
			setQueryParam('page', activePage);
		}
	};

	// const handleQuery = (e, { name, value }) => setQueryParam(name, value);

	return {
		table,
		setTable,
		nbPages,
		loading,
		handleLoad,
		query,
		setQuery,
		setQueryParam,
		handlePage,
		handleSort,
	};
};
export default useTableFetch;
