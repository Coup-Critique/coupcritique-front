// modules
import { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeMessage } from '@/reducers/messages';

const ADD = 'ADD';
const REMOVE = 'REMOVE';

function messageReducer(state, action) {
	switch (action.type) {
		case ADD:
			return { ...state, [action.key]: action.value } || state;
		case REMOVE:
			const nextState = { ...state };
			delete nextState[action.key];
			return nextState || state;
		default:
			return state;
	}
}

function MessageManager() {
	const dispatch = useDispatch();
	const messages = useSelector(state => state.messages);
	const [displayed, dispatchState] = useReducer(messageReducer, {});

	useEffect(() => {
		Object.entries(messages).forEach(([key, value]) => {
			if (!displayed[key]) {
				dispatchState({ type: ADD, key, value });
				setTimeout(() => {
					dispatch(removeMessage(key));
					dispatchState({ type: REMOVE, key });
				}, Math.ceil(value.length / 20) * 1000);
			}
		});
	}, [messages]);

	// TODO make a success value object
	if (!Object.keys(messages).length) return null;
	return (
		<div className="flash-message-wrapper">
			{Object.values(messages).map((message, i) => {
				if (typeof message.value === 'string') {
					return (
						<div
							key={i}
							className={`flash-message ui message ${message.type}`}
							dangerouslySetInnerHTML={{ __html: message.value }}
						/>
					);
				}
				return (
					<div key={i} className={`flash-message ui message ${message.type}`}>
						{message.value}
					</div>
				);
			})}
		</div>
	);
}
export default MessageManager;
