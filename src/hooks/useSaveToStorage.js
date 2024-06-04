import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from '@/hooks/useLocalStorage';

const useSaveToStorage = (entity, callbackEntity) => {
	const { pathname, query } = useRouter();
	const { getStoredItem, setItemToStorage } = useLocalStorage();
	const storageKey = useMemo(
		() => `form_${pathname.replace(`[id]`, query.id)}`,
		[pathname, query.id]
	);

	useEffect(() => {
		const storedActuality = getStoredItem(storageKey);
		if (storedActuality) {
			callbackEntity(storedActuality);
		}
	}, []);

	useEffect(() => {
		if (Object.keys(entity).length) {
			setItemToStorage(entity, storageKey);
		}
	}, [entity]);

	const voidStorage = () => setItemToStorage(null, storageKey);

	return [voidStorage];
};
export default useSaveToStorage;
