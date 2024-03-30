import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from '@/hooks/useLocalStorage';

const useSaveToStorage = (entity, callbackEntity) => {
	const { pathname, query } = useRouter();
	const { getStoredItem, setItemToStorage } = useLocalStorage();
	const key = useMemo(
		() => (query.id ? pathname.replace(`[id]`, query.id) : pathname),
		[pathname, query]
	);

	useEffect(() => {
		const storedActuality = getStoredItem(key);
		if (storedActuality) {
			callbackEntity(storedActuality);
		}
	}, []);

	useEffect(() => {
		if (Object.keys(entity).length) {
			setItemToStorage(entity, key);
		}
	}, [entity]);

	const voidStorage = () => setItemToStorage(null, key);

	return [voidStorage];
};
export default useSaveToStorage;
