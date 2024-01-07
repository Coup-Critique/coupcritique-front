// modules
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Icon, Loader } from 'semantic-ui-react';
import useFetch from '@/hooks/useFetch';
// functions
import TierUsage from '@/components/elements/TierUsage';
import Video from '@/components/elements/Video';
import GuideTeaserEnhanced from '@/components/elements/GuideTeaserEnhanced';
import { useSelector } from 'react-redux';

const SectionTopUsages = () => {
	const ssrData = useSelector(state => state.ssrData);
	const [result, load, loading] = useFetch();
	const [resultGuide, loadGuide, loadingGuide] = useFetch();
	const [video, setVideo] = useState(ssrData?.home_videos?.[0] || null);
	const [guide, setGuide] = useState(ssrData?.home_guides?.[0] || null);

	useEffect(() => {
		if (!video) {
			load({ url: `videos?maxLength=1` });
		}
		if (!guide) {
			loadGuide({ url: `guides?maxLength=1` });
		}
	}, []);

	useEffect(() => {
		if (result?.success) {
			setVideo(result.videos[0]);
		}
	}, [result]);

	useEffect(() => {
		if (resultGuide && resultGuide.success) {
			setGuide(resultGuide.guides[0]);
		}
	}, [resultGuide]);

	return (
		<section className="section-usage">
			<div className="ui container">
				<div className="row divided">
					<div className="col-12 col-xl-7 usages mx-auto text-center">
						<h2>Le top des usages actuels</h2>
						<div className="row">
							<div className="col-12 col-md-4 d-flex justify-content-center mb-4">
								<TierUsage name="OverUsed" />
							</div>
							<div className="col-12 col-md-4 d-flex justify-content-center mb-4">
								<TierUsage
									name="VGC"
									params={{ official: true, isDouble: true }}
								/>
							</div>
							<div className="col-12 col-md-4  d-flex justify-content-center mb-4">
								<TierUsage
									name="BSS"
									params={{ official: true, isDouble: false }}
								/>
							</div>
						</div>
						<Link
							href={`/entity/tiers`}
							className="btn btn-red team-button btn-icon"
						>
							<Icon name="chart bar" />
							Voir les usages
						</Link>
					</div>
					<div className="col-12 col-xl-5">
						<h2>Dernier guide stratégique</h2>
						{loading || loadingGuide ? (
							<Loader active inline="centered" />
						) : (
							<>
								{!!guide && (
									<div className="mb-4">
										<GuideTeaserEnhanced guide={guide} />
										<Button
											as={Link}
											href="/entity/guides"
											content="Voir les guides stratégiques"
											color="red"
											icon="book"
										/>
									</div>
								)}
								{!!video && (
									<>
										<h3>Dernière vidéo</h3>
										<Video key={video.id} video={video} short />
										<Button
											as={Link}
											href="/videos"
											content="Voir les vidéos"
											color="red"
											icon="youtube"
										/>
									</>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
export default SectionTopUsages;
