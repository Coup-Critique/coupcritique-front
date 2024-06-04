import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import queryReducer, {
	setQueryAction,
	setQueryParamAction,
	updateQueryAction,
} from '@/reducers/state/queryReducer';
import useActions from '@/hooks/useActions';
import useLocalStorage from './useLocalStorage';

const useStoreQuery = ({ defaultQuery = { page: 1 }, saveQueryToStore = false } = {}) => {
	const router = useRouter();
	const urlQuery = router.query;
	const { getStoredItem, setItemToStorage } = useLocalStorage();
	const [query, dispatchQuery] = useReducer(queryReducer, defaultQuery, query => ({
		...query,
		...urlQuery,
		...getStoredItem('query_' + router.pathname),
	}));
	const [setQuery, updateQuery, setQueryParam] = useActions(dispatchQuery, [
		setQueryAction,
		updateQueryAction,
		setQueryParamAction,
	]);

	useEffect(() => {
		return () => {
			if (saveQueryToStore) {
				setItemToStorage('query_' + router.pathname, query);
			}
		};
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
