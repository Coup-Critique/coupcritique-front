import { useMemo } from 'react';

// prettier-ignore
const useActions = (dispatch, actions) => useMemo(
    () => actions.map(action => (...args) => dispatch(action(...args))), 
    [dispatch]
);
export default useActions;
