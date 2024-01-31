import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from '@/hooks/useLocalStorage';

const useSaveToStorage = (entity, callbackEntity) => {
	const { pathname } = useRouter();
	const { getStoredItem, setItemToStorage } = useLocalStorage();

	useEffect(() => {
		const storedActuality = getStoredItem(pathname);
		if (storedActuality) {
			callbackEntity(storedActuality);
		}
	}, []);

	useEffect(() => {
		if (Object.keys(entity).length) {
			setItemToStorage(entity, pathname);
		}
	}, [entity]);

	const voidStorage = () => setItemToStorage(null, pathname);

	return [voidStorage];
};
export default useSaveToStorage;
