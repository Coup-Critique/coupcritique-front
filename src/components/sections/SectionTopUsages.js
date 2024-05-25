// modules
import { Fragment } from 'react';
import Link from 'next/link';
import { Button, Card, Icon } from 'semantic-ui-react';
// functions
import TierUsage from '@/components/teasers/TierUsage';
import Video from '@/components/elements/Video';
import ArticleRowTeaser from '@/components/teasers/ArticleRowTeaser';
import ReduceCol from '../columns/ReduceCol';
import { makeClassName } from '@/functions';

const SectionTopUsages = ({ usages = [], guides = [], videos = [] }) => (
	<>
		<section>
			<div className="ui container">
				<div className="h2-btn">
					<h2>Guides stratégiques</h2>
					<Link href="/entity/guides" className="btn btn-orange">
						Voir tous les guides
					</Link>
				</div>
				<div className="row">
					{guides.map((guide, i) => (
						<ReduceCol key={guide.id} i={i}>
							<Card className="padded pb-4">
								<ArticleRowTeaser
									key={guide.id}
									article={guide}
									entityName="guides"
								/>
							</Card>
						</ReduceCol>
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
							<div className="row">
								{videos.map((video, i) => (
									<div
										className={makeClassName(
											'col-12 col-sm-6 col-xl-12 flex-column',
											i > 0 && 'd-none d-sm-flex'
										)}
										key={video.id}
									>
										<Video video={video} short />
									</div>
								))}
							</div>
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
