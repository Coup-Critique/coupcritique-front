import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const getHash = () =>
	typeof window !== 'undefined'
		? decodeURIComponent(window.location.hash.replace('#', ''))
		: undefined;

const useHash = () => {
	const [hash, setHash] = useState();
	const params = useParams();

	useEffect(() => {
		const hash = getHash();
		setHash(hash);
		document.getElementById(hash).scrollIntoView();
	}, [params]);

	return hash;
};

export default useHash;
