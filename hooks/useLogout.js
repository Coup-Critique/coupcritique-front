'use client';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '@/reducers/user';
import { addMessage } from '@/reducers/messages';
import { STORAGE_KEY } from '@/hooks/useLocalStorage';
import { setNotifAction } from '@/reducers/notifs';

const useLogout = () => {
	const dispatch = useDispatch();
	const logout = useCallback(() => {
		// Remove the token from the browser on logout.
		localStorage.removeItem(STORAGE_KEY);
		// localStorage.clear();
		dispatch(addMessage('Déconnecté', true));
		dispatch(setNotifAction(0));
		dispatch(removeUser());
		// Redirection to landing page
	}, [dispatch]);
	return logout;
};

export default useLogout;
