// components
import MainSearch from '@/components/forms/MainSearch';
import ScrollReveal from '@/components/ScrollReveal';
import { Card } from 'semantic-ui-react';

const CardHomeTitle = () => (
	<Card className="padded">
		<h1>
			<strong className="d-block">Coup Critique</strong>
			<span className="d-block">
				Votre référence en stratégie Pokémon française.
				<br />
				Trouvez les meilleures équipes de la communauté.
			</span>
		</h1>
		<MainSearch />
		<ScrollReveal
			Tag="img"
			className="main-img img-fluid"
			animation="zoomIn"
			src="/images/keldeo-landorus.png"
			alt="Démétéros et Keldeo"
			height="452"
			width="431"
		/>
	</Card>
);

export default CardHomeTitle;
