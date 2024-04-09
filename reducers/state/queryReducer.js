export const SET_QUERY = 'setQuery';
export const SET_QUERY_PARAM = 'setQueryParam';
export const UPDATE_QUERY = 'updateQuery';

export const setQueryParamAction = (param, value) => ({
	type: SET_QUERY_PARAM,
	param,
	value,
});
export const setQueryAction = value => ({
	type: SET_QUERY,
	value,
});
export const updateQueryAction = value => ({
	type: UPDATE_QUERY,
	value,
});

function queryReducer(state = {}, action) {
	switch (action.type) {
		case SET_QUERY:
			return action.value;

		case SET_QUERY_PARAM:
			return { ...state, [action.param]: action.value };

		case UPDATE_QUERY:
			return { ...state, ...action.value };

		default:
			return state;
	}
}
export default queryReducer;
