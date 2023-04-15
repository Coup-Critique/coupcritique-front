import { useMemo } from 'react';

// prettier-ignore
const useSelectors = (state, selectors) => useMemo(
    () => selectors.map(selector => (...args) => (selector(state, ...args))), 
    [state]
);
export default useSelectors;
