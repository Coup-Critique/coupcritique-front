// modules
import { Fragment } from 'react';
import Link from 'next/link';
import { Button, Card, Icon } from 'semantic-ui-react';
// functions
import TierUsage from '@/components/teasers/TierUsage';
import Video from '@/components/elements/Video';
import GuideTeaserEnhanced from '@/components/teasers/GuideTeaserEnhanced';

const SectionTopUsages = ({ usages = [], guides = [], videos = [] }) => (
	<>
		<section>
			<div className="ui container">
				<div className="h2-btn">
					<h2>
						<Link href="/entity/guides">Guides stratégiques</Link>
					</h2>
					<Link href="/entity/guides" className="btn btn-orange">
						Voir tous les guides
					</Link>
				</div>
				<div className="row">
					{guides.map(guide => (
						<div
							key={guide.id}
							className="col-12 col-sm-4 d-flex justify-content-center mb-4"
						>
							<Card className="padded pb-4">
								<GuideTeaserEnhanced key={guide.id} guide={guide} />
							</Card>
						</div>
					))}
				</div>
			</div>
		</section>
		<section className="section-usage">
			<div className="ui container">
				<div className="row">
					<div className="col-12 col-xl-7 usages mx-auto text-center justify-content-center">
						<Card className="padded">
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
								<Link href={`/entity/tiers`} className="btn btn-orange">
									Voir les usages
								</Link>
							</div>
						</Card>
					</div>
					<div className="col-12 col-xl-5">
						<Card className="padded">
							<h2 className="text-left">Dernière vidéo</h2>
							{videos.map(video => (
								<Video key={video.id} video={video} short />
							))}
							<div className="text-center">
								<Link href={`/videos`} className="btn btn-orange">
									Voir toutes les videos
								</Link>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</section>
	</>
);
export default SectionTopUsages;
