// modules
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Icon, Loader } from 'semantic-ui-react';
import useFetch from '@/hooks/useFetch';
// functions
import TierUsage from '@/components/elements/TierUsage';
import Video from '@/components/elements/Video';
import GuideTeaserEnhanced from '@/components/elements/GuideTeaserEnhanced';

const SectionTopUsages = ({ usages = [], guides = [], videos = [] }) => (
	<section className="section-usage">
		<div className="ui container">
			<div className="row divided">
				<div className="col-12 col-xl-7 usages mx-auto text-center">
					<h2>Le top des usages actuels</h2>
					<div className="row">
						{usages.map(({ usage, tier }) => (
							<div
								key={usage.tier.id}
								className="col-12 col-md-4 d-flex justify-content-center mb-4"
							>
								<TierUsage usage={usage} tier={tier} />
							</div>
						))}
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
					{guides.map(guide => (
						<div className="mb-4" key={guide.id}>
							<GuideTeaserEnhanced guide={guide} />
							<Button
								as={Link}
								href="/entity/guides"
								content="Voir les guides stratégiques"
								color="red"
								icon="book"
							/>
						</div>
					))}
					{videos.map(video => (
						<Fragment key={video.id}>
							<h3>Dernière vidéo</h3>
							<Video key={video.id} video={video} short />
							<Button
								as={Link}
								href="/videos"
								content="Voir les vidéos"
								color="red"
								icon="youtube"
							/>
						</Fragment>
					))}
				</div>
			</div>
		</div>
	</section>
);
export default SectionTopUsages;
