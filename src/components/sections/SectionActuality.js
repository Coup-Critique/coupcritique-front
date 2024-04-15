// modules
import Link from 'next/link';
// components
import ArticleTeaser from '../teasers/ArticleTeaser';

function SectionActuality({ actualities = [] }) {
	if (!actualities.length) return null;
	return (
		<section className="text-center">
			<div className="ui container">
				<div className="h2-btn">
					<h2>Actualités</h2>
					<Link href="/entity/actualities" className="btn btn-orange">
						Voir toutes les actualités
					</Link>
				</div>
				<div className="row">
					{actualities.map(actuality => (
						<div
							key={actuality.id}
							className="col-12 col-lg-4 d-flex flex-column"
						>
							<ArticleTeaser
								article={actuality}
								entityName={'actualities'}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
export default SectionActuality;
