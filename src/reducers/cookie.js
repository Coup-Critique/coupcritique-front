export const SET_COOKIE = 'setCookie';

export const setCookieAction = cookie => ({ type: SET_COOKIE, cookie });

const cookieReducer = (state = {}, action) => {
	switch (action.type) {
		case SET_COOKIE:
			return action.cookie || state;

		default:
			return state;
	}
};
export default cookieReducer;
