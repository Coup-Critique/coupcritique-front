import React, { useEffect, useRef, useState } from 'react';
import { makeClassName } from '@/functions';

// Venatus Ad, no more used
const Ad = ({ vmId, displayed = true, className, style }) => {
	const adRef = useRef();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (!mounted) {
			setMounted(true);
		}
		if (displayed) {
			window.top.__vm_add = window.top.__vm_add || [];
			window.top.__vm_add.push(adRef.current);
		} else {
			window.top.__vm_remove = window.top.__vm_remove || [];
			window.top.__vm_remove.push(adRef.current);
		}
	}, [displayed]);

	if (!mounted) return null;
	return (
		<div className={makeClassName('ad-wrapper', className)}>
			<div className="vm-placement" data-id={vmId} ref={adRef} style={style}></div>
		</div>
	);
};

export default React.memo(
	Ad,
	(prevProps, nextProps) => prevProps.displayed == nextProps.displayed
);

// const SectionAds = ({ className }) => {
// const [width, setWidth] = useState(0);

// useEffect(() => {
// 	handleWidth();
// 	window.addEventListener('resize', handleWidth);
// 	return () => window.removeEventListener('resize', handleWidth);
// }, []);

// const handleWidth = () => setWidth(window.innerWidth);

// const lg = width >= 992;
// const md = width >= 768;

// const handleWidth = () => setWidth(window.innerWidth);

// <div className={makeClassName('row ads-row', className)}>
// <div className="col-12 col-md-6 col-lg-12 text-center overflow-hidden">
// 	<Ad
// 		vmId={'62bd9179bbfdfd5d0054b4b3'}
// 		displayed={lg}
// 		className="d-none d-lg-block"
// 	/>
// 	<Ad
// 		vmId={'62bd9197bbfdfd5d0054b4b7'}
// 		displayed={!lg}
// 		className="d-block d-lg-none"
// 	/>
// </div>
// <div className="col-12 col-md-6 col-lg-12 text-center overflow-hidden">
// 	<Ad
// 		vmId={'62bd9197bbfdfd5d0054b4b7'}
// 		displayed={md && !lg}
// 		className="d-none d-md-block d-lg-none"
// 	/>
// </div>
// </div>
