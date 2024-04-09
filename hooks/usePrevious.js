import { useEffect, useRef } from 'react';

function usePrevious(...args) {
	const ref = useRef(args);
	useEffect(() => {
		ref.current = args;
	});
	return ref.current;
}

export default usePrevious;
