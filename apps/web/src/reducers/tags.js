export const SET_TAGS = 'SET_TAGS';
export const REMOVE_TAGS = 'REMOVE_TAGS';

export const setTags = tags => ({ type: SET_TAGS, tags });
export const removeTags = () => ({ type: REMOVE_TAGS });

const reducer = (state = [], action) => {
	switch (action.type) {
		case SET_TAGS:
			return action.tags;

		case REMOVE_TAGS:
			return [];

		default:
			return state;
	}
};

export default reducer;
