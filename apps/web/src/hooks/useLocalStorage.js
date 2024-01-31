export const STORAGE_KEY = 'CoupCritiqueStorage';

const getStoredItem = (key = STORAGE_KEY) => {
	if (typeof window === 'undefined') return null;
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (error) {
		console.error(error);
		return null;
	}
};

const setItemToStorage = (value, key = STORAGE_KEY) => {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem(
			key,
			value === undefined || value === null ? value : JSON.stringify(value)
		);
	} catch (error) {
		console.error(error);
	}
};

const useLocalStorage = () => ({ getStoredItem, setItemToStorage });
export default useLocalStorage;
