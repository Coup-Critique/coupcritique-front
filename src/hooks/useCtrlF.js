import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const useCtrlF = () => {
	const ref = useRef();
	const { pathname } = useRouter();

	const handleKeyDown = e => {
		if (ref.current && e.ctrlKey && e.key === 'f') {
			e.preventDefault();
			ref.current.focus();
		}
	};

	useEffect(() => {
		// exclusions de certains groupes de pages et précisément de la page /teams grâce au $ = fin de string
		if (RegExp('actualities|guides|circuit|resouces|admin|teams$').test(pathname)) {
			document.removeEventListener('keydown', handleKeyDown);
		} else {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [pathname]);

	return ref;
};

export default useCtrlF;
