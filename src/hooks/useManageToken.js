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
	const [resultNotif, loadNotif] = useFetch(true);
	const [interval, saveInterval] = useState(null);

	// Get User from local storage
	useEffect(() => {
		if (!user.token) {
			const storedData = getStoredItem();
			if (storedData) {
				dispatch(setUser(storedData));
			}
		}
		if (user.loading) {
			dispatch(setLoadingUser(false));
		}
	}, [user.loading]);

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
	}, [user.token, user.loading]);

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
