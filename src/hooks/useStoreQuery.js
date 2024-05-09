import { useEffect, useReducer } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
// import { saveQuery } from '@/reducers/queries';
import { objectToGETparams } from '@/functions';
import queryReducer, {
	setQueryAction,
	setQueryParamAction,
	updateQueryAction,
} from '@/reducers/state/queryReducer';
import useActions from '@/hooks/useActions';

/**
 *
 * @param {*} entity
 * @param {*} initQuery
 * @param {...args} params (initQuery additionnals params)
 * @returns
 */
const useStoreQuery = ({ defaultValues = { page: 1 }, saveQueryToStore = false }) => {
	// const dispatch = useDispatch();
	const router = useRouter();
	const urlQuery = router.query;
	// const storedQuery = useSelector(state => state.queries[router.pathname] || {});
	const [query, dispatchQuery] = useReducer(queryReducer, {
		...defaultValues,
		...urlQuery,
		// ...storedQuery,
	});
	const [setQuery, updateQuery, setQueryParam] = useActions(dispatchQuery, [
		setQueryAction,
		updateQueryAction,
		setQueryParamAction,
	]);

	// useEffect(() => {
	// 	if (Object.keys(query).length > 1 || query.page != 1) {
	// 		router.replace(router.pathname + objectToGETparams(query));
	// 	}
	// return () => {
	// 	if (saveQueryToStore) {
	// 		dispatch(saveQuery(router.pathname, query));
	// 	}
	// };
	// }, [query]);

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

	const resetQuery = e => setQuery(defaultValues);

	return [query, setQuery, updateQuery, setQueryParam];
};

export default useStoreQuery;
