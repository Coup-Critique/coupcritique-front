export const SET_CHOSEN_SEARCH = 'SET_CHOSEN_SEARCH';

export const setChosenSearch = (search) => ({
	type: SET_CHOSEN_SEARCH,
	search
});

const reducer = (
	state = {
		header_search: '',
		main_search: '',
		chosen_search: '',
	},
	action
) => {
	switch (action.type) {
		case SET_CHOSEN_SEARCH:
			return {
				...state,
				header_search: '',
				main_search: '',
				chosen_search: action.search,
			};
		default:
			return state;
	}
};

export default reducer;
