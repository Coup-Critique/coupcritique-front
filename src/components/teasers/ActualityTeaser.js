// modules

import Link from 'next/link';
import { Card, Button } from 'semantic-ui-react';
import ScrollReveal from '@/components/ScrollReveal';
import Tag from '@/components/elements/Tag';
import Author from '@/components/elements/Author';

const ActualityTeaser = ({ actuality, TitleAs = 'h3', btnProps = {} }) => (
	<ScrollReveal className="ui card actuality-teaser" animation="zoomIn" earlier>
		<Card.Content>
			<div className="image mb-4">
				<Link href={`/entity/actualities/${actuality.id}`}>
					<img
						className="img-fluid"
						src={
							actuality.images && actuality.images.length
								? `${process.env.NEXT_PUBLIC_API_URL}/images/uploads/actualities/375px/${actuality.images[0]}`
								: '/images/default_actuality_colored.jpg'
						}
						onError={e => {
							e.target.onerror = null;
							e.target.src = '/images/default_actuality_colored.jpg';
						}}
						alt={actuality.alt}
						// TODO gerer une taille fixe
					/>
					<span className="sr-only">
						Illustration de l'actualité : {actuality.title}
					</span>
				</Link>
			</div>
			<TitleAs>
				<Link href={`/entity/actualities/${actuality.id}`}>
					{actuality.title}
				</Link>
			</TitleAs>
			{actuality.tags.length > 0 && (
				<div className="mb-2">
					{actuality.tags.map((tag, i) => (
						<Tag key={i} tag={tag} />
					))}
				</div>
			)}
			<Author entity={actuality} />
			{!!actuality.shortDescription && (
				<p className="short-description">{actuality.shortDescription}</p>
			)}
		</Card.Content>
		<Card.Content>
			<Link
				className="underline"
				{...btnProps}
				href={`/entity/actualities/${actuality.id}`}
			>
				Lire la suite
			</Link>
		</Card.Content>
	</ScrollReveal>
);
export default ActualityTeaser;
