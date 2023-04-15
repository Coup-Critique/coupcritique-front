export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const SET_USER_PICTURE = 'SET_USER_PICTURE';
export const SET_LOADING_USER = 'SET_LOADING_USER';

export const setUser = user => ({
	type: SET_USER,
	user,
});

export const removeUser = () => ({
	type: REMOVE_USER,
});

export const setToken = token => ({
	type: SET_TOKEN,
	token,
});

export const setRefreshToken = token => ({ type: SET_REFRESH_TOKEN, token });

export const setUserPicture = picture => ({
	type: SET_USER_PICTURE,
	picture,
});

export const setLoadingUser = loading => ({
	type: SET_LOADING_USER,
	loading,
});

const reducer = (state = { loading: true }, action) => {
	let nextState;

	switch (action.type) {
		case SET_USER:
			nextState = {
				...state,
				...action.user,
			};
			return nextState || state;

		case SET_USER_PICTURE:
			nextState = {
				...state,
				picture: action.picture,
			};
			return nextState || state;

		case SET_TOKEN:
			nextState = {
				...state,
				token: action.token,
			};
			return nextState || state;

		case SET_REFRESH_TOKEN:
			return { ...state, refreshToken: action.token } || state;

		case SET_LOADING_USER:
			nextState = {
				...state,
				loading: action.loading,
			};
			return nextState || state;

		case REMOVE_USER:
			return {};

		default:
			return state;
	}
};

export default reducer;
