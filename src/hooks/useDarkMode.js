import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkModeAction } from '@/reducers/darkMode';
import useActions from './useActions';
import usePrevious from './usePrevious';
import useLocalStorage from './useLocalStorage';
import { singletonHook } from 'react-singleton-hook';

export const DARK_MODE_KEY = 'dark-mode';

const useDarkMode = () => {
	const darkMode = useSelector(state => state.darkMode);
	const dispatch = useDispatch();
	const [setDarkMode] = useActions(dispatch, [setDarkModeAction]);
	const [prevDarkMode] = usePrevious(darkMode);
	const { getStoredItem, setItemToStorage } = useLocalStorage();

	useEffect(() => {
		// if (typeof darkMode !== 'boolean') {
		// 	const storedDarkMode = getStoredItem(DARK_MODE_KEY);
		// 	setDarkMode(storedDarkMode === null ? true : storedDarkMode);
		// }
		const storedDarkMode = getStoredItem(DARK_MODE_KEY);
		setDarkMode(storedDarkMode === null ? true : storedDarkMode);
	}, []);

	useEffect(() => {
		if (darkMode !== prevDarkMode) {
			setItemToStorage(darkMode, DARK_MODE_KEY);
		}
	}, [darkMode]);

	return [darkMode, setDarkMode];
};

export default singletonHook(
	[true, () => console.error('useDarkMode is not ready')],
	useDarkMode
);
// export default useDarkMode;
