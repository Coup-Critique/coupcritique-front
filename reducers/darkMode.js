export const SET_DARK_MODE = 'setDarkMode';

export const setDarkModeAction = darkMode => ({ type: SET_DARK_MODE, darkMode });

const reducer = (state = true, action) => {
	switch (action.type) {
		case SET_DARK_MODE:
			return action.darkMode;

		default:
			return state;
	}
};

export default reducer;
