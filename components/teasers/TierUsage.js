// modules
import Link from 'next/link';
import Image from 'next/image';
// components
import ArtPokemon from '@/components/elements/ArtPokemon';
import ScrollReveal from '@/components/ScrollReveal';
import { formateName, formatNumbers } from '@/functions';
import { ART_ITM } from '@/constants/img';

const TierUsage = ({ usage, tier }) => {
	// const ref = useRef();

	if (!tier) return null;
	if (!usage) {
		return (
			<ScrollReveal
				className="usage"
				animation="zoomIn"
				earlier /* outterRef={ref} */
			>
				<div className="img-wrapper">
					<Image
						src={`/images/tiers/${tier.gen}-${
							tier.shortName || tier.name
						}.png`}
						onError={e => {
							e.target.onerror = null;
							e.target.src = '/images/picto/circle-question-solid.svg';
						}}
						alt={tier.name}
						className="art-pokemon img-fluid unknown"
						width={ART_ITM}
						height={ART_ITM}
						// ref={ref}
					/>
				</div>
				<h3>
					<Link href={`/entity/tiers/${tier.id}`}>{tier.name}</Link>
				</h3>
				<div className="no-result">Aucun résultat disponible.</div>
				<div className="percent">&nbsp;</div>
			</ScrollReveal>
		);
	}
	return (
		<ScrollReveal className="usage" animation="zoomIn" earlier /* outterRef={ref} */>
			<div className="img-wrapper">
				<ArtPokemon pokemon={usage.pokemon} half /* imgRef={ref} */ />
			</div>
			<h3>
				<Link href={`/entity/tiers/${tier.id}`}>{tier.name}</Link>
			</h3>
			<h4>{usage.pokemon.nom || formateName(usage.pokemon.name)}</h4>
			<em className="percent">{formatNumbers(usage.percent, 3)}&nbsp;%</em>
		</ScrollReveal>
	);
};
export default TierUsage;
