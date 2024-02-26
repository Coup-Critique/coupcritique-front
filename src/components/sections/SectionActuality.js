// modules
// import Link from 'next/link';
// components
import ActualityTeaser from '@/components/teasers/ActualityTeaser';

function SectionActuality({ actualities = [] }) {
	if (!actualities.length) return null;
	return (
		<section className="text-center">
			<div className="ui container list">
				<div className="h2-btn">
					<h2>
						<a href="/entity/actualities">Actualités</a>
					</h2>
					<a href="/entity/actualities" className="btn btn-orange">
						Voir toutes les actualités
					</a>
				</div>
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
		</section>
	);
}
export default SectionActuality;
