// modules
import Link from 'next/link';
// components
import ArticleTeaser from '../teasers/ArticleTeaser';
import ReduceCol from '../columns/ReduceCol';
import LinkButton from '../buttons/LinkButton';

function SectionActuality({ actualities = [] }) {
	if (!actualities.length) return null;
	return (
		<section className="text-center">
			<div className="ui container">
				<div className="h2-btn">
					<h2>Actualités</h2>
					<LinkButton href="/entity/actualities" color="orange" inverted>
						Voir toutes les actualités
					</LinkButton>
				</div>
				<div className="row">
					{actualities.map((actuality, i) => (
						<ReduceCol key={actuality.id} i={i}>
							<ArticleTeaser
								article={actuality}
								entityName={'actualities'}
							/>
						</ReduceCol>
					))}
				</div>
			</div>
		</section>
	);
}
export default SectionActuality;
