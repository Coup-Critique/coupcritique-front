'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkModeAction } from '@/reducers/darkMode';
import useActions from '@/hooks/useActions';
import usePrevious from '@/hooks/usePrevious';
import useLocalStorage from '@/hooks/useLocalStorage';

export const DARK_MODE_KEY = 'dark-mode';

const useDarkMode = () => {
	const dispatch = useDispatch();
	const darkMode = useSelector(state => state.darkMode);
	const [setDarkMode] = useActions(dispatch, [setDarkModeAction]);
	const [prevDarkMode] = usePrevious(darkMode);
	const { getStoredItem, setItemToStorage } = useLocalStorage();

	useEffect(() => {
		const storedDarkMode = getStoredItem(DARK_MODE_KEY);
		setDarkMode(storedDarkMode == null ? true : storedDarkMode);
	}, []);

	useEffect(() => {
		if (darkMode !== prevDarkMode) {
			setItemToStorage(darkMode, DARK_MODE_KEY);
		}
	}, [darkMode]);

	return [darkMode, setDarkMode];
};

export default useDarkMode;
