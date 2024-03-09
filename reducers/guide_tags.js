export const SET_GUIDE_TAGS = 'SET_GUIDE_TAGS';
export const REMOVE_GUIDE_TAGS = 'REMOVE_GUIDE_TAGS';

export const setGuideTags = guide_tags => ({ type: SET_GUIDE_TAGS, guide_tags });
export const removeGuideTags = () => ({ type: REMOVE_GUIDE_TAGS });

const reducer = (state = [], action) => {
	switch (action.type) {
		case SET_GUIDE_TAGS: {
			return action.guide_tags;
		}
		case REMOVE_GUIDE_TAGS:
			return [];

		default:
			return state;
	}
};

export default reducer;
