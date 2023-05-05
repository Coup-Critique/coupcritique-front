// modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// hooks
import useFetch from '@/hooks/useFetch';
// constants
import { reloadOnSsr } from '@/constants/entities';
import { setGenAction } from '@/reducers/gen';
import { setSsrDataAction } from '@/reducers/ssrData';

/**
 * @param {number|string} id
 * @param {string} key
 * @param {string} loadUrl
 * @returns {[any[]|null, boolean]}
 */
const useGetEntity = (id, key, loadUrl) => {
	const dispatch = useDispatch();
	const { ssrData, user, gen } = useSelector(state => state);
	const history = useHistory();
	const [result, load, loading] = useFetch();
	const ssrEntity = ssrData && ssrData[key];
	const entityLoaded = !!ssrEntity && ssrEntity.id == id;

	useEffect(() => {
		// Void ssr on pokemon change
		if (ssrEntity) {
			if (ssrEntity.id != id) {
				dispatch(setSsrDataAction(null));
			} else if (ssrEntity.gen && ssrEntity.gen != gen) {
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
				history.push('/404');
			}
		}
	}, [result]);

	return [
		result && result.success ? result : entityLoaded ? ssrData : null,
		loading && !entityLoaded,
	];
};
export default useGetEntity;
