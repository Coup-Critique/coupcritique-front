export const SET_COOKIE = 'setCookie';

export const setCookieAction = (key, value) => ({ type: SET_COOKIE, key, value });

const cookieReducer = (state = {}, action) => {
	switch (action.type) {
		case SET_COOKIE:
			return { ...state, [action.key]: action.value };

		default:
			return state;
	}
};
export default cookieReducer;
