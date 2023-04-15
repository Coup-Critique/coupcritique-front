export const SET_SSR_DATA = 'setSsrData';

export const setSsrDataAction = ssrData => ({ type: SET_SSR_DATA, ssrData });

const ssrDataReducer = (state = null, action) => {
	switch (action.type) {
		case SET_SSR_DATA:
			return action.ssrData;

		default:
			return state;
	}
};
export default ssrDataReducer;
