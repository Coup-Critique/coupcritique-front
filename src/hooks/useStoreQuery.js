import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import queryReducer, {
	setQueryAction,
	setQueryParamAction,
	updateQueryAction,
} from '@/reducers/state/queryReducer';
import useActions from '@/hooks/useActions';
import useLocalStorage from './useLocalStorage';
import { objectCompare } from '@/functions';

const useStoreQuery = ({ defaultQuery = { page: 1 }, saveQueryToStore = false } = {}) => {
	const router = useRouter();
	const urlQuery = router.query;
	const { getStoredItem, setItemToStorage } = useLocalStorage();
	const [query, dispatchQuery] = useReducer(queryReducer, defaultQuery, query => ({
		...query,
		...urlQuery,
	}));
	const [setQuery, updateQuery, setQueryParam] = useActions(dispatchQuery, [
		setQueryAction,
		updateQueryAction,
		setQueryParamAction,
	]);

	useEffect(() => {
		if (saveQueryToStore) {
			const storedItem = getStoredItem('query_' + router.pathname);
			if (storedItem) {
				const timeDiff = (Date.now() - storedItem.timestamp) / 3600000;
				if (
					timeDiff < 1 &&
					storedItem.query &&
					objectCompare(storedItem.query, query) === false
				) {
					setQuery({
						...query,
						...storedItem.query,
					});
				}
			}
		}
	}, []);

	useEffect(() => {
		if (saveQueryToStore) {
			if (objectCompare(query, defaultQuery) === true) {
				setItemToStorage(null, 'query_' + router.pathname);
			} else {
				setItemToStorage(
					{ query, timestamp: Date.now() },
					'query_' + router.pathname
				);
			}
		}
	}, [query]);

	useEffect(() => {
		const entityLinks = document.querySelectorAll(
			'.navbar-nav .nav-item .nav-link.active, .navbar-nav .nav-item .item.active'
		);
		entityLinks.forEach(entityLink =>
			entityLink.addEventListener('click', resetQuery)
		);
		return () =>
			entityLinks.forEach(entityLink =>
				entityLink.removeEventListener('click', resetQuery)
			);
	}, []);

	const resetQuery = e => setQuery(defaultQuery);

	return [query, setQuery, updateQuery, setQueryParam];
};

export default useStoreQuery;
