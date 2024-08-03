// modules

import Link from 'next/link';
import { Card } from 'semantic-ui-react';
import { makeClassName } from '@/functions';
import ScrollReveal from '@/components/ScrollReveal';
import Tag from '@/components/elements/Tag';
import Author from '../elements/Author';
import { useEffect, useState } from 'react';
// import Image from 'next/image';

const defaultSrc = '/images/default_actuality_colored.jpg';

const ArticleTeaser = ({
	article,
	entityName,
	path = entityName,
	TitleAs = 'h3',
	btnProps = {},
	noCover = false,
}) => {
	const [imgError, setImgError] = useState(false);

	useEffect(() => {
		setImgError(false);
	}, [article.id]);

	return (
		<ScrollReveal
			className={makeClassName(
				'ui card article-teaser',
				!imgError && article.images?.length && noCover && 'no-cover'
			)}
			animation="zoomIn"
			earlier
		>
			<Card.Content>
				<div className="image mb-4">
					<Link href={`/entity/${path}/${article.id}`}>
						<img
							className="img-fluid"
							src={
								!imgError && article.images?.length
									? `${process.env.NEXT_PUBLIC_API_URL}/images/uploads/${entityName}/375px/${article.images[0]}`
									: defaultSrc
							}
							onError={e => {
								e.target.onerror = null;
								e.target.src = defaultSrc;
								setImgError(true);
							}}
							alt={article.alt || "Illustration de l'article"}
							// TODO gerer une taille fixe
						/>
						<span className="sr-only">Illustration : {article.title}</span>
					</Link>
				</div>
				<TitleAs>
					<Link href={`/entity/${path}/${article.id}`}>{article.title}</Link>
				</TitleAs>
				{article.tags.length > 0 && (
					<div className="mb-2">
						{article.tags.map((tag, i) => (
							<Tag key={i} tag={tag} />
						))}
					</div>
				)}
				<Author entity={article} />
				{!!article.shortDescription && (
					<p className="short-description">{article.shortDescription}</p>
				)}
			</Card.Content>
			<Card.Content>
				<Link
					className="underline"
					{...btnProps}
					href={`/entity/${path}/${article.id}`}
				>
					Lire la suite
				</Link>
			</Card.Content>
		</ScrollReveal>
	);
};
export default ArticleTeaser;
