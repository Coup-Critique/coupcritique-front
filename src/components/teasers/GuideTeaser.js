// modules

import Link from 'next/link';
import { Card, Button } from 'semantic-ui-react';
import { formatDate } from '@/functions';
import ScrollReveal from '@/components/ScrollReveal';
import Tag from '@/components/elements/Tag';
import Author from '@/components/elements/Author';

const GuideTeaser = ({ guide, TitleAs = 'h3', btnProps = {} }) => (
	<ScrollReveal className="ui card actuality-teaser" animation="zoomIn" earlier>
		<Card.Content>
			<div className="image mb-4">
				<Link href={`/entity/guides/${guide.id}`}>
					<img
						className="img-fluid"
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
			<TitleAs>
				<Link href={`/entity/guides/${guide.id}`}>{guide.title}</Link>
			</TitleAs>
			{guide.tags.length > 0 && (
				<div className="mb-2">
					{guide.tags.map((guideTag, i) => (
						<Tag key={i} tag={guideTag} />
					))}
				</div>
			)}
			<Author entity={guide} />
			{!!guide.shortDescription && (
				<p className="short-description">{guide.shortDescription}</p>
			)}
		</Card.Content>
		<Card.Content>
			<Link className="underline" {...btnProps} href={`/entity/guides/${guide.id}`}>
				Lire la suite
			</Link>
		</Card.Content>
	</ScrollReveal>
);
export default GuideTeaser;