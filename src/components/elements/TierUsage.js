// modules
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from 'semantic-ui-react';
// components
import ArtPokemon from '@/components/elements/ArtPokemon';
// hooks
import useFetch from '@/hooks/useFetch';
// functions
import { formateName, formatNumbers, objectToGETparams } from '@/functions';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
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
	if (!usage) {
		return (
			<div className="usage">
				<div className="img-wrapper">
					<img
						src="/images/picto/circle-question-solid.svg"
						alt="Pokémon encore inconnu"
						title="Pokémon encore inconnu"
						className="art-pokemon img-fluid unknown"
						width={ART_ITM}
						height={ART_ITM}
					/>
				</div>
				<h3>
					{tier ? (
						<Link to={`/entity/tiers/${tier.id}`}>Top {tier.name}</Link>
					) : (
						<>Top {name}</>
					)}
				</h3>
				<div className="no-result">Aucun résultat disponible.</div>
				<div>&nbsp;</div>
			</div>
		);
	}
	return (
		<ScrollReveal className="usage" animation="zoomIn" earlier outterRef={ref}>
			<div className="img-wrapper">
				<ArtPokemon pokemon={usage.pokemon} half imgRef={ref} />
			</div>
			<h3>
				<Link to={`/entity/tiers/${tier.id}`}>{tier.name}</Link>
			</h3>
			<h4>{usage.pokemon.nom || formateName(usage.pokemon.name)}</h4>
			<em className="percent">{formatNumbers(usage.percent, 3)}&nbsp;%</em>
		</ScrollReveal>
	);
};
export default TierUsage;
