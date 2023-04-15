import { useEffect, useReducer } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
// import { saveQuery } from '../reducers/queries';
import { objectToGETparams } from '../functions';
import queryReducer, {
	setQueryAction,
	setQueryParamAction,
	updateQueryAction,
} from '../reducers/state/queryReducer';
import useActions from './useActions';

const parseUrlQuery = queryParams =>
	queryParams
		.substring(1) // removes "?"
		.split('&')
		.reduce((paramsObject, param) => {
			const [key, value] = param.split('=');
			if (key && value) {
				paramsObject[key] = decodeURIComponent(value);
			}
			return paramsObject;
		}, {});

/**
 *
 * @param {*} entity
 * @param {*} initQuery
 * @param {...args} params (initQuery additionnals params)
 * @returns
 */
const useStoreQuery = (saveQueryToStore = false, defaultValues = { page: 1 }) => {
	// const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	// const storedQuery = useSelector(state => state.queries[location.pathname] || {});
	const { search } = useLocation();
	const urlQuery = parseUrlQuery(search);
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

	useEffect(() => {
		if (location.search || Object.keys(query).length > 1 || query.page != 1) {
			history.replace(location.pathname + objectToGETparams(query));
		}
		// return () => {
		// 	if (saveQueryToStore) {
		// 		dispatch(saveQuery(location.pathname, query));
		// 	}
		// };
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

	const resetQuery = e => setQuery(defaultValues);

	return [query, setQuery, updateQuery, setQueryParam];
};

export default useStoreQuery;
