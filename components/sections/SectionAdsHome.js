import { memo } from 'react';
import { useSelector } from 'react-redux';
import { makeClassName } from '@/functions';
import useDoubleAdds from '@/hooks/useDoubleAdds';

const SectionAdsHome = () => {
	const { googleAds } = useSelector(state => state.cookie);
	const { ref1, ref2, display1, display2 } = useDoubleAdds();

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

export default memo(SectionAdsHome, () => true);
