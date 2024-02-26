// modules
// import Link from 'next/link';
import { formatDate } from '@/functions';
import ScrollReveal from '@/components/ScrollReveal';
import Tag from '@/components/elements/Tag';

const GuideTeaserEnhanced = ({ guide }) => (
	<ScrollReveal className="guide-teaser-enhanced" animation="zoomIn" earlier>
		<div className="row mb-3">
			<div className="col-12 col-lg-6">
				<a href={`/entity/guides/${guide.id}`}>
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
					/>
					<span className="sr-only">
						Illustration du guide&nbsp;: {guide.title}
					</span>
				</a>
			</div>
			<div className="col-12 col-lg-6">
				<h4>
					<a href={`/entity/guides/${guide.id}`}>{guide.title}</a>
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
