import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from './useFetch';
import { setNotifAction } from '@/reducers/notifs';

const useNotifChecker = (entityName, id) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [resultNotif, loadNotif] = useFetch();

	useEffect(() => {
		if (user.id && id) {
			loadNotif({ url: `notifications/view/${entityName}/${id}` });
		}
	}, [entityName, user.id, id]);

	useEffect(() => {
		if (resultNotif?.success) {
			dispatch(setNotifAction(resultNotif.count));
		}
	}, [resultNotif]);
};

export default useNotifChecker;
