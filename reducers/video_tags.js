export const SET_VIDEO_TAGS = 'SET_VIDEO_TAGS';
export const REMOVE_VIDEO_TAGS = 'REMOVE_VIDEO_TAGS';

export const setVideoTags = video_tags => ({ type: SET_VIDEO_TAGS, video_tags });
export const removeVideoTags = () => ({ type: REMOVE_VIDEO_TAGS });

const reducer = (state = [], action) => {
	switch (action.type) {
		case SET_VIDEO_TAGS: {
			return action.video_tags;
		}
		case REMOVE_VIDEO_TAGS:
			return [];

		default:
			return state;
	}
};

export default reducer;
