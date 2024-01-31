import { useReducer } from 'react';
import useActions from '@/hooks/useActions';
import useSelectors from '@/hooks/useSelectors';

/** Use it when you need actions and selectors */
const useFullReducer = (
	reducer,
	actions = [],
	selectors = [],
	initializerArg,
	initializer
) => {
	const [state, dispatch] = useReducer(reducer, initializerArg, initializer);
	const mappedActions = useActions(dispatch, actions);
	const mappedSelectors = useSelectors(state, selectors);
	return [state, mappedActions, mappedSelectors];
};
export default useFullReducer;
