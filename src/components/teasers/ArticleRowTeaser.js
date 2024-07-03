// modules

import Link from 'next/link';
import { formatDate, makeClassName } from '@/functions';
import ScrollReveal from '@/components/ScrollReveal';
import Tag from '@/components/elements/Tag';
import Author from '../elements/Author';

const ArticleRowTeaser = ({ article, entityName, noCover = false }) => (
	<ScrollReveal
		className={makeClassName('article-row-teaser', noCover && 'no-cover')}
		animation="zoomIn"
		earlier
	>
		<div className="row mb-3">
			<div
				className={makeClassName(
					'col-12',
					noCover ? 'col-xl-5 px-2' : 'col-xl-6'
				)}
			>
				<Link href={`/entity/${entityName}/${article.id}`}>
					<img
						className="img-fluid d-block mb-2"
						src={
							article.images && article.images.length
								? `${process.env.NEXT_PUBLIC_API_URL}/images/uploads/${entityName}/375px/${article.images[0]}`
								: '/images/default_actuality_colored.jpg'
						}
						onError={e => {
							e.target.onerror = null;
							e.target.src = '/images/default_actuality_colored.jpg';
						}}
						alt={article.alt}
					/>
					<span className="sr-only">Illustration&nbsp;: {article.title}</span>
				</Link>
			</div>
			<div
				className={makeClassName(
					'col-12',
					noCover ? 'col-xl-7 px-2' : 'col-xl-6'
				)}
			>
				<h4>
					<Link href={`/entity/${entityName}/${article.id}`}>
						{article.title}
					</Link>
				</h4>
				<Author entity={article} />
			</div>
		</div>
		<div>
			{article.tags.map((tag, i) => (
				<Tag key={i} tag={tag} />
			))}
		</div>
	</ScrollReveal>
);
export default ArticleRowTeaser;
