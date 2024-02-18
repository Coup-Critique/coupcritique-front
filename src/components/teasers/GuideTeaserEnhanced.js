// modules

import Link from 'next/link';
import { formatDate } from '@/functions';
import ScrollReveal from '@/components/ScrollReveal';
import Tag from '@/components/elements/Tag';

const GuideTeaserEnhanced = ({ guide }) => (
	<ScrollReveal className="guide-teaser-enhanced mb-3" animation="zoomIn" earlier>
		<div className="row mb-3">
			<div className="col-12 col-lg-6">
				<Link href={`/entity/guides/${guide.id}`}>
					<img
						className="img-fluid d-block mb-2"
						src={
							guide.images && guide.images.length
								? `${process.env.NEXT_PUBLIC_API_URL}/images/uploads/guides/375px/${guide.images[0]}`
								: '/images/default_actuality_colored.jpg'
						}
						onError={e => {
							e.target.onerror = null;
							e.target.src = '/images/default_actuality_colored.jpg';
						}}
						alt={guide.alt}
						// TODO gerer une taille fixe
					/>
					<span className="sr-only">Illustration du guide : {guide.title}</span>
				</Link>
			</div>
			<div className="col-12 col-lg-6">
				<h4>
					<Link href={`/entity/guides/${guide.id}`}>{guide.title}</Link>
				</h4>
				<h5>
					{guide.user.username} - {formatDate(guide.date_creation)}
				</h5>
			</div>
		</div>
		<div>
			{guide.tags.map((guideTag, i) => (
				<Tag key={i} tag={guideTag} />
			))}
		</div>
	</ScrollReveal>
);
export default GuideTeaserEnhanced;
