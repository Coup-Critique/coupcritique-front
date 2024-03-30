export const STORAGE_KEY = 'CoupCritiqueStorage';

const getStoredItem = (key = STORAGE_KEY) => {
	if (typeof window === 'undefined') return null;
	try {
		const value = localStorage.getItem(key);
		if (value == null) return null;
		return JSON.parse(value);
	} catch (error) {
		console.error(error);
		return null;
	}
};

const setItemToStorage = (value, key = STORAGE_KEY) => {
	if (typeof window === 'undefined') return;
	try {
		if (value == null) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(value));
		}
	} catch (error) {
		console.error(error);
	}
};

const useLocalStorage = () => ({ getStoredItem, setItemToStorage });
export default useLocalStorage;
