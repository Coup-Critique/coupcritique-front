import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useDarkMode from '@/hooks/useDarkMode';
// import Ad from '@/components/Ad';

const initAd = () => {
	(window.adsbygoogle = window.adsbygoogle || []).push({});
};

const SectionAds = () => {
	const { googleAds } = useSelector(state => state.cookie);
	const [darkMode] = useDarkMode();
	const ref1 = useRef();
	const ref2 = useRef();
	const [display1, setDisplay1] = useState(true);
	const [display2, setDisplay2] = useState(true);

	useEffect(() => {
		if (googleAds) {
			if (!display1) {
				setDisplay1(true);
			}
			if (!display2) {
				setDisplay2(true);
			}
			try {
				initAd();
				initAd();
				setTimeout(checkDisplay, 3000);
			} catch (e) {
				console.error(e);
			}
		}
	}, [darkMode, googleAds]);

	const checkDisplay = () => {
		if (ref1.current && !ref1.current.hasChildNodes()) {
			setDisplay1(false);
		}
		if (ref2.current && !ref2.current.hasChildNodes()) {
			setDisplay2(false);
		}
	};

	if (!googleAds) return null;
	return (
		<div className={display1 || display2 ? 'row ml-0 mr-0 mb-4' : undefined}>
			<div className="col-12 col-xl-6 text-center p-0 overflow-hidden">
				{/* use darkMode like that to retriger full htmlTag rendering */}
				{darkMode ? (
					<DarkAdSense adRef={ref1} display={display1} />
				) : (
					<WhiteAdSense adRef={ref1} display={display1} />
				)}
			</div>
			<div className="col-12 col-xl-6 text-center p-0 overflow-hidden d-none d-xl-block">
				{darkMode ? (
					<DarkAdSense adRef={ref2} display={display2} />
				) : (
					<WhiteAdSense adRef={ref2} display={display2} />
				)}
			</div>
		</div>
	);
};

const DarkAdSense = ({ adRef, display }) => (
	<ins
		ref={adRef}
		style={{ display: display ? 'block' : 'none', width: '685px', height: '170px' }}
		className="adsbygoogle"
		data-ad-format="fluid"
		// data-ad-format="auto"
		data-full-width-responsive="true"
		data-ad-layout-key="-fb+5w+4e-db+86"
		data-ad-client="ca-pub-4492453388939100"
		data-ad-slot="2289091495"
	></ins>
);
const WhiteAdSense = ({ adRef, display }) => (
	<ins
		ref={adRef}
		style={{ display: display ? 'block' : 'none', width: '685px', height: '170px' }}
		className="adsbygoogle"
		data-ad-format="fluid"
		// data-ad-format="auto"
		data-full-width-responsive="true"
		data-ad-layout-key="-fb+5w+4e-db+86"
		data-ad-client="ca-pub-4492453388939100"
		data-ad-slot="5732408833"
	></ins>
);

export default React.memo(SectionAds, () => true);
