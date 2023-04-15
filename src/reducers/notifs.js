export const SET_NOTIF = 'setNotif';

export const setNotifAction = notif => ({ type: SET_NOTIF, notif });

const notifReducer = (state = 0, action) => {
	switch (action.type) {
		case SET_NOTIF:
			return action.notif;

		default:
			return state;
	}
};
export default notifReducer;
