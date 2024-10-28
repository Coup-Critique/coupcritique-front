import { useEffect, useRef, useState } from 'react';
import useCookies from './useCookies';

const LATENCE = 3000;
const initAd = () => {
	if (!window.adsbygoogle) {
		window.adsbygoogle = [];
	}
	// double push for the 2 adds
	window.adsbygoogle.push({});
	window.adsbygoogle.push({});
};

const useDoubleAdds = reload => {
	const { googleAds } = useCookies();
	const ref1 = useRef();
	const ref2 = useRef();
	const [display1, setDisplay1] = useState(true);
	const [display2, setDisplay2] = useState(true);

	const checkDisplay = () => {
		if (ref1.current && !ref1.current.hasChildNodes()) {
			setDisplay1(false);
		}
	};
	useEffect(() => {
		if (googleAds) {
			if (!display1) setDisplay1(true);
			try {
				initAd();
				setTimeout(checkDisplay, LATENCE);
			} catch (e) {
				console.error(e);
			}
		}
	}, [googleAds, reload]);

	const checkDisplay2 = () => {
		if (ref2.current && !ref2.current.hasChildNodes()) {
			setDisplay2(false);
		}
	};
	useEffect(() => {
		if (googleAds) {
			if (!display2) setDisplay2(true);
			try {
				setTimeout(checkDisplay2, LATENCE);
			} catch (e) {
				console.error(e);
			}
		}
	}, [googleAds, reload]);

	return { googleAds, ref1, ref2, display1, display2 };
};

export default useDoubleAdds;
