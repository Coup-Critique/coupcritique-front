import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const getHash = () =>
	typeof window !== 'undefined'
		? decodeURIComponent(window.location.hash.replace('#', ''))
		: undefined;

const useHash = () => {
	const [hash, setHash] = useState();
	const params = useParams();

	const removeHash = () => {
		setHash(undefined);
		window.location.hash = '';
	};

	useEffect(() => {
		const hash = getHash();
		setHash(hash);
		if (hash) {
			document.getElementById(hash)?.scrollIntoView();
		}
	}, [params]);

	return [hash, removeHash];
};

export default useHash;
