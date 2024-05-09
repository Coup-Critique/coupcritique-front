// modules
import { useEffect, useState } from 'react';
import { objectToGETparams } from '@/functions';
// components
import useStoreQuery from '@/hooks/useStoreQuery';
import { ASC, DESC } from '@/components/table/Table';
import useFetch from '@/hooks/useFetch';

/**
 *
 * @param {string} entityName
 * @param {{
 * 		loadUrl: string,
 * 		saveQueryToStore: bool,
 * 		defaultQuery: object
 * }} parameters
 */
const defaultArray = [];
const useTableFetch = (entityName, parameters = {}, defaultValue, nbPagesGiven = 0) => {
	const { loadUrl, saveQueryToStore = true, defaultQuery } = parameters;
	const [result, load, loading] = useFetch(false);
	const [table, setTable] = useState(defaultValue || defaultArray);
	const [nbPages, setNbPages] = useState(nbPagesGiven);

	const [query, setQuery, updateQuery, setQueryParam] = useStoreQuery({
		saveQueryToStore,
		defaultQuery,
	});

	useEffect(() => {
		if (
			loadUrl !== null &&
			(!defaultValue || Object.keys(query).length > 1 || query.page > 1)
		) {
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
				setTable(defaultArray);
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
