import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkModeAction } from '@/reducers/darkMode';
import useActions from '@/hooks/useActions';
import usePrevious from '@/hooks/usePrevious';
import useLocalStorage from '@/hooks/useLocalStorage';

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

export default useDarkMode;
