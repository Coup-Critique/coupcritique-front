import { makeTimeId } from '../functions';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

/**
 *
 * @param {string|JSX} message
 * @param {bool|string} messageType
 * @param {int|undefined} length # fallback for JSX length
 * @returns
 */
export const addMessage = (message, messageType = false, length = message.length) => ({
	type: ADD_MESSAGE,
	message,
	messageType:
		typeof messageType === 'string' ? messageType : messageType ? 'success' : 'error',
	length,
});

export const removeMessage = timeId => ({
	type: REMOVE_MESSAGE,
	timeId,
});

const reducer = (state = {}, action) => {
	let nextState;

	switch (action.type) {
		case ADD_MESSAGE:
			for (let message of Object.values(state)) {
				if (message.value === action.message) {
					return state;
				}
			}
			nextState = {
				...state,
				[makeTimeId()]: {
					value: action.message,
					type: action.messageType,
					length: action.length,
				},
			};
			return nextState || state;

		case REMOVE_MESSAGE:
			nextState = { ...state };
			delete nextState[action.timeId];
			return nextState || state;

		default:
			return state;
	}
};

export default reducer;
