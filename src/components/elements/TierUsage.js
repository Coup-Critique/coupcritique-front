// modules
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import Link from 'next/link';
// components
import ArtPokemon from '@/components/elements/ArtPokemon';
import ScrollReveal from '@/components/ScrollReveal';
import useFetch from '@/hooks/useFetch';
import { formateName, formatNumbers, objectToGETparams } from '@/functions';
import { ART_ITM } from '@/constants/img';

const TierUsage = ({ name, params = {} }) => {
	const ref = useRef();
	const [resultUsage, loadUsage, loading] = useFetch();
	const [usage, setUsage] = useState(null);
	const [tier, setTier] = useState(null);

	useEffect(() => {
		loadUsage({ url: `tiers/usages/top` + objectToGETparams(params) });
	}, []);

	useEffect(() => {
		if (resultUsage && resultUsage.success) {
			setUsage(resultUsage.usage);
			setTier(resultUsage.tier);
		}
	}, [resultUsage]);

	if (loading) return <Loader inline active />;
	if (!tier) return null;
	if (!usage) {
		return (
			<ScrollReveal className="usage" animation="zoomIn" earlier outterRef={ref}>
				<div className="img-wrapper">
					<img
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
						ref={ref}
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
		<ScrollReveal className="usage" animation="zoomIn" earlier outterRef={ref}>
			<div className="img-wrapper">
				<ArtPokemon pokemon={usage.pokemon} half imgRef={ref} />
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
