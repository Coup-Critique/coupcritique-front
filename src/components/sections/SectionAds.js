import { memo } from 'react';
import { useSelector } from 'react-redux';
import useDoubleAdds from '@/hooks/useDoubleAdds';

const SectionAds = () => {
	const darkMode = useSelector(state => state.darkMode);
	const { googleAds, ref1, ref2, display1, display2 } = useDoubleAdds(darkMode);

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

export default SectionAds;
