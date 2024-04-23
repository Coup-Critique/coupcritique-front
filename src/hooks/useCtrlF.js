import { useEffect, useRef } from 'react';

const useCtrlF = () => {
	const ref = useRef();

	const handleKeyDown = e => {
		if (ref.current && e.ctrlKey && e.key === 'f') {
			e.preventDefault();
			ref.current.focus();
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return ref;
};

export default useCtrlF;
