// modules
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// hooks
import useFetch from '@/hooks/useFetch';
import useLocalStorage from '@/hooks/useLocalStorage';
// actions
import { setUser, setLoadingUser, setUserPicture } from '@/reducers/user';
import { setNotifAction } from '@/reducers/notifs';

// Scroll to top after each route change
const useManageToken = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const { getStoredItem, setItemToStorage } = useLocalStorage();
	const [storage, setStorage] = useState(null);
	const [result, load, loading] = useFetch();
	const [resultUser, loadUser] = useFetch();
	const [resultNotif, loadNotif] = useFetch(true);
	const [interval, saveInterval] = useState(null);

	// Get User from local storage
	useEffect(() => {
		//Component will mount
		if (!user.token && !loading) {
			const storedData = getStoredItem();
			if (storedData) {
				setStorage(storedData);
				if (!user.loading) {
					dispatch(setLoadingUser(true));
				}
				load({ url: 'test', token: storedData.token });
			} else if (user.loading) {
				dispatch(setLoadingUser(false));
			}
		} else if (user.loading) {
			dispatch(setLoadingUser(false));
		}
	}, [user.loading]);

	// Refresh Token
	useEffect(() => {
		if (result) {
			if (result.success) {
				if (user.token) {
					// token is stored from useRefreshToken
					delete storage.token;
					dispatch(setUser(storage));
					loadUser({ url: 'own-user' });
				} else {
					// test success first time
					dispatch(setUser(storage));
					loadUser({ url: 'own-user', token: storage.token });
				}
			} else if (user.loading) {
				dispatch(setLoadingUser(false));
			}
		}
	}, [result]);

	// Check user picture from API
	useEffect(() => {
		if (resultUser?.success) {
			if (resultUser.user && resultUser.user.picture !== user.picture) {
				dispatch(setUserPicture(resultUser.user.picture));
			}
			loadNotif({ url: 'notifications/count' });
		}
	}, [resultUser]);

	useEffect(() => {
		if (resultNotif?.success) {
			dispatch(setNotifAction(resultNotif.count));
		}
	}, [resultNotif]);

	// Update Token
	useEffect(() => {
		if (user.token) {
			if (user.loading) {
				dispatch(setLoadingUser(false));
				return; // dispatch will recall this useEffect so not stored 2 times user.
			}
			// TODO update only if token change
			setItemToStorage(user);
		}
	}, [user]);

	useEffect(() => {
		if (interval) {
			clearInterval(interval);
		}
		if (user.token) {
			loadNotif({ url: 'notifications/count' });
			saveInterval(
				setInterval(() => {
					if (user.id) {
						loadNotif({ url: 'notifications/count' });
					}
				}, 60000)
			);
		}
	}, [user.id]);
};
export default useManageToken;
