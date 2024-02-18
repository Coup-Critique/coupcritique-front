// modules
import { Fragment } from 'react';
import Link from 'next/link';
import { Button, Card, Icon } from 'semantic-ui-react';
// functions
import TierUsage from '@/components/teasers/TierUsage';
import Video from '@/components/elements/Video';
import GuideTeaserEnhanced from '@/components/teasers/GuideTeaserEnhanced';

const SectionTopUsages = ({ usages = [], guides = [], videos = [] }) => (
	<section className="section-usage">
		<div className="ui container">
			<div className="row">
				<div className="col-12 col-xl-7 usages mx-auto text-center justify-content-center">
					<Card className="padded flex-grow-0">
						<h2>Le top des usages actuels</h2>
						<div className="row flex-grow-1">
							{usages.map(({ usage, tier }) => (
								<div
									key={tier.id}
									className="col-12 col-sm-4 d-flex justify-content-center mb-4"
								>
									<TierUsage usage={usage} tier={tier} />
								</div>
							))}
						</div>
						<div>
							<Link
								href={`/entity/tiers`}
								className="btn btn-orange team-button btn-icon"
							>
								<Icon name="chart bar" />
								Voir les usages
							</Link>
						</div>
					</Card>
				</div>
				<div className="col-12 col-xl-5">
					<div className="row">
						<div className="col-12 col-md-6 col-xl-12 mb-4 mb-md-0 mb-xl-4">
							<Card className="padded">
								<h2 className="text-left">Dernier guide stratégique</h2>
								{guides.map(guide => (
									<GuideTeaserEnhanced key={guide.id} guide={guide} />
								))}
								<div className="text-center">
									<Button
										as={Link}
										href="/entity/guides"
										content="Voir les guides stratégiques"
										color="orange"
										icon="book"
									/>
								</div>
							</Card>
						</div>
						<div className="col-12 col-md-6 col-xl-12">
							<Card className="padded">
								<h3 className="text-left">Dernière vidéo</h3>
								{videos.map(video => (
									<Video key={video.id} video={video} short />
								))}
								<div className="text-center">
									<Button
										as={Link}
										href="/videos"
										content="Voir les vidéos"
										color="orange"
										icon="youtube"
									/>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
);
export default SectionTopUsages;
