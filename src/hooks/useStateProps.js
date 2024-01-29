import { useEffect, useState } from 'react';

const useStateProps = initialState => {
	const [state, setState] = useState(initialState);

	useEffect(() => {
		setState(initialState);
	}, [initialState]);

	return [state, setState];
};
export default useStateProps;
