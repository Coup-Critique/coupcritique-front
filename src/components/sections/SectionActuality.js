// modules
import Link from 'next/link';
// components
import ActualityTeaser from '@/components/teasers/ActualityTeaser';

function SectionActuality({ actualities = [] }) {
	if (!actualities.length) return null;
	return (
		<section className="section-news">
			<div className="ui container list">
				<h2>
					<Link href="/entity/actualities">Actualités</Link>
				</h2>
				<div className="mb-4">
					<div className="row">
						{actualities.map(actuality => (
							<div
								key={actuality.id}
								className="col-12 col-lg-4 d-flex flex-column"
							>
								<ActualityTeaser actuality={actuality} />
							</div>
						))}
					</div>
				</div>
				<Link href="/entity/actualities" className="btn btn-light">
					Voir toutes les actualités
				</Link>
			</div>
		</section>
	);
}
export default SectionActuality;
