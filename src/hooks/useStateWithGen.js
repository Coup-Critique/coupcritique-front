import { setGenAction } from '@/reducers/gen';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStateWithGen = initialState => {
	const gen = useSelector(state => state.gen);
	const dispatch = useDispatch();
	const [state, setState] = useState(initialState);

	useEffect(() => {
		setState(initialState);
		if (initialState && initialState.gen != gen) {
			dispatch(setGenAction(initialState.gen));
		}
	}, [initialState.id]);

	return [state, setState];
};
export default useStateWithGen;
