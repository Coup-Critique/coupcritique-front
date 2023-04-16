import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { makeClassName } from '@/functions';

const initAd = () => {
	(window.adsbygoogle = window.adsbygoogle || []).push({});
};

const SectionAds = () => {
	const { googleAds } = useSelector(state => state.cookie);
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
	}, [googleAds]);

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
		<section className="section-ads">
			<div className="row ml-0 mr-0">
				<div className="col-12 col-xl-6 p-0 overflow-hidden">
					<AdSense alignRight adRef={ref1} display={display1} />
				</div>
				<div className="col-12 col-xl-6 p-0 overflow-hidden d-none d-xl-block">
					<AdSense alignLeft adRef={ref2} display={display2} />
				</div>
			</div>
		</section>
	);
};

const AdSense = ({ alignRight, alignLeft, adRef, display }) => (
	<ins
		ref={adRef}
		style={{
			display: display ? 'block' : 'none',
			height: '300px',
		}}
		className={makeClassName(
			'adsbygoogle',
			alignRight && 'right',
			alignLeft && 'left'
		)}
		// data-ad-format="auto"
		data-ad-format="fluid"
		data-full-width-responsive="true"
		data-ad-client="ca-pub-4492453388939100"
		data-ad-slot="2289091495"
	></ins>
);

export default React.memo(SectionAds, () => true);
