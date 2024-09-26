import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '@/reducers/user';
import { addMessage } from '@/reducers/messages';
import { STORAGE_KEY } from '@/hooks/useLocalStorage';
import { setNotifAction } from '@/reducers/notifs';
import { removeQueries } from '@/reducers/queries';

const useLogout = () => {
	const dispatch = useDispatch();
	const gen = useSelector(state => state.gen);

	const logout = useCallback(() => {
		// clear storage

		localStorage.clear();
		localStorage.setItem(STORAGE_KEY + '-gen', gen);

		dispatch(addMessage('Déconnecté', true));
		dispatch(setNotifAction(0));
		dispatch(removeUser());
		dispatch(removeQueries());
		// Redirection to landing page
	}, [dispatch, gen]);

	return logout;
};

export default useLogout;
