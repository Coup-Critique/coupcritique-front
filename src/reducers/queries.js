// constants
export const SET_QUERIES = 'SET_QUERIES';
export const SET_QUERY = 'SET_QUERY';
export const REMOVE_QUERIES = 'REMOVE_QUERIES';
// actions
export const setQueries = value => ({
	type: SET_QUERIES,
	value,
});

export const saveQuery = (name, value) => ({
	type: SET_QUERY,
	name,
	value,
});

export const removeQueries = () => ({ type: REMOVE_QUERIES });

const reducer = (state = {}, action) => {
	switch (action.type) {
		case SET_QUERIES:
			return action.queries || state;

		case SET_QUERY:
			return { ...state, [action.name]: action.value } || state;

		case REMOVE_QUERIES:
			return {};

		default:
			return state;
	}
};

export default reducer;
