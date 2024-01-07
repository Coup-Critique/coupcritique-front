// modules
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// actions
import { setToken, setRefreshToken, setUser } from '@/reducers/user';
// hooks
import useLocalStorage from '@/hooks/useLocalStorage';
import useLogout from '@/hooks/useLogout';
import { JSON_TYPE, manageFetch } from '@/hooks/useFetch';
import { POST } from '@/constants/methods';
import { addMessage, removeMessage } from '@/reducers/messages';
import { Loader } from 'semantic-ui-react';

const useRefreshToken = result => {
	const dispatch = useDispatch();
	const logout = useLogout();
	const user = useSelector(state => state.user);
	const messages = useSelector(state => state.messages);
	const { getStoredItem, setItemToStorage } = useLocalStorage();
	const [orderRemoveMessage, setOrderRemoveMessage] = useState(false);

	// Called after useFetch.load catch an error
	const refreshToken = async (url, params) => {
		try {
			// Use useFetch.manageFetch to load is own request
			// This try catch is an equivalent of the one in useFetch.load
			const storedData = getStoredItem();
			if (storedData) {
				addConnectionMessage();
				const refreshResult = await manageFetch('token/refresh', {
					method: POST,
					headers: { 'Content-Type': JSON_TYPE },
					body: JSON.stringify({ refresh_token: storedData.refreshToken }),
				});

				if (refreshResult.success) {
					// udpate storage here to prevent it to be erased by setToken
					const storage = getStoredItem();
					if (refreshResult.refreshToken) {
						storage.refreshToken = refreshResult.refreshToken;
					}
					storage.token = refreshResult.token;
					dispatch(setUser(storage));

					setOrderRemoveMessage(true);
					params.headers.Authorization = `Bearer ${refreshResult.token}`;
					// Reload the original request
					// Set this manageFetch result as useFetch.result
					// Reload errors are managed by manageError from manageFetch
					// manageError throwing is received by this try catch, so logout
					return manageFetch(url, params);
				}
				// Else throw the error to logout.
				throw refreshResult;
			}
			throw new Error('Session corrompue.');
		} catch (e) {
			setOrderRemoveMessage(true);
			logout();
			return {};
		}
	};

	// Listen for result.token/refreshToken update from any request if user is logged
	useEffect(() => {
		if (user.token && result?.success && result.token) {
			if (result.refresh_token) {
				dispatch(setRefreshToken(result.refresh_token));
			}
			dispatch(setToken(result.token));
		}
	}, [result]);

	// Update Local Storage when token is updated
	useEffect(() => {
		if (user.token) {
			setItemToStorage(user);
		}
	}, [user.token, user.refreshToken]);

	useEffect(() => {
		if (orderRemoveMessage) {
			const message = Object.entries(messages).find(
				([key, value]) => value.warning
			);
			if (message) {
				const [uuid, value] = message;
				dispatch(removeMessage(uuid));
			}
			setOrderRemoveMessage(false);
		}
	}, [orderRemoveMessage]);

	const addConnectionMessage = () => {
		dispatch(
			addMessage(
				<>
					<Loader active size="tiny" /> Reconnexion
				</>,
				'warning',
				'Reconnexion'.length + 2
			)
		);
	};

	return refreshToken;
};

export default useRefreshToken;
