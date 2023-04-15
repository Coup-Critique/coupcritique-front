export const SET_ACTUALITY_TAGS = 'SET_ACTUALITY_TAGS';
export const REMOVE_ACTUALITY_TAGS = 'REMOVE_ACTUALITY_TAGS';

export const setActualityTags = actuality_tags => ({ type: SET_ACTUALITY_TAGS, actuality_tags });
export const removeActualityTags = () => ({ type: REMOVE_ACTUALITY_TAGS });

const reducer = (state = [], action) => {
	switch (action.type) {
		case SET_ACTUALITY_TAGS: {
			return action.actuality_tags;
		}
		case REMOVE_ACTUALITY_TAGS:
			return [];

		default:
			return state;
	}
};

export default reducer;
