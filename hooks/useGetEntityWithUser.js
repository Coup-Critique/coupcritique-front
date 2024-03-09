// modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
// hooks
import useFetch from '@/hooks/useFetch';
// constants
import { reloadOnSsr } from '@/constants/entities';
import { setGenAction } from '@/reducers/gen';

/**
 * @param {object} ssrEntity
 * @param {number|string} id
 * @param {string} key
 * @param {string} loadUrl
 * @returns {[any[]|null, boolean]}
 */
const useGetEntityWithUser = (id, key, loadUrl, ssrEntity) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const gen = useSelector(state => state.gen);
	const router = useRouter();
	const [result, load, loading] = useFetch();
	const entityLoaded = !!ssrEntity && ssrEntity.id == id;

	useEffect(() => {
		// Void ssr on pokemon change
		if (ssrEntity) {
			if (ssrEntity.gen && ssrEntity.gen != gen) {
				dispatch(setGenAction(ssrEntity.gen));
			}
		}
	}, [id]);

	useEffect(() => {
		// gen comes from id
		if (!user.loading && (!entityLoaded || reloadOnSsr[key])) {
			load({ url: `${loadUrl}/${id}` });
		}
	}, [id, user.loading, user.id]);

	useEffect(() => {
		if (result) {
			if (result.success) {
				if (result.gen != gen) {
					dispatch(setGenAction(result.gen));
				}
			} else if (result.message === 'Mauvais identifiant') {
				router.push('/404');
			}
		}
	}, [result]);

	return [
		result?.success ? result[key] : entityLoaded ? ssrEntity : null,
		loading && !entityLoaded,
	];
};
export default useGetEntityWithUser;
