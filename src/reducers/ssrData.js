export const SET_SSR_DATA = 'setSsrData';
export const REMOVE_SSR_DATA = 'setRemoveData';

export const setSsrDataAction = ssrData => ({ type: SET_SSR_DATA, ssrData });
export const removeSsrDataAction = key => ({ type: REMOVE_SSR_DATA, key });

const ssrDataReducer = (state = null, action) => {
	switch (action.type) {
		case SET_SSR_DATA:
			return action.ssrData;

		case REMOVE_SSR_DATA:
			return null;

		default:
			return state;
	}
};
export default ssrDataReducer;
